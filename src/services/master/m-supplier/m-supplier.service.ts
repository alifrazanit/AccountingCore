import { Injectable, NotFoundException } from '@nestjs/common';
import { Label } from '@config/label';
import { mSupplierRepository } from '@repository/m_supplier.repository';
import { UtilsService } from '@utils/utils.service';
import { m_supplier } from '@entities/m_supplier.entity';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';
import { v4 as uuidv4 } from 'uuid';
import { m_supplierCreateInterface, m_supplierUpdateInterface } from '@config/interfaces/models/m_supplier.interface';

@Injectable()
export class MSupplierService {
    label = Label;
    constructor(
        private mSuppRepo: mSupplierRepository,
        private utils: UtilsService
    ) { }

    getSupplier(filterDto: GetActionFilterDto): Promise<m_supplier[]> {
        return this.mSuppRepo.getSupplier(filterDto);
    }

    async getSupplierByID(code: any): Promise<m_supplier> {
        return await this.mSuppRepo.findOne({ where: { id_supplier: code}});
    }

    async getSupplierByUUID(code: string): Promise<m_supplier> {
        return await this.mSuppRepo.getUserByUUID(code);
    }

    async genCode(): Promise<string> {
        const year = new Date().getFullYear().toString().substring(2);
        const month = new Date().getMonth() + 1;
        let m = '';
        if (month < 10) {
            m = `0${month}`;
        }
        const tmpCode = `SUP${year}${m}`;
        let supplierCode = '';
        const query = this.mSuppRepo.createQueryBuilder('m_supplier');
        query.where('m_supplier.supplier_code LIKE :search ORDER BY supplier_code DESC', { search: `${tmpCode}%` });
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
            supplierCode = `${tmpCode}${count}`
        } else {
            supplierCode = `${tmpCode}001`;
        }
        return supplierCode;
    }

    async genUUID(): Promise<string> {
        let isLoop = true;
        let uuid = '';
        while (isLoop) {
            const tmpUUID = uuidv4();
            const tmpUser: m_supplier[] = await this.mSuppRepo.find({ where: { uuid: tmpUUID } });
            if (tmpUser.length === 0) {
                isLoop = false;
                uuid = tmpUUID;
            }
        }
        return uuid;
    }

    async checkEmail(email: string, uuid: string): Promise<boolean> {
        let isDuplicate: boolean = true;
        const query = this.mSuppRepo.createQueryBuilder('m_supplier');
        query.where('m_supplier.email = :email', { email: email })
            .andWhere('m_supplier.uuid != :uuid', { uuid: uuid })
        const tmpData = await query.getMany();
        if (tmpData.length === 0) {
            isDuplicate = false;
        }
        return isDuplicate;
    }

    async createSupplier(payload: m_supplierCreateInterface): Promise<m_supplier> {
        return await this.mSuppRepo.createSupplier(payload);
    }

    async updateUser(payload: m_supplierUpdateInterface): Promise<m_supplier> {
        const { uuid, address, city, isActive, inactiveDate, country, email, name, phone, postalcode, updated, cp } = payload;
        const user = await this.getSupplierByUUID(uuid);
        if (!user) {
            throw new NotFoundException({
                data: '',
                error: true,
                message: this.label.notification.dataNotfound,
                status: 404
            });
        }
        user.name = name;
        user.address = address;
        user.city = city;
        user.country = country;
        user.email = email;
        user.phone = phone;
        user.postalcode = postalcode;
        user.updated = updated;
        user.cp = cp;
        user.isActive = isActive;
        user.inactiveDate = inactiveDate;
        await this.mSuppRepo.save(user);
        return user;
    }

    async deactivateUser(uuid: string) {
        const user = await this.getSupplierByUUID(uuid);
        user.isActive = 'N';
        user.inactiveDate = new Date(this.utils.formatDate(new Date()));
        user.updated = new Date(this.utils.formatDate(new Date())); 
        await this.mSuppRepo.save(user);
        return user;
    }
}
