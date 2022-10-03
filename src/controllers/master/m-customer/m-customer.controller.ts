import { Controller, Get, UseGuards, Post, Param, Query, Body, BadRequestException, Put, Delete } from '@nestjs/common';
import { MCustomerService } from '@services/master/m-customer/m-customer.service';
import { AuthGuard } from '@nestjs/passport';
import { UtilsService } from '@utils/utils.service';
import { m_customer } from '@entities/m_customer.entity';
import { callback } from '@config/interfaces/common/callback.interface';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';
import { createCustDto, updateCustDto } from '@dto/models/m_customer.dto';
import { m_customerCreateInterface, m_customerUpdateInterface} from '@interfaces/models/m_customer.interface';
import {  NotFoundException } from '@nestjs/common';


@Controller('master/m-customer')
@UseGuards(AuthGuard())
export class MCustomerController {
    constructor(
        private mCustService: MCustomerService,
        private utils: UtilsService
    ) { }

    @Get()
    async getUser(@Query() filterDto: GetActionFilterDto): Promise<callback> {
        let data: m_customer[] = await this.mCustService.getUser(filterDto);
        return {
            data,
            error: false,
            message: '',
            status: 200
        }
    }

    @Get('/:uuid')
    async getCustByUUID(@Param('uuid') uuid: string): Promise<callback> {
        let data: m_customer = await this.mCustService.getUserByUUID(uuid);
        return {
            data,
            error: false,
            message: '',
            status: 200
        }
    }

    @Post('/create')
    async create(@Body() payload: createCustDto) {
        const tmpData: any = payload;
        const genCode = await this.mCustService.genCode();
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
        const uuid = await this.mCustService.genUUID();
        const setPayload: m_customerCreateInterface = {
            customer_code: genCode,
            name: tmpData.name.toLocaleUpperCase(),
            address: tmpData.address,
            city: tmpData.city,
            country: tmpData.country,
            email: tmpData.email,
            phone: phone,
            postalcode: tmpData.postalcode,
            uuid,
            isActive: 'Y',
            createdDate: new Date(this.utils.formatDate(new Date()))
        }
        const res = await this.mCustService.createUser(setPayload);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }

    @Put('/:uuid/update')
    async updateUser(@Param('uuid') uuid: string, @Body() body: updateCustDto): Promise<callback> {
        let data: m_customer = await this.mCustService.getUserByUUID(uuid);
        if(!data){
            throw new NotFoundException({
                data: '',
                error: true,
                message: 'Data Not Found!',
                status: 404
            });
        }
        const { address, city, country, email, name, phone, postalcode } = body;
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
        const isEmailDuplicate = await this.mCustService.checkEmail(email, uuid);
        if (isEmailDuplicate) {
            throw new BadRequestException({
                data: '',
                error: true,
                message: 'Email is Duplicate',
                status: 400
            });
        }

        const setPayload: m_customerUpdateInterface = {
            name: name.toLocaleUpperCase(),
            address,
            city,
            country,
            email,
            phone,
            postalcode: postalcode,
            uuid: uuid,
            updated: new Date(this.utils.formatDate(new Date()))
        }
        const res = await this.mCustService.updateUser(setPayload);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }

    @Delete('/:uuid/delete')
    async deleteAction(@Param('uuid') uuid: string): Promise<callback> {
        let data: m_customer = await this.mCustService.getUserByUUID(uuid);
        if(!data){
            throw new NotFoundException({
                data: '',
                error: true,
                message: 'Data Not Found!',
                status: 404
            });
        }
        const res = await this.mCustService.deactivateUser(uuid);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }

}
