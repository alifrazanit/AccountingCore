import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards, NotFoundException } from '@nestjs/common';
import { AccountsService } from '@services/master/accounts/accounts.service';
import { callback } from '@config/interfaces/common/callback.interface';
import { m_accountsCreateDto, m_accountsUpdateDto } from '@dto/models/m_accounts.dto';
import { m_accounts } from '@entities/m_accounts.entity';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { m_accountCreatesInterface, m_accountUpdateInterface } from '@config/interfaces/models/m_accounts.interface';
import { UtilsService } from '@utils/utils.service';
import { GetUser } from '@decorators/get-employee.decorator';
import { m_users } from '@entities/m_users.entity';
@Controller('master/accounts')
@UseGuards(AuthGuard())
export class AccountsController {
    constructor(
        private accountsService: AccountsService,
        private utils: UtilsService
    ) { }

    @Get()
    async getAccounts(@Query() filter: GetActionFilterDto): Promise<callback> {
        const data: m_accounts[] = await this.accountsService.getAction(filter);
        return {
            data,
            error: false,
            message: '',
            status: 200
        }
    }

    @Get('/:code')
    async getUserByUUID(@Param('code') code: string): Promise<callback> {
        let data:m_accounts = await this.accountsService.getActionByCode(code);
        return {
            data,
            error: false,
            message: '',
            status: 200
        }
    }

    @Post('/create')
    async createAccount(
        @Body() body: m_accountsCreateDto,
        @GetUser() user: m_users) {
        const tmpData: any = body;
        const payload: m_accountCreatesInterface = {
            account_code: await this.accountsService.genCode(),
            account_name: String(tmpData.account_name).charAt(0).toUpperCase() + String(tmpData.account_name).slice(1),
            balance: 0,
            createdDate: new Date(this.utils.formatDate(new Date())),
            isActive: 'Y',
            updated: new Date(this.utils.formatDate(new Date()))
        }
        const res = await this.accountsService.createAccount(payload, user);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }

    @Put('/:account_code/update')
    async updateAccount(
        @Param('account_code') account_code: string, 
        @Body() body: m_accountsUpdateDto,
        @GetUser() user: m_users) {
        let tmpData: any[] = await this.accountsService.getAction({ search: account_code });
        if (tmpData.length == 0) {
            throw new NotFoundException({
                data: '',
                error: true,
                message: 'Data Not Found!',
                status: 404
            });
        }
        const { account_name, isActive } = body;
        let payload: m_accountUpdateInterface = {
            account_name: String(account_name).charAt(0).toUpperCase() + String(account_name).slice(1),
            isActive: isActive,
            updated: new Date(this.utils.formatDate(new Date())),
        }
        const res = await this.accountsService.updateAccount(account_code, payload, user);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }

    @Delete('/:account_code/delete')
    async deleteAction(@Param('account_code') account_code: string): Promise<callback> {
        let data: m_accounts = await this.accountsService.getActionByCode(account_code);
        if(!data){
            throw new NotFoundException({
                data: '',
                error: true,
                message: 'Data Not Found!',
                status: 404
            });
        }
        const res = await this.accountsService.deactivateAccount(account_code);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }
}
