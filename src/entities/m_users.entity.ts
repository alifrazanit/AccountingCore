import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { m_accounts } from '@entities/m_accounts.entity';

@Entity()
export class m_users {
    @PrimaryGeneratedColumn()
    id_users: number;

    @Column({
        length: 80,
    })
    name: string;

    @Column({
        unique: true,
        length: 10,
    })
    nik: string;

    @Column({
        length: 15,
        unique: true,
    })
    phone: string;

    @Column({
        length: 150
    })
    address: string;

    @Column({
        length: 225,
        nullable: true
    })
    photo: string;

    @Column({
        length: 120,
        unique: true,
    })
    email: string;

    @Column({
        length: 225,
        nullable: true
    })
    personal_doc_attch: string;

    @Column({
        nullable: true,
        unique: true,
    })
    cat_personal_doc: number;

    @Column({
        length: 120,
    })
    city: string;

    @Column({
        length: 80,
    })
    country: string;

    @Column({
        length: 10,
    })
    postalcode: string;

    @Column({
        length: 225,
        nullable: true
    })
    image: string;

    @Column({
        length: 50,
        unique: true
    })
    username: string;

    @Column({
        length: 200,
    })
    password: string;

    @Column({
        length: 150,
        unique: true
    })
    uuid: string;

    @Column({
        length: 1,
    })
    isActive: string;

    @Column({
        nullable: true
    })
    updated: Date;

    @Column()
    createdDate: Date;

    @Column({
        nullable: true
    })
    inactiveDate: Date;

    @OneToMany(() => m_accounts, (account) => account.mUser, { eager: true })
    mAccount: m_accounts[];
}