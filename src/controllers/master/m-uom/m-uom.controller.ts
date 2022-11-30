import { callback } from '@config/interfaces/common/callback.interface';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';
import { m_uom } from '@entities/m_uom.entity';
import { Controller, Get, UseGuards, Post, Param, Query, Body, BadRequestException, Put, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MUomService } from '@services/master/m-uom/m-uom.service';
import { UtilsService } from '@utils/utils.service';
import { createUomDto, updateUomDto } from '@dto/models/m_uom.dto';
import { createInterface, updateInterface } from '@interfaces/models/m-uom.interface';
import { NotFoundException } from '@nestjs/common';

@Controller('master/m-uom')
@UseGuards(AuthGuard())
export class MUomController {
    constructor(
        private mUomServc: MUomService,
        private utils: UtilsService
    ) { }

    @Get()
    async getUom(@Query() filterDto: GetActionFilterDto): Promise<callback> {
        let data: m_uom[] = await this.mUomServc.getUOM(filterDto);
        return {
            data,
            error: false,
            message: '',
            status: 200
        }
    }

    @Post('/create')
    async create(@Body() payload: createUomDto) {
        const genCode = await this.mUomServc.genCode();

        const setPayload: createInterface = {
            description: payload.description,
            uom_name: payload.uom_name,
            uom_code: genCode
        }
        const res = await this.mUomServc.createUom(setPayload);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }


    @Put('/:uom_code/update')
    async updateUser(@Param('uom_code') uom_code: string, @Body() body: updateUomDto): Promise<callback> {
        let data: m_uom = await this.mUomServc.getByCode(uom_code);
        if (!data) {
            throw new NotFoundException({
                data: '',
                error: true,
                message: 'Data Not Found!',
                status: 404
            });
        }
        const { is_active, description, uom_name } = body;

        const setPayload: updateInterface = {
            description,
            is_active,
            uom_name
        }
        const res = await this.mUomServc.updateUOM(uom_code, setPayload);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }

    @Delete('/:uom_code/delete')
    async deleteAction(@Param('uom_code') uom_code: string): Promise<callback> {
        let data: m_uom = await this.mUomServc.getByCode(uom_code);
        if (!data) {
            throw new NotFoundException({
                data: '',
                error: true,
                message: 'Data Not Found!',
                status: 404
            });
        }
        const res = await this.mUomServc.deactivateUom(uom_code);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }

}
