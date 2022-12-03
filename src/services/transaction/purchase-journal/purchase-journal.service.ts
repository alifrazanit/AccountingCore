import { GetActionFilterDto } from '@dto/filters/action-filter.dto';
import { Injectable } from '@nestjs/common';
import { purchaseJournalRepository } from '@repository/purchase-journal.repository';
import { UtilsService } from '@utils/utils.service';
import { purchaseJournal } from '@entities/purchaseJournal.entity';


@Injectable()
export class PurchaseJournalService {
    constructor(
        private purchaseJournalRepo: purchaseJournalRepository,
        private utils: UtilsService
    ) { }

    async getPurchaseJournal(filterDto: GetActionFilterDto): Promise<purchaseJournal[]> {
        return await this.purchaseJournalRepo.getPurchaseJournal(filterDto);
    }

}
