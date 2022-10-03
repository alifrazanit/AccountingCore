import { DataSource, Repository } from 'typeorm';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { m_tax } from '@entities/m_tax.entity';
import { Label } from '@config/label';
import { UtilsService } from '@utils/utils.service';
import { m_taxCreateInterface } from '@config/interfaces/models/m_tax.interface';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';

@Injectable()
export class mTaxRepository extends Repository<m_tax>{
    label = Label;
    constructor(private dataSource: DataSource,
        private utils: UtilsService) {
        super(m_tax, dataSource.createEntityManager());
    }

    async createTax(payload: m_taxCreateInterface): Promise<m_tax> {
        const percentage: any = payload.percentage;
        const user = this.create({
            id_tax: 0,
            is_active: payload.is_active,
            percentage: percentage,
            tax_code: payload.tax_code,
            tax_name: payload.tax_name
        });
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

    async getTaxes(filterDto: GetActionFilterDto): Promise<m_tax[]>{
        const { search } = filterDto;
        const query = this.createQueryBuilder('m_tax');
        if(search){
            query.where('LOWER(m_tax.tax_code) like LOWER(:search) OR LOWER(m_tax.tax_name) like LOWER(:search)', { search: `%${search}%`})
        }
        const taxes = await query.getMany();
        return taxes;
    }

    async getTaxByCode(code: string): Promise<m_tax>{
        return await this.findOne({ where: { tax_code: code }})
    }
}