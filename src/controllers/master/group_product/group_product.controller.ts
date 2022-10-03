import { callback } from '@config/interfaces/common/callback.interface';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';
import { Controller, Get, UseGuards, Post, Param, Query, Body, BadRequestException, Put, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GroupProductService } from '@services/master/group_product/group_product.service';
import { UtilsService } from '@utils/utils.service';
import { group_product } from '@entities/group_product.entity';
import { createGroup_productDto, updateGroup_productDto } from '@dto/models/group_products.dto';
import { groupProductCreateInterface, groupProductUpdateInterface } from '@interfaces/models/group_product.interface';
import { NotFoundException } from '@nestjs/common';


@Controller('master/group-product')
@UseGuards(AuthGuard())
export class GroupProductController {
    constructor(
        private groupProductService: GroupProductService,
        private utils: UtilsService
    ) { }

    @Get()
    async getUser(@Query() filterDto: GetActionFilterDto): Promise<callback> {
        let data: group_product[] = await this.groupProductService.getGroup(filterDto);
        return {
            data,
            error: false,
            message: '',
            status: 200
        }
    }

    @Post('/create')
    async create(@Body() payload: createGroup_productDto) {
        const tmpData: any = payload;
        const setPayload: groupProductCreateInterface = {
            group_name: tmpData.group_name
        }
        const res = await this.groupProductService.createGroupProduct(setPayload);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }

    @Put('/:id/update')
    async updateUser(@Param('id') id: string, @Body() body: updateGroup_productDto): Promise<callback> {
        let data: group_product = await this.groupProductService.getOneByCode(id);
        if (!data) {
            throw new NotFoundException({
                data: '',
                error: true,
                message: 'Data Not Found!',
                status: 404
            });
        }
        const { group_name } = body;
        const setPayload: groupProductUpdateInterface = {
            id,
            group_name
        }
        const res = await this.groupProductService.updateGroup(setPayload);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }
}
