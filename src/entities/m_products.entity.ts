import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class m_products {
    @PrimaryGeneratedColumn()
    id_product: number;

    @Column({
        length: 120,
    })
    product_name: string;

    @Column({
        unique: true,
        length: 7,
    })
    product_code: string;

    @Column()
    id_uom: number;

    @Column()
    id_group_product: number;

    @Column()
    selling_price: number;

    @Column()
    purchase_price: number;

    @Column({
        nullable: true
    })
    id_supplier: number;

    @Column({
        length: 225,
        nullable: true
    })
    product_image_1: string;

    @Column({
        length: 225,
        nullable: true
    })
    product_image_2: string;

    @Column({
        length: 225,
        nullable: true
    })
    product_image_3: string;

    @Column({
        length: 225,
    })
    description: string;

    @Column()
    id_purchase_tax: number;

    @Column()
    id_sales_tax: number;

    @Column()
    min_stock: number;

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

    @Column({
        unique: true,
        length: 225,
    })
    salt: string;
}