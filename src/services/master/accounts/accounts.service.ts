import { Injectable } from '@nestjs/common';
import { mAccountsRepository } from '@repository/m_accounts.repository';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';
import { m_accounts } from '@entities/m_accounts.entity';
import { m_accountCreatesInterface, m_accountUpdateInterface } from '@config/interfaces/models/m_accounts.interface';
import { UtilsService } from '@utils/utils.service';
import { m_users } from '@entities/m_users.entity';

@Injectable()
export class AccountsService {
    constructor(
        private mActionRepo: mAccountsRepository,
        private utils: UtilsService
    ) { }

    async getAction(filterDto: GetActionFilterDto): Promise<m_accounts[]> {
        return await this.mActionRepo.getAction(filterDto);
    }

    async getActionByCode(code: string): Promise<m_accounts> {
        return await this.mActionRepo.getActionByCode(code);
    }

    async genCode(): Promise<string> {
        const preFix = `AC`;
        let codeReady = '';
        const query = this.mActionRepo.createQueryBuilder('m_accounts');
        query.where('m_accounts.account_code LIKE :search ORDER BY account_code DESC', { search: `${preFix}%` });
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
            codeReady = `${preFix}${tmpCode}`;
        } else {
            codeReady = `${preFix}001`;
        }
        return codeReady;
    }

    async createAccount(payload: m_accountCreatesInterface, user: m_users): Promise<m_accounts> {
        return await this.mActionRepo.craeteAccount(payload, user);
    }

    async updateAccount(code: string, payload: m_accountUpdateInterface, user: m_users): Promise<m_accounts> {
        const { account_name, isActive, updated, id_users } = payload;
        const account = await this.getActionByCode(code);
        account.id_users = id_users;
        account.mUser = user;
        account.account_name = account_name;
        account.isActive = isActive;
        account.updated = updated;
        await this.mActionRepo.save(account);
        return account;
    }

    async deactivateAccount(code): Promise<m_accounts> {
        const account = await this.getActionByCode(code);
        account.isActive = 'N';
        account.updated = new Date(this.utils.formatDate(new Date()));
        await this.mActionRepo.save(account);
        return account;
    }
}
