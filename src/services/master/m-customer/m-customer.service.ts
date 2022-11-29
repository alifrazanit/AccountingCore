import { Injectable, NotFoundException } from '@nestjs/common';
import { Label } from '@config/label';
import { mCustomerRepository } from '@repository/m_customer.repository';
import { UtilsService } from '@utils/utils.service';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';
import { m_customer } from '@entities/m_customer.entity';
import { v4 as uuidv4 } from 'uuid';
import { m_customerCreateInterface, m_customerUpdateInterface } from '@interfaces/models/m_customer.interface';


@Injectable()
export class MCustomerService {
    label = Label;
    constructor(
        private mCustomerRepo: mCustomerRepository,
        private utils: UtilsService
    ) { }

    getUser(filterDto: GetActionFilterDto): Promise<m_customer[]> {
        return this.mCustomerRepo.getCustomer(filterDto);
    }

    async getUserByUUID(code: string): Promise<m_customer> {
        return await this.mCustomerRepo.getUserByUUID(code);
    }

    async genCode(): Promise<string> {
        const year = new Date().getFullYear().toString().substring(2);
        const month = new Date().getMonth() + 1;
        let m = '';
        if (month < 10) {
            m = `0${month}`;
        }
        const tmpCode = `CUS${year}${m}`;
        let customerCode = '';
        const query = this.mCustomerRepo.createQueryBuilder('m_customer');
        query.where('m_customer.customer_code LIKE :search ORDER BY customer_code DESC', { search: `${tmpCode}%` });
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
            customerCode = `${tmpCode}${count}`
        } else {
            customerCode = `${tmpCode}001`;
        }
        return customerCode;
    }

    async genUUID(): Promise<string> {
        let isLoop = true;
        let uuid = '';
        while (isLoop) {
            const tmpUUID = uuidv4();
            const tmpUser: m_customer[] = await this.mCustomerRepo.find({ where: { uuid: tmpUUID } });
            if (tmpUser.length === 0) {
                isLoop = false;
                uuid = tmpUUID;
            }
        }
        return uuid;
    }

    async checkEmail(email: string, uuid: string): Promise<boolean> {
        let isDuplicate: boolean = true;
        const query = this.mCustomerRepo.createQueryBuilder('m_customer');
        query.where('m_customer.email = :email', { email: email })
            .andWhere('m_customer.uuid != :uuid', { uuid: uuid })
        const tmpData = await query.getMany();
        if (tmpData.length === 0) {
            isDuplicate = false;
        }
        return isDuplicate;
    }

    async createUser(payload: m_customerCreateInterface): Promise<m_customer> {
        return await this.mCustomerRepo.createCustomer(payload);
    }

    async updateUser(payload: m_customerUpdateInterface): Promise<m_customer> {
        const { uuid, address, city, country, email,isActive,inactiveDate, name, phone, postalcode, updated } = payload;
        const user = await this.getUserByUUID(uuid);
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
        user.isActive = isActive;
        user.inactiveDate = inactiveDate;
        await this.mCustomerRepo.save(user);
        return user;
    }

    async deactivateUser(uuid: string) {
        const user = await this.getUserByUUID(uuid);
        user.isActive = 'N';
        user.inactiveDate = new Date(this.utils.formatDate(new Date()));
        user.updated = new Date(this.utils.formatDate(new Date())); 
        await this.mCustomerRepo.save(user);
        return user;
    }
}
