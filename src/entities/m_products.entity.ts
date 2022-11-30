import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class m_products {
    @PrimaryGeneratedColumn()
    id_product: number;

    @Column({
        type:'varchar',
        length: 120,
    })
    product_name: string;

    @Column({
        type:'char',
        unique: true,
        length: 7,
    })
    product_code: string;

    @Column({
        type:'integer'
    })
    id_uom: number;

    @Column({
        type:'integer'
    })
    id_group_product: number;

    @Column({
        type:'double'
    })
    selling_price: number;

    @Column({
        type:'double'
    })
    purchase_price: number;

    @Column({
        type:'integer',
        nullable: true
    })
    id_supplier: number;

    @Column({
        type:'varchar',
        length: 225,
        nullable: true
    })
    product_image_1: string;

    @Column({
        type:'varchar',
        length: 225,
        nullable: true
    })
    product_image_2: string;

    @Column({
        type:'varchar',
        length: 225,
        nullable: true
    })
    product_image_3: string;

    @Column({
        type:'varchar',
        length: 225,
    })
    description: string;

    @Column({
        type:'integer'
    })
    id_purchase_tax: number;

    @Column({
        type:'integer'
    })
    id_sales_tax: number;

    @Column({
        type:'integer'
    })
    min_stock: number;

    @Column({
        type:'integer',
        length: 1,
    })
    isActive: string;

    @Column({
        type:'datetime',
        nullable: true
    })
    updated: Date;

    @Column({
        type:'datetime'
    })
    createdDate: Date;

    @Column({
        type:'datetime',
        nullable: true
    })
    inactiveDate: Date;

    @Column({
        type:'varchar',
        unique: true,
        length: 225,
    })
    salt: string;
}