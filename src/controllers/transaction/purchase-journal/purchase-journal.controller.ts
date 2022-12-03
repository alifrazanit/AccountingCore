import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PurchaseJournalService } from '@services/transaction/purchase-journal/purchase-journal.service';
import { UtilsService } from '@utils/utils.service';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';

import { purchaseJournal } from '@entities/purchaseJournal.entity';
import { callback } from '@config/interfaces/common/callback.interface';
import {  purchaseJournalDto} from '@dto/models/purchase_journal.dto';
import { purchaseJournalInterface } from '@interfaces/models/purchase-journal.interface';
import { GetUser } from '@decorators/get-employee.decorator';
import { m_users } from '@entities/m_users.entity';
import { MSupplierService } from '@services/master/m-supplier/m-supplier.service';

@Controller('transaction/purchase-journal')
@UseGuards(AuthGuard())
export class PurchaseJournalController {
    constructor(
        private purchaseJournalService: PurchaseJournalService,
        private utils: UtilsService,
        private supplierService: MSupplierService
    ) { }

    @Get()
    async getAccounts(@Query() filter: GetActionFilterDto): Promise<callback> {
        const data: purchaseJournal[] = await this.purchaseJournalService.getPurchaseJournal(filter);
        return {
            data,
            error: false,
            message: '',
            status: 200
        }
    }

    @Post('/create')
    async createPurchase(
        @Body() body: purchaseJournalDto,
        @GetUser() user: m_users) {
        const journalCode: string = await this.purchaseJournalService.genCode();
        const supplier = await this.supplierService.getSupplierByID(body.id_supplier);
        console.log('supplier', body)
        console.log('supplier', supplier)
//         const payload:purchaseJournalInterface = {
//             jp_code: journalCode,
//             transaction_date: new Date(),
//             description: body.description,
//             created_by: user.nik,
//             created_date: new Date(),
//             dis_term: body.dis_term,
//             ed_dist_term: body.ed_dist_term,
//             ed_term: body.ed_term,
// id_jp: null,
// id_supplier: 
//         }

        // const payload: m_accountCreatesInterface = {
        //     account_code: await this.accountsService.genCode(),
        //     account_name: String(tmpData.account_name).charAt(0).toUpperCase() + String(tmpData.account_name).slice(1),
        //     balance: 0,
        //     createdDate: new Date(this.utils.formatDate(new Date())),
        //     isActive: 'Y',
        //     updated: new Date(this.utils.formatDate(new Date()))
        // }
        // const res = await this.accountsService.createAccount(payload, user);
        return {
            data: [],
            error: false,
            message: '',
            status: 200
        }
    }
}
