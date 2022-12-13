import { m_userCreateInterface, m_userUpdateInterface } from '@config/interfaces/models/m_users.interface';
import { Label } from '@config/label';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';
import { m_users } from '@entities/m_users.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { mUsersRepository } from '@repository/m_users.repository';
import { UtilsService } from '@utils/utils.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MUsersService {
    label = Label;
    constructor(
        private mUserRepo: mUsersRepository,
        private utils: UtilsService
    ) { }

    async getOneUserBy(params: any): Promise<m_users> {
        return await this.mUserRepo.findOne({ where : params})
    }

    getUser(filterDto: GetActionFilterDto): Promise<m_users[]> {
        return this.mUserRepo.getUser(filterDto);
    }

    async getUserByUUID(uuid: string): Promise<m_users> {
        return await this.mUserRepo.getUserByUUID(uuid);
    }

    async genNIK(): Promise<string> {
        const year = new Date().getFullYear().toString().substring(2);
        const month = new Date().getMonth() + 1;
        let m = '';
        if (month < 10) {
            m = `0${month}`;
        }
        const tmpNIK = `USR${year}${m}`;
        let nikReady = '';
        const query = this.mUserRepo.createQueryBuilder('m_users');
        query.where('m_users.nik LIKE :search ORDER BY nik DESC', { search: `${tmpNIK}%` });
        const rowData = await query.getMany();
        if (rowData.length !== 0) {
            let countCode = rowData.length + 1;
            let tmpCode = '';
            if (countCode < 10) {
                tmpCode = `00${countCode}`;
            } else if (countCode < 100) {
                tmpCode = `0${countCode}`;
            } else if (countCode < 1000) {
                tmpCode = `${countCode}`;
            }
            nikReady = `${tmpNIK}${tmpCode}`
        } else {
            nikReady = `${tmpNIK}001`;
        }
        return nikReady;
    }

    async genUUID(): Promise<string> {
        let isLoop = true;
        let uuid = '';
        while (isLoop) {
            const tmpUUID = uuidv4();
            const tmpUser: m_users[] = await this.mUserRepo.find({ where: { uuid: tmpUUID } });
            if (tmpUser.length === 0) {
                isLoop = false;
                uuid = tmpUUID;
            }
        }
        return uuid;
    }

    async checkEmail(email: string, uuid: string): Promise<boolean> {
        let isDuplicate: boolean = true;
        const query = this.mUserRepo.createQueryBuilder('m_users');
        query.where('m_users.email = :email', { email: email })
            .andWhere('m_users.uuid != :uuid', { uuid: uuid })
        const tmpData = await query.getMany();
        if (tmpData.length === 0) {
            isDuplicate = false;
        }
        return isDuplicate;
    }

    async createUser(payload: m_userCreateInterface): Promise<m_users> {
        return await this.mUserRepo.createUser(payload);
    }

    async updateUser(payload: m_userUpdateInterface): Promise<m_users> {
        const { uuid, address, city, country, email, name, phone, postalcode, updated } = payload;
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
        await this.mUserRepo.save(user);
        return user;
    }

    async deactivateUser(uuid: string) {
        const user = await this.getUserByUUID(uuid);
        user.isActive = 'N';
        user.inactiveDate = new Date(this.utils.formatDate(new Date()));
        user.updated = new Date(this.utils.formatDate(new Date())); 
        await this.mUserRepo.save(user);
        return user;
    }
}
