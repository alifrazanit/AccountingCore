import { callback } from '@config/interfaces/common/callback.interface';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';
import { m_subdepartement } from '@entities/m_subdepartment.entity';
import { Controller, Get, UseGuards, Post, Param, Query, Body, BadRequestException, Put, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SubdepartmentService } from '@services/master/subdepartment/subdepartment.service';
import { UtilsService } from '@utils/utils.service';
import { m_CreateSubdepartementDto } from '@dto/models/m_subdepartement.dto';
import { m_subdeptCreateInterface } from '@interfaces/models/m-subdept.interface';


@Controller('master/subdepartment')
@UseGuards(AuthGuard())
export class SubdepartmentController {
    constructor(
        private subDeptService: SubdepartmentService,
        private utils: UtilsService
    ) { }

    
    @Post('/create')
    async create(@Body() payload: m_CreateSubdepartementDto) {
        const { subdepartement } = payload;

        const setPayload: m_subdeptCreateInterface = {
            subdepartment: subdepartement,
        }
        const res = await this.subDeptService.createDept(setPayload);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }
}
