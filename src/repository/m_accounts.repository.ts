import { DataSource, Repository } from 'typeorm';
import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { m_accounts } from '@entities/m_accounts.entity';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';
import { m_accountCreatesInterface } from '@config/interfaces/models/m_accounts.interface';
import { UtilsService } from '@utils/utils.service';
import { Label } from '@config/label';
import { m_users } from '@entities/m_users.entity';

@Injectable()
export class mAccountsRepository extends Repository<m_accounts>{
    label = Label;
    constructor(
        private dataSource: DataSource,
        private utils: UtilsService) {
        super(m_accounts, dataSource.createEntityManager());
    }
    async getActionByCode(code: string): Promise<m_accounts> {
        return await this.findOne({ where: { account_code: code }});
    }
    async getAction(filterDto: GetActionFilterDto): Promise<m_accounts[]> {
        const { search } = filterDto;
        const query = this.createQueryBuilder('m_accounts');
        if (search) {
            query.andWhere(
                'LOWER(m_accounts.account_code) LIKE LOWER(:search) OR LOWER(m_accounts.account_name) LIKE LOWER(:search)',
                { search: `%${search}%` }
            )
        }
        const action = await query.getMany();
        return action;
    }

    async craeteAccount(payload: m_accountCreatesInterface, user: m_users): Promise<m_accounts> {
        const accounts = this.create({
            ...payload,
            mUser: user
        });
        try {
            await this.save(accounts);
            return accounts;
        } catch (err) {
            if (err.code === '23505') {
                const detail: string = err.detail;
                let field = this.utils.fetchErrorInsideString(detail);
                let msg = `field ${field} ${this.label.notification.duplicateError}`;
                throw new ConflictException({
                    data: '',
                    error: false,
                    message: msg,
                    status: 200
                })
            } else {
                throw new InternalServerErrorException({
                    data: '',
                    error: true,
                    message: err,
                    status: 500
                });
            }
        }
    }
}