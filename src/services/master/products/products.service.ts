import { GetActionFilterDto } from '@dto/filters/action-filter.dto';
import { m_products } from '@entities/m_products.entity';
import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { mProductsRepository } from '@repository/m-products.repository';
import { UtilsService } from '@utils/utils.service';
import { v4 as uuidv4 } from 'uuid';
import { m_productCreateInterface, m_productUpdateInterface } from '@interfaces/models/m-products.interface';
import { Label } from '@config/label';

@Injectable()
export class ProductsService {
    label = Label;
    constructor(
        private mProductRepo: mProductsRepository,
        private utils: UtilsService
    ) { }

    async getProducts(filterDto: GetActionFilterDto): Promise<m_products[]> {
        return await this.mProductRepo.getProducts(filterDto);
    }

    async getProductBySalt(salt: string): Promise<m_products> {
        return await this.mProductRepo.getActionBySalt(salt);
    }

    async genCode(): Promise<string> {
        const preFix = `PROD`;
        let codeReady = '';
        const query = this.mProductRepo.createQueryBuilder('m_products');
        query.where('m_products.product_code LIKE :search ORDER BY product_code DESC', { search: `${preFix}%` });
        const rowData = await query.getMany();
        if (rowData.length !== 0) {
            let countCode = rowData.length + 1;
            let tmpCode = '';
            if (countCode < 10) {
                tmpCode = `00${countCode}`;
            } else if (countCode < 100) {
                tmpCode = `0${countCode}`;
            } else if (countCode < 1000) {
                tmpCode = `${countCode}`;
            }
            codeReady = `${preFix}${tmpCode}`;
        } else {
            codeReady = `${preFix}001`;
        }
        return codeReady;
    }

    async genSalt(): Promise<string> {
        let isLoop = true;
        let salt = '';
        while (isLoop) {
            const tmpUUID = uuidv4();
            const tmpUser: m_products[] = await this.mProductRepo.find({ where: { salt: tmpUUID } });
            if (tmpUser.length === 0) {
                isLoop = false;
                salt = tmpUUID;
            }
        }
        return salt;
    }

    async createProduct(payload: m_productCreateInterface): Promise<m_products> {
        return await this.mProductRepo.createCustomer(payload);
    }

    async updateProduct(salt: string, payload: m_productUpdateInterface): Promise<m_products> {
        const product = await this.getProductBySalt(salt);
        if (!product) {
            throw new NotFoundException({
                data: '',
                error: true,
                message: this.label.notification.dataNotfound,
                status: 404
            });
        }
        product.description = payload.description;
        product.id_group_product = payload.id_group_product;
        product.id_purchase_tax = payload.id_purchase_tax;
        product.id_sales_tax = payload.id_sales_tax;
        product.id_supplier = payload.id_supplier;
        product.id_uom = payload.id_uom;
        product.min_stock = payload.min_stock;
        product.product_name = payload.product_name;
        product.purchase_price = payload.purchase_price;
        product.selling_price = payload.selling_price;
        product.updated = payload.updated;
        try {
            await this.mProductRepo.save(product);
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


    async deactivateProduct(salt: string) {
        const product = await this.getProductBySalt(salt);
        product.isActive = 'N';
        product.inactiveDate = new Date(this.utils.formatDate(new Date()));
        product.updated = new Date(this.utils.formatDate(new Date()));
        await this.mProductRepo.save(product);
        return product;
    }

}
