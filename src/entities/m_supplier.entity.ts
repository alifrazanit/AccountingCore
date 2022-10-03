import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class m_supplier {
    @PrimaryGeneratedColumn()
    id_supplier: number;

    @Column({
        length: 80,
    })
    name: string;

    @Column({
        unique: true,
        length: 10,
    })
    supplier_code: string;

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
        length: 80
    })
    cp: string;

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
}