import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@modules/auth/auth.module';

import { purchaseJournal } from '@entities/purchaseJournal.entity';

import { PurchaseJournalController } from '@controllers/transaction/purchase-journal/purchase-journal.controller';

import { purchaseJournalRepository } from '@repository/purchase-journal.repository';

import { PurchaseJournalService } from '@services/transaction/purchase-journal/purchase-journal.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            purchaseJournal
        ]),
        AuthModule
    ],
    controllers: [
        PurchaseJournalController
    ],
    providers: [
        purchaseJournalRepository
    ],
    exports: [
        PurchaseJournalService
    ]
})
export class TransactionModule {}
