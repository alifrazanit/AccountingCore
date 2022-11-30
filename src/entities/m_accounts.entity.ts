import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { m_users } from '@entities/m_users.entity';
import { Exclude } from 'class-transformer';
@Entity()
export class m_accounts {
    @PrimaryGeneratedColumn()
    id_account: number;

    @Column({
        type:'char',
        unique: true,
        length: 5,
    })
    account_code: string;

    @Column({
        type:'varchar',
        unique: true,
        length: 50,
    })
    account_name: string;

    @Column({
        type:'double'
    })
    balance: number;

    @Column({
        type:'char',
        length: 1
    })
    isActive: string;

    @Column({
        type:'datetime'
    })
    updated: Date;

    @Column({
        type:'datetime'
    })
    createdDate: Date;

}