import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { purchaseJournal } from '@entities/purchaseJournal.entity';
import { Label } from '@config/label';
import { UtilsService } from '@utils/utils.service';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';
import { purchaseJournalInterface } from '@config/interfaces/models/purchase-journal.interface';
import { m_users } from '@entities/m_users.entity';
import { m_customer } from '@entities/m_customer.entity';

@Injectable()
export class purchaseJournalRepository extends Repository<purchaseJournal>{
    label = Label;
    constructor(
        private dataSource: DataSource,
        private utils: UtilsService) {
        super(purchaseJournal, dataSource.createEntityManager());
    }

    async getPurchaseJournal(filterDto: GetActionFilterDto): Promise<purchaseJournal[]> {
        const { search } = filterDto;
        const query = this.createQueryBuilder('purchase_journal');
        if (search) {
            query.andWhere(
                'LOWER(purchase_journal.jp_code) LIKE LOWER(:search) OR LOWER(purchase_journal.jp_code) LIKE LOWER(:search)',
                { search: `%${search}%` }
            )
        }
        const action = await query.getMany();
        return action;
    }

    // async createPurchaseJournal(payload: purchaseJournalInterface, user: m_users, customer: m_customer): Promise<purchaseJournal> {
    //     const purchaseJournal = this.create({
    //         ...payload
    //     });
    //     try{

    //     } catch (err) {
    //         if (err.code === '23505') {
    //             const detail: string = err.detail;
    //             let field = this.utils.fetchErrorInsideString(detail);
    //             let msg = `field ${field} ${this.label.notification.duplicateError}`;
    //             throw new ConflictException({
    //                 data: '',
    //                 error: false,
    //                 message: msg,
    //                 status: 200
    //             })
    //         } else {
    //             throw new InternalServerErrorException({
    //                 data: '',
    //                 error: true,
    //                 message: err,
    //                 status: 500
    //             });
    //         }
    //     }
    // }
}