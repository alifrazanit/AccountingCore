import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Double, JoinColumn } from 'typeorm';
import { purchaseJournal } from '@entities/purchaseJournal.entity';
import { Exclude } from 'class-transformer';
import { m_accounts } from '@entities/m_accounts.entity';


@Entity()
export class purchaseJournalLine {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type:'float'
    })
    nominal: number;

    @ManyToOne((_column) => purchaseJournal)
    @JoinColumn({ name: 'id_jp'})
    @Exclude({ toPlainOnly: true })
    purchaseJournal: purchaseJournal;

    @ManyToOne((_column) => m_accounts)
    @JoinColumn({ name: 'id_account'})
    @Exclude({ toPlainOnly: true })
    mAccounts: m_accounts;
}