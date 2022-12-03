import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { purchaseJournal } from '@entities/purchaseJournal.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class m_customer {
    @PrimaryGeneratedColumn()
    id_customer: number;

    @Column({
        type:'varchar',
        length: 80,
    })
    name: string;

    @Column({
        type:'char',
        unique: true,
        length: 10,
    })
    customer_code: string;

    @Column({
        type:'varchar',
        length: 15,
        unique: true,
    })
    phone: string;

    @Column({
        type:'varchar',
        length: 150
    })
    address: string;

    @Column({
        type:'varchar',
        length: 225,
        nullable: true
    })
    photo: string;

    @Column({
        type:'varchar',
        length: 120,
        unique: true,
    })
    email: string;

    @Column({
        type:'varchar',
        length: 225,
        nullable: true
    })
    personal_doc_attch: string;

    @Column({
        type:'integer',
        nullable: true,
        unique: true,
    })
    cat_personal_doc: number;

    @Column({
        type:'varchar',
        length: 120,
    })
    city: string;

    @Column({
        type:'varchar',
        length: 80,
    })
    country: string;

    @Column({
        type:'varchar',
        length: 10,
    })
    postalcode: string;

    @Column({
        type:'varchar',
        length: 225,
        nullable: true
    })
    image: string;


    @Column({
        type:'varchar',
        length: 150,
        unique: true
    })
    uuid: string;

    @Column({
        type:'char',
        length: 1,
    })
    isActive: string;

    @Column({
        type:'timestamp',
        nullable: true
    })
    updated: Date;

    @Column({
        type:'timestamp',
    })
    createdDate: Date;

    @Column({
        type:'timestamp',
        nullable: true
    })
    inactiveDate: Date;

    @OneToMany((_column) => purchaseJournal, purchaseJournal => purchaseJournal.mcustomer)
    @Exclude({ toPlainOnly: true })
    purchaseJournal: purchaseJournal[];
}