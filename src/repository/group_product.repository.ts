import { DataSource, Repository } from 'typeorm';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { group_product } from '@entities/group_product.entity';
import { UtilsService } from '@utils/utils.service';
import { Label } from '@config/label';
import { groupProductCreateInterface, groupProductUpdateInterface } from '@config/interfaces/models/group_product.interface';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';

@Injectable()
export class groupProductRepository extends Repository<group_product>{
    label = Label;
    
    constructor(private dataSource: DataSource,
        private utils: UtilsService) {
        super(group_product, dataSource.createEntityManager());
    }

    async createGroup(payload: groupProductCreateInterface): Promise<group_product> {
        const gp = this.create(payload);
        try{
            await this.save(gp);
            return gp;
        } catch(err){
            if(err.code === '23505'){
                const detail:string = err.detail;
                let field = this.utils.fetchErrorInsideString(detail);
                let msg = `field ${field} ${this.label.notification.duplicateError}`;
                throw new ConflictException({
                    data: '',
                    error: false,
                    message: msg,
                    status: 200
                })
            } else {
                throw new InternalServerErrorException({
                    data: '',
                    error: true,
                    message: err,
                    status: 500
                });
            }
        }

    }

    async getOneProduct(code: string): Promise<group_product>{
        return await this.findOne({ where: { group_name: code }});
    }

    async getOneCodeProduct(code: any): Promise<group_product>{
        return await this.findOne({ where: { id_group_product: code }});
    }

    async getGroupProduct(filterDto: GetActionFilterDto): Promise<group_product[]>{
        const { search } = filterDto;
        const query = this.createQueryBuilder('group_product');
        if(search){
            query.where('LOWER(group_product.group_name) like LOWER(:search)', { search: `%${search}%`})
        }
        const users = await query.getMany();
        return users;
    }

    async getUserByUUID(group_name: string): Promise<group_product>{
        return await this.findOne({ where: { group_name }})
    }
}