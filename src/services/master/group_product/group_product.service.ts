import { Injectable, NotFoundException } from '@nestjs/common';
import { Label } from '@config/label';
import { groupProductRepository } from '@repository/group_product.repository';
import { UtilsService } from '@utils/utils.service';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';
import { group_product } from '@entities/group_product.entity';
import { groupProductCreateInterface, groupProductUpdateInterface } from '@interfaces/models/group_product.interface';

@Injectable()
export class GroupProductService {
    label = Label;
    constructor(
        private groupProductRepo: groupProductRepository,
        private utils: UtilsService
    ) { }

    getGroup(filterDto: GetActionFilterDto): Promise<group_product[]> {
        return this.groupProductRepo.getGroupProduct(filterDto);
    }

    async getOneGroup(name: string): Promise<group_product> {
        return await this.groupProductRepo.getOneProduct(name);
    }

    async getOneByCode(code: string): Promise<group_product> {
        return await this.groupProductRepo.getOneCodeProduct(code);
    }

    async createGroupProduct(payload: groupProductCreateInterface): Promise<group_product> {
        return await this.groupProductRepo.createGroup(payload);
    }

    async updateGroup(payload: groupProductUpdateInterface): Promise<group_product> {
        const { group_name, id } = payload;
        const groupProduct = await this.getOneByCode(id);
        if (!groupProduct) {
            throw new NotFoundException({
                data: '',
                error: true,
                message: this.label.notification.dataNotfound,
                status: 404
            });
        }
        groupProduct.group_name = group_name;
        await this.groupProductRepo.save(groupProduct);
        return groupProduct;
    }
}
