import { DataSource, Repository } from 'typeorm';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { m_supplier } from '@entities/m_supplier.entity';
import { Label } from '@config/label';
import { UtilsService } from '@utils/utils.service';
import { m_supplierCreateInterface } from '@config/interfaces/models/m_supplier.interface';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';

@Injectable()
export class mSupplierRepository extends Repository<m_supplier>{
    label = Label;
    constructor(private dataSource: DataSource,
        private utils: UtilsService) {
        super(m_supplier, dataSource.createEntityManager());
    }

    async createSupplier(payload: m_supplierCreateInterface): Promise<m_supplier> {
        const user = this.create(payload);
        try {
            await this.save(user);
            return user;
        } catch (err) {
            if (err.code === '23505') {
                const detail: string = err.detail;
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

    async getSupplier(filterDto: GetActionFilterDto): Promise<m_supplier[]>{
        const { search } = filterDto;
        const query = this.createQueryBuilder('m_supplier');
        if(search){
            query.where('LOWER(m_supplier.name) like LOWER(:search)', { search: `%${search}%`})
        }
        const users = await query.getMany();
        return users;
    }

    
    async getUserByUUID(uuid: string): Promise<m_supplier>{
        return await this.findOne({ where: { uuid }})
    }
}