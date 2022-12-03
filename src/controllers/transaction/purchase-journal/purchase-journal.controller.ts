import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PurchaseJournalService } from '@services/transaction/purchase-journal/purchase-journal.service';
import { UtilsService } from '@utils/utils.service';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';

import { purchaseJournal } from '@entities/purchaseJournal.entity';
import { callback } from '@config/interfaces/common/callback.interface';

@Controller('transaction/purchase-journal')
@UseGuards(AuthGuard())
export class PurchaseJournalController {
    constructor(
        private purchaseJournalService: PurchaseJournalService,
        private utils: UtilsService
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
}
