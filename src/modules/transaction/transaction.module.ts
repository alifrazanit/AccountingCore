import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@modules/auth/auth.module';

import { purchaseJournal } from '@entities/purchaseJournal.entity';

import { PurchaseJournalController } from '@controllers/transaction/purchase-journal/purchase-journal.controller';

import { purchaseJournalRepository } from '@repository/purchase-journal.repository';

import { PurchaseJournalService } from '@services/transaction/purchase-journal/purchase-journal.service';
import { UtilsService } from '@utils/utils.service';
import { MasterModule } from '@modules/master/master.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            purchaseJournal
        ]),
        AuthModule,
        MasterModule
    ],
    controllers: [
        PurchaseJournalController
    ],
    providers: [
        purchaseJournalRepository,
        PurchaseJournalService,
    ],
    exports: [
        purchaseJournalRepository,
        PurchaseJournalService
    ]
})
export class TransactionModule {}
