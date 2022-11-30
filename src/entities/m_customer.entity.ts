import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
        type:'datetime',
        nullable: true
    })
    updated: Date;

    @Column({
        type:'datetime',
    })
    createdDate: Date;

    @Column({
        type:'datetime',
        nullable: true
    })
    inactiveDate: Date;
}