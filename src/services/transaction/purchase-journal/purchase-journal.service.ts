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

    async genCode(): Promise<string> {
        const year = new Date().getFullYear().toString().substring(2);
        const month = new Date().getMonth() + 1;
        let m = '';
        if (month < 10) {
            m = `0${month}`;
        }
        const tmpCode = `JP${year}${m}`;
        let taxCode = '';
        const query = this.purchaseJournalRepo.createQueryBuilder('purchase_journal');
        query.where('purchase_journal.jp_code LIKE :search ORDER BY jp_code DESC', { search: `${tmpCode}%` });
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
            taxCode = `${tmpCode}${count}`
        } else {
            taxCode = `${tmpCode}001`;
        }
        return taxCode; 
    }

}
