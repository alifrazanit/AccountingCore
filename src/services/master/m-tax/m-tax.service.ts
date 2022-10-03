import { m_taxCreateInterface, m_taxUpdateInterface } from '@config/interfaces/models/m_tax.interface';
import { Label } from '@config/label';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';
import { m_tax } from '@entities/m_tax.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { mTaxRepository } from '@repository/m_tax.repository';
import { UtilsService } from '@utils/utils.service';

@Injectable()
export class MTaxService {
    label = Label;
    constructor(
        private mTaxRepo: mTaxRepository,
        private utils: UtilsService
    ) { }
    
    getTax(filterDto: GetActionFilterDto): Promise<m_tax[]> {
        return this.mTaxRepo.getTaxes(filterDto);
    }

    async getTaxByCode(code: string): Promise<m_tax> {
        return await this.mTaxRepo.getTaxByCode(code);
    }

    async genCode(): Promise<string> {
        const year = new Date().getFullYear().toString().substring(2);
        const month = new Date().getMonth() + 1;
        let m = '';
        if (month < 10) {
            m = `0${month}`;
        }
        const tmpCode = `TX${year}${m}`;
        let taxCode = '';
        const query = this.mTaxRepo.createQueryBuilder('m_tax');
        query.where('m_tax.tax_code LIKE :search ORDER BY tax_code DESC', { search: `${tmpCode}%` });
        const rowData = await query.getMany();
        console.log('rowData', rowData)

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
            taxCode = `${tmpCode}${count}`
        } else {
            taxCode = `${tmpCode}001`;
        }
        return taxCode; 
    }

    
    async createTax(payload: m_taxCreateInterface): Promise<m_tax> {
        return await this.mTaxRepo.createTax(payload);
    }

    
    async updateTax(taxCode: string,payload: m_taxUpdateInterface): Promise<m_tax> {
        const { is_active, percentage, tax_name } = payload;
        const tax = await this.getTaxByCode(taxCode);
        if (!tax) {
            throw new NotFoundException({
                data: '',
                error: true,
                message: this.label.notification.dataNotfound,
                status: 404
            });
        }
        tax.is_active = is_active;
        tax.percentage = percentage;
        tax.tax_name = tax_name;
   
        await this.mTaxRepo.save(tax);
        return tax;
    }

    async  deactivateTax(taxCode: string){
        const tax = await this.getTaxByCode(taxCode);
        tax.is_active = 'N';
        await this.mTaxRepo.save(tax);
        return tax;
    }
}
