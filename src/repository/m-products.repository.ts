import { DataSource, Repository } from 'typeorm';
import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Label } from '@config/label';
import { m_products } from '@entities/m_products.entity';
import { UtilsService } from '@utils/utils.service';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';
import { m_productCreateInterface, m_productUpdateInterface } from '@interfaces/models/m-products.interface';

@Injectable()
export class mProductsRepository extends Repository<m_products>{
    label = Label;
    constructor(
        private dataSource: DataSource,
        private utils: UtilsService) {
        super(m_products, dataSource.createEntityManager());
    }

    async getProducts(filterDto: GetActionFilterDto): Promise<m_products[]> {
        const { search } = filterDto;
        const query = this.createQueryBuilder('m_products');
        if (search) {
            query.andWhere(
                'LOWER(m_products.product_name) LIKE LOWER(:search) OR LOWER(m_products.product_code) LIKE LOWER(:search)',
                { search: `%${search}%` }
            )
        }
        const action = await query.getMany();
        return action;
    }

    async getActionBySalt(salt: string): Promise<m_products> {
        return await this.findOne({ where: { salt } });
    }

    async createCustomer(payload: m_productCreateInterface): Promise<m_products> {
        const product = this.create(payload);
        try {
            await this.save(product);
            return product;
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
}