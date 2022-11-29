import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { m_users } from '@entities/m_users.entity';
import { Exclude } from 'class-transformer';
@Entity()
export class m_accounts {
    @PrimaryGeneratedColumn()
    id_account: number;

    @Column({
        unique: true,
        length: 5,
    })
    account_code: string;

    @Column({
        unique: true,
        length: 50,
    })
    account_name: string;

    @Column()
    balance: number;

    @Column({
        length: 1
    })
    isActive: string;

    @Column()
    updated: Date;

    @Column()
    createdDate: Date;

}