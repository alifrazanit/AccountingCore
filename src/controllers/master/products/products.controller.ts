import { callback } from '@config/interfaces/common/callback.interface';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';
import { m_products } from '@entities/m_products.entity';
import { Controller, Get, Post, Body, Param, Delete, BadRequestException, Put, Query, UseGuards, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from '@services/master/products/products.service';
import { UtilsService } from '@utils/utils.service';
import { mProductCreateDto, mProductUpdateDto } from '@dto/models/m_products.dto'
import { m_productCreateInterface, m_productUpdateInterface } from '@interfaces/models/m-products.interface';

@Controller('master/products')
@UseGuards(AuthGuard())
export class ProductsController {
    constructor(
        private productService: ProductsService,
        private utils: UtilsService
    ) { }

    @Get()
    async getProducts(@Query() filter: GetActionFilterDto): Promise<callback> {
        const data: m_products[] = await this.productService.getProducts(filter);
        return {
            data,
            error: false,
            message: '',
            status: 200
        }
    }

    @Get('/:salt')
    async getProdbyUUID(@Param('salt') salt: string): Promise<callback> {
        let data: m_products = await this.productService.getProductBySalt(salt);
        return {
            data,
            error: false,
            message: '',
            status: 200
        }
    }

    @Post('/create')
    async create(@Body() payload: mProductCreateDto) {
        const {
            description,
            id_group_product,
            id_purchase_tax,
            id_sales_tax,
            id_uom,
            min_stock,
            product_name,
            purchase_price,
            selling_price } = payload;
        const genCode = await this.productService.genCode();
        const salt = await this.productService.genSalt();
        const setPayload: m_productCreateInterface = {
            createdDate: new Date(this.utils.formatDate(new Date())),
            description,
            id_group_product,
            id_product: 0,
            id_purchase_tax,
            id_sales_tax,
            id_uom,
            isActive: 'Y',
            min_stock,
            product_name,
            purchase_price,
            salt,
            selling_price,
            product_code: genCode
        };
        const res = await this.productService.createProduct(setPayload);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }

    @Put('/:salt/update')
    async updateAccount(@Param('salt') salt: string, @Body() body: mProductUpdateDto) {
        let tmpData: any = await this.productService.getProductBySalt(salt);
        if (tmpData.length == 0) {
            throw new NotFoundException({
                data: '',
                error: true,
                message: 'Data Not Found!',
                status: 404
            });
        }
        const {
            description,
            id_group_product,
            id_purchase_tax,
            id_sales_tax,
            id_uom,
            min_stock,
            product_name,
            purchase_price,
            selling_price
        } = body;
        let payload: m_productUpdateInterface = {
            createdDate: new Date(this.utils.formatDate(new Date())),
            description,
            id_group_product,
            id_product: 0,
            id_purchase_tax,
            id_sales_tax,
            id_uom,
            min_stock,
            product_name,
            purchase_price,
            salt,
            selling_price,
            updated : new Date(this.utils.formatDate(new Date())),
        }
        const res = await this.productService.updateProduct(salt, payload);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }

    @Delete('/:salt/delete')
    async deleteProduct(@Param('salt') salt: string): Promise<callback> {
        let data: m_products = await this.productService.getProductBySalt(salt);
        if(!data){
            throw new NotFoundException({
                data: '',
                error: true,
                message: 'Data Not Found!',
                status: 404
            });
        }
        const res = await this.productService.deactivateProduct(salt);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }
}
