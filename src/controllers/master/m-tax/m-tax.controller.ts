import { callback } from '@config/interfaces/common/callback.interface';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';
import { m_tax } from '@entities/m_tax.entity';
import { Controller, Get, UseGuards, Post, Param, Query, Body, BadRequestException, Put, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MTaxService } from '@services/master/m-tax/m-tax.service';
import { UtilsService } from '@utils/utils.service';
import { createmTaxDto, updateTaxDto } from '@dto/models/m_tax.dto';
import { m_taxCreateInterface, m_taxUpdateInterface } from '@interfaces/models/m_tax.interface';
import {  NotFoundException } from '@nestjs/common';


@Controller('master/m-tax')
@UseGuards(AuthGuard())
export class MTaxController {
    constructor(
        private mTaxService: MTaxService,
        private utils: UtilsService
    ) { }

    @Get()
    async getUser(@Query() filterDto: GetActionFilterDto): Promise<callback> {
        let data: m_tax[] = await this.mTaxService.getTax(filterDto);
        return {
            data,
            error: false,
            message: '',
            status: 200
        }
    }

    @Get('/:tax_code')
    async getCustByUUID(@Param('tax_code') tax_code: string): Promise<callback> {
        let data: m_tax = await this.mTaxService.getTaxByCode(tax_code);
        return {
            data,
            error: false,
            message: '',
            status: 200
        }
    }

    @Post('/create')
    async create(@Body() payload: createmTaxDto) {
        const genCode = await this.mTaxService.genCode();
        const setPayload: m_taxCreateInterface = {
            tax_code: genCode,
            is_active: 'Y',
            percentage: payload.percentage,
            tax_name: payload.tax_name,
        }
        const res = await this.mTaxService.createTax(setPayload);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }

    @Put('/:tax_code/update')
    async updateUser(@Param('tax_code') tax_code: string, @Body() body: updateTaxDto): Promise<callback> {
        let data: m_tax = await this.mTaxService.getTaxByCode(tax_code);
        if(!data){
            throw new NotFoundException({
                data: '',
                error: true,
                message: 'Data Not Found!',
                status: 404
            });
        }
        const { is_active, percentage, tax_name } = body;
     
        const setPayload: m_taxUpdateInterface = {
            is_active,
            percentage, 
            tax_name
        }
        const res = await this.mTaxService.updateTax(tax_code, setPayload);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }

    @Delete('/:tax_code/delete')
    async deleteAction(@Param('tax_code') tax_code: string): Promise<callback> {
        let data: m_tax = await this.mTaxService.getTaxByCode(tax_code);
        if(!data){
            throw new NotFoundException({
                data: '',
                error: true,
                message: 'Data Not Found!',
                status: 404
            });
        }
        const res = await this.mTaxService.deactivateTax(tax_code);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }
}
