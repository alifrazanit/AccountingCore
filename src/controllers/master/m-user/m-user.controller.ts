import { Controller, Get, UseGuards, Post, Param, Query, Body, BadRequestException, Put, Delete } from '@nestjs/common';
import { MUsersService } from '@services/master/m-users/m-users.service';
import { AuthGuard } from '@nestjs/passport';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';
import { m_users } from '@entities/m_users.entity';
import { callback } from '@config/interfaces/common/callback.interface';
import { createUserDto, updateUserDto } from '@dto/models/m_users.dto';
import * as bcrypt from 'bcrypt';
import { UtilsService } from '@utils/utils.service';
import { m_userCreateInterface, m_userUpdateInterface } from '@config/interfaces/models/m_users.interface';
import {  NotFoundException } from '@nestjs/common';

@Controller('master/m-user')
@UseGuards(AuthGuard())
export class MUserController {
    constructor(
        private mUserService: MUsersService,
        private utils: UtilsService
    ) { }

    @Get('/:uuid')
    async getUserByUUID(@Param('uuid') uuid: string): Promise<callback> {
        let data: m_users = await this.mUserService.getUserByUUID(uuid);
        return {
            data,
            error: false,
            message: '',
            status: 200
        }
    }

    @Get()
    async getUser(@Query() filterDto: GetActionFilterDto): Promise<callback> {
        let data: m_users[] = await this.mUserService.getUser(filterDto);
        return {
            data,
            error: false,
            message: '',
            status: 200
        }
    }

    @Post('/create')
    async signUp(@Body() payload: createUserDto) {
        const tmpData: any = payload;
        const genNik = await this.mUserService.genNIK();
        const salt = await bcrypt.genSalt();
        const hashedPassowrd = await bcrypt.hash(tmpData.password, salt);
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
        const uuid = await this.mUserService.genUUID();
        const setPayload: m_userCreateInterface = {
            name: tmpData.name.toLocaleUpperCase(),
            address: tmpData.address,
            city: tmpData.city,
            country: tmpData.country,
            email: tmpData.email,
            nik: genNik,
            password: hashedPassowrd,
            phone: phone,
            postalcode: tmpData.postalcode,
            username: tmpData.username,
            uuid,
            isActive: 'Y',
            createdDate: new Date(this.utils.formatDate(new Date()))
        }
        const res = await this.mUserService.createUser(setPayload);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }

    @Put('/:uuid/update')
    async updateUser(@Param('uuid') uuid: string, @Body() body: updateUserDto): Promise<callback> {
        let data: m_users = await this.mUserService.getUserByUUID(uuid);
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
        const isEmailDuplicate = await this.mUserService.checkEmail(email, uuid);
        if (isEmailDuplicate) {
            throw new BadRequestException({
                data: '',
                error: true,
                message: 'Email is Duplicate',
                status: 400
            });
        }

        const setPayload: m_userUpdateInterface = {
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
        const res = await this.mUserService.updateUser(setPayload);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }

    @Delete('/:uuid/delete')
    async deleteAction(@Param('uuid') uuid: string): Promise<callback> {
        let data: m_users = await this.mUserService.getUserByUUID(uuid);
        if(!data){
            throw new NotFoundException({
                data: '',
                error: true,
                message: 'Data Not Found!',
                status: 404
            });
        }
        const res = await this.mUserService.deactivateUser(uuid);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }
}
