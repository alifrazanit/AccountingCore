import { callback } from '@config/interfaces/common/callback.interface';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';
import { m_supplier } from '@entities/m_supplier.entity';
import { Controller, Get, UseGuards, Post, Param, Query, Body, BadRequestException, Put, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MSupplierService } from '@services/master/m-supplier/m-supplier.service';
import { UtilsService } from '@utils/utils.service';
import { createSuppDto, updateSuppDto} from '@dto/models/m_supplier.dto';
import {m_supplierCreateInterface, m_supplierUpdateInterface} from '@interfaces/models/m_supplier.interface';
import {  NotFoundException } from '@nestjs/common';

@Controller('master/m-supplier')
@UseGuards(AuthGuard())
export class MSupplierController {
    constructor(
        private mSupplierService: MSupplierService,
        private utils: UtilsService
    ) { }

    @Get()
    async getUser(@Query() filterDto: GetActionFilterDto): Promise<callback> {
        let data: m_supplier[] = await this.mSupplierService.getSupplier(filterDto);
        return {
            data,
            error: false,
            message: '',
            status: 200
        }
    }

    @Get('/:uuid')
    async getCustByUUID(@Param('uuid') uuid: string): Promise<callback> {
        let data: m_supplier = await this.mSupplierService.getUserByUUID(uuid);
        return {
            data,
            error: false,
            message: '',
            status: 200
        }
    }

    @Post('/create')
    async create(@Body() payload: createSuppDto) {
        const tmpData: any = payload;
        const genCode = await this.mSupplierService.genCode();
        let phone: any = '';
        const tmpPhone = await this.utils.genPhone(tmpData.phone);
        if (tmpPhone === '') {
            throw new BadRequestException({
                data: '',
                error: true,
                message: 'Invalid Phone Number',
                status: 400
            });
        } else {
            phone = tmpPhone;
        }
        const uuid = await this.mSupplierService.genUUID();
        const setPayload: m_supplierCreateInterface = {
            supplier_code: genCode,
            name: tmpData.name.toLocaleUpperCase(),
            address: tmpData.address,
            city: tmpData.city,
            country: tmpData.country,
            email: tmpData.email,
            phone: phone,
            postalcode: tmpData.postalcode,
            uuid,
            isActive: 'Y',
            createdDate: new Date(this.utils.formatDate(new Date())),
            cp: tmpData.cp
        }
        const res = await this.mSupplierService.createSupplier(setPayload);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }

    @Put('/:uuid/update')
    async updateUser(@Param('uuid') uuid: string, @Body() body: updateSuppDto): Promise<callback> {
        let data: m_supplier = await this.mSupplierService.getUserByUUID(uuid);
        if(!data){
            throw new NotFoundException({
                data: '',
                error: true,
                message: 'Data Not Found!',
                status: 404
            });
        }
        const { address, city, country, email, name, phone, postalcode, cp } = body;
        let mobilePhone: any = '';
        const tmpPhone = await this.utils.genPhone(phone);
        if (tmpPhone === '') {
            throw new BadRequestException({
                data: '',
                error: true,
                message: 'Invalid Phone Number',
                status: 400
            });
        } else {
            mobilePhone = tmpPhone;
        }
        const isEmailDuplicate = await this.mSupplierService.checkEmail(email, uuid);
        if (isEmailDuplicate) {
            throw new BadRequestException({
                data: '',
                error: true,
                message: 'Email is Duplicate',
                status: 400
            });
        }

        const setPayload: m_supplierUpdateInterface = {
            name: name.toLocaleUpperCase(),
            address,
            city,
            country,
            email,
            phone,
            postalcode: postalcode,
            uuid: uuid,
            updated: new Date(this.utils.formatDate(new Date())),
            cp
        }
        const res = await this.mSupplierService.updateUser(setPayload);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }

    @Delete('/:uuid/delete')
    async deleteAction(@Param('uuid') uuid: string): Promise<callback> {
        let data: m_supplier = await this.mSupplierService.getUserByUUID(uuid);
        if(!data){
            throw new NotFoundException({
                data: '',
                error: true,
                message: 'Data Not Found!',
                status: 404
            });
        }
        const res = await this.mSupplierService.deactivateUser(uuid);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }
}
