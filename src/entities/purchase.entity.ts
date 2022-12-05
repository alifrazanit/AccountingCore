import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Double, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { m_users } from '@entities/m_users.entity';
import { m_tax } from '@entities/m_tax.entity';
@Entity()
export class purchase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        length: 9,
        type:'char'
    })
    purchaseCode: string;

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
        type:'float'
    })
    discount: number;

    @ManyToOne((_column) => m_users)
    @JoinColumn({ name: 'id_user'})
    @Exclude({ toPlainOnly: true })
    mUsers: m_users;

    @ManyToOne((_column) => m_tax)
    @JoinColumn({ name: 'id_tax'})
    @Exclude({ toPlainOnly: true })
    mTax: m_tax;
}