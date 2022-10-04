import { callback } from '@config/interfaces/common/callback.interface';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';
import { m_departement } from '@entities/m_department.entity';
import { Controller, Get, UseGuards, Post, Param, Query, Body, BadRequestException, Put, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MDepartmentService } from '@services/master/m-department/m-department.service';
import { UtilsService } from '@utils/utils.service';
import { createDeptDto, updateDeptDto } from '@dto/models/m_departement.dto';
import { m_departmentCreateInterface, m_departmentUpdateInterface } from '@interfaces/models/m_department.interface';
import { NotFoundException } from '@nestjs/common';
import { GetUser } from '../../../decorators/get-employee.decorator';
import { m_subdepartement } from '@entities/m_subdepartment.entity';
import {  SubdepartmentService } from '@services/master/subdepartment/subdepartment.service';

@Controller('master/m-department')
@UseGuards(AuthGuard())
export class DepartmentController {
    constructor(
        private mDeptService: MDepartmentService,
        private utils: UtilsService,
        private subdepartmentService: SubdepartmentService
    ) { }

    @Get()
    async getUser(@Query() filterDto: GetActionFilterDto): Promise<callback> {
        let data: m_departement[] = await this.mDeptService.getDept(filterDto);
        return {
            data,
            error: false,
            message: '',
            status: 200
        }
    }

    @Get('/:department_code')
    async getCustByUUID(@Param('department_code') department_code: string): Promise<callback> {
        let data: m_departement = await this.mDeptService.getDeptByCode(department_code);
        return {
            data,
            error: false,
            message: '',
            status: 200
        }
    }

    @Post('/create')
    async create(@Body() payload: createDeptDto) {
        const { departement, id_subdepartment } = payload;
        const subdepartment = await this.subdepartmentService.getDeptByCode(id_subdepartment);
        if(!subdepartment){
            throw new NotFoundException({
                data: '',
                error: true,
                message: 'Data Not Found!',
                status: 404
            }); 
        }
        const genCode = await this.mDeptService.genCode();

        const setPayload: m_departmentCreateInterface = {
            departement,
            department_code: genCode,
            id_subdepartment: id_subdepartment,
            is_active: 'Y'
        }
        const res = await this.mDeptService.createDept(setPayload, subdepartment);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }

    @Put('/:department_code/update')
    async updateUser(@Param('department_code') department_code: string, @Body() body: updateDeptDto): Promise<callback> {
        let data: m_departement = await this.mDeptService.getDeptByCode(department_code);
        if (!data) {
            throw new NotFoundException({
                data: '',
                error: true,
                message: 'Data Not Found!',
                status: 404
            });
        }
        const { departement, id_subdepartment, is_active } = body;

        const setPayload: m_departmentUpdateInterface = {
            departement,
            department_code,
            id_subdepartment: id_subdepartment,
            is_active
        }
        const res = await this.mDeptService.updateDept(setPayload);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }

    @Delete('/:department_code/delete')
    async deleteAction(@Param('department_code') department_code: string): Promise<callback> {
        let data: m_departement = await this.mDeptService.getDeptByCode(department_code);
        if(!data){
            throw new NotFoundException({
                data: '',
                error: true,
                message: 'Data Not Found!',
                status: 404
            });
        }
        const res = await this.mDeptService.deactivateDept(department_code);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }
}
