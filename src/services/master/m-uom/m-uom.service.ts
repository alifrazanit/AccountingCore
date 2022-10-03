import { createInterface, updateInterface } from '@interfaces/models/m-uom.interface';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';
import { m_uom } from '@entities/m_uom.entity';
import { Injectable } from '@nestjs/common';
import { mUomRepository } from '@repository/m-uom.repository';
import { UtilsService } from '@utils/utils.service';
import { NotFoundException } from '@nestjs/common';
import { Label } from '@config/label';

@Injectable()
export class MUomService {
    label = Label;
    constructor(
        private mUomRepo: mUomRepository,
        private utils: UtilsService
    ) { }

    getUOM(filterDto: GetActionFilterDto): Promise<m_uom[]> {
        return this.mUomRepo.getUOM(filterDto);
    }

    async getByCode(code: string): Promise<m_uom> {
        return await this.mUomRepo.getCode(code);
    }

    async genCode(): Promise<string> {
        const year = new Date().getFullYear().toString().substring(2);
        const month = new Date().getMonth() + 1;
        let m = '';
        if (month < 10) {
            m = `0${month}`;
        }
        const tmpCode = `UOM`;
        let uomCode = '';
        const query = this.mUomRepo.createQueryBuilder('m_uom');
        query.where('m_uom.uom_code LIKE :search ORDER BY uom_code DESC', { search: `${tmpCode}%` });
        const rowData = await query.getMany();
        if (rowData.length !== 0) {
            let countCode = rowData.length + 1;
            let count = '';
            if (countCode < 10) {
                count = `00${countCode}`;
            } else if (countCode < 100) {
                count = `0${countCode}`;
            } else if (countCode < 1000) {
                count = `${countCode}`;
            }
            uomCode = `${tmpCode}${count}`
        } else {
            uomCode = `${tmpCode}001`;
        }
        return uomCode;
    }

    async createUom(payload: createInterface): Promise<m_uom> {
        return await this.mUomRepo.createUom(payload);
    }

    async updateUOM(code: string, payload: updateInterface): Promise<m_uom> {
        const { description, is_active, uom_name } = payload;
        const uom = await this.getByCode(code);
        if (!uom) {
            throw new NotFoundException({
                data: '',
                error: true,
                message: this.label.notification.dataNotfound,
                status: 404
            });
        }
        uom.is_active = is_active;
        uom.description = description;
        uom.uom_name = uom_name;

        await this.mUomRepo.save(uom);
        return uom;
    }

    async deactivateUom(taxCode: string) {
        const uom = await this.getByCode(taxCode);
        uom.is_active = 'N';
        await this.mUomRepo.save(uom);
        return uom;
    }
}
