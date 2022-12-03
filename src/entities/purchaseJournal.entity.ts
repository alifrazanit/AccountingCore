import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Double, JoinColumn } from 'typeorm';
import { m_supplier } from '@entities/m_supplier.entity';
import { m_customer } from '@entities/m_customer.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class purchaseJournal {
    @PrimaryGeneratedColumn()
    id_jp: number;

    @Column({
        unique: true,
        length: 5,
        type:'char'
    })
    jp_code: string;

    @Column({
        type:'timestamp'
    })
    transaction_date: Date;

    @Column({
        type:'varchar',
        length: 225
    })
    description: string;

    @Column({
        type:'timestamp'
    })
    created_date: Date;

    @Column({
        type:'timestamp'
    })
    updated_date: Date;

    @Column({
        type:'varchar',
        length: 150
    })
    reason_update: string;

    @Column({
        type:'varchar',
        length: 100
    })
    created_by: string;

    @Column({
        type:'decimal',
        precision: 5,
        scale: 2
    })
    dis_term: Double;

    @Column({
        type:'integer'
    })
    ed_dist_term: number;

    @Column({
        type:'integer'
    })
    ed_term: number;

    @ManyToOne((_column) => m_supplier)
    @JoinColumn({ name: 'id_supplier'})
    @Exclude({ toPlainOnly: true })
    msupplier: m_supplier;

}