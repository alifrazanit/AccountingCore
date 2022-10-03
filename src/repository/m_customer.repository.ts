import { DataSource, Repository } from 'typeorm';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { m_customer } from '@entities/m_customer.entity';
import { Label } from '@config/label';
import { UtilsService } from '@utils/utils.service';
import { m_customerCreateInterface } from '@interfaces/models/m_customer.interface';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';


@Injectable()
export class mCustomerRepository extends Repository<m_customer>{
    label = Label;
    constructor(private dataSource: DataSource,
        private utils: UtilsService) {
        super(m_customer, dataSource.createEntityManager());
    }

    async createCustomer(payload: m_customerCreateInterface): Promise<m_customer> {
        const user = this.create(payload);
        try {
            await this.save(user);
            return user;
        } catch (err) {
            console.log(err)
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

    async getCustomer(filterDto: GetActionFilterDto): Promise<m_customer[]>{
        const { search } = filterDto;
        const query = this.createQueryBuilder('m_customer');
        if(search){
            query.where('LOWER(m_customer.name) like LOWER(:search)', { search: `%${search}%`})
        }
        const users = await query.getMany();
        return users;
    }

    
    async getUserByUUID(uuid: string): Promise<m_customer>{
        return await this.findOne({ where: { uuid }})
    }
}