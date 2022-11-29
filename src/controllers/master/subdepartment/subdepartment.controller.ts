import { callback } from '@config/interfaces/common/callback.interface';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';
import { m_subdepartement } from '@entities/m_subdepartment.entity';
import { Controller, Get, UseGuards, Post, Param, NotFoundException, Query, Body, BadRequestException, Put, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SubdepartmentService } from '@services/master/subdepartment/subdepartment.service';
import { UtilsService } from '@utils/utils.service';
import { m_CreateSubdepartementDto, m_UpdateSubdepartementDto } from '@dto/models/m_subdepartement.dto';
import { m_subdeptCreateInterface } from '@interfaces/models/m-subdept.interface';


@Controller('master/subdepartment')
@UseGuards(AuthGuard())
export class SubdepartmentController {
    constructor(
        private subDeptService: SubdepartmentService,
        private utils: UtilsService
    ) { }


    @Get()
    async getSubdepartement(@Query() filter: GetActionFilterDto): Promise<callback> {
        const data: m_subdepartement[] = await this.subDeptService.getSubDept(filter);
        return {
            data,
            error: false,
            message: '',
            status: 200
        }
    }

    @Get('/:id_subdepartment')
    async getSubdepartementById(@Param('id_subdepartment') id_subdepartment: number): Promise<callback> {
        const data: m_subdepartement = await this.subDeptService.getDeptByCode(id_subdepartment);
        return {
            data,
            error: false,
            message: '',
            status: 200
        }
    }


    @Post('/create')
    async create(@Body() payload: m_CreateSubdepartementDto) {
        const { subdepartement } = payload;

        const setPayload: m_subdeptCreateInterface = {
            subdepartment: subdepartement,
            isActive:'Y'
        }
        const res = await this.subDeptService.createDept(setPayload);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }

    @Put('/:id_subdepartment/update')
    async update(
        @Param('id_subdepartment') id_subdepartment: number,
        @Body() body: m_UpdateSubdepartementDto) {
        let tmpData: any = await this.subDeptService.getDeptByCode(id_subdepartment);
        if (tmpData.length == 0) {
            throw new NotFoundException({
                data: '',
                error: true,
                message: 'Data Not Found!',
                status: 404
            });
        }
        const { subdepartement, isActive } = body;
        let payload: m_subdeptCreateInterface = {
            subdepartment: subdepartement,
            isActive: isActive
        }
        const res = await this.subDeptService.updateDept(id_subdepartment, payload);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }

    @Delete('/:id_subdepartment/delete')
    async deleteAction(@Param('id_subdepartment') id_subdepartment: number): Promise<callback> {
        let data: m_subdepartement = await this.subDeptService.getDeptByCode(id_subdepartment);
        if(!data){
            throw new NotFoundException({
                data: '',
                error: true,
                message: 'Data Not Found!',
                status: 404
            });
        }
        const res = await this.subDeptService.deactivate(id_subdepartment);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }

}
