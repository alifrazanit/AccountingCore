import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Double, JoinColumn } from 'typeorm';
import { purchase } from '@entities/purchase.entity';
import { m_products } from '@entities/m_products.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class purchaseLine {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type:'integer'
    })
    qty: number;

    @Column({
        type:'float'
    })
    product_price: number;

    @Column({
        type:'float'
    })
    subtotal: number;

    @ManyToOne((_column) => purchase)
    @JoinColumn({ name: 'id_purchase'})
    @Exclude({ toPlainOnly: true })
    purchase: purchase;

    @ManyToOne((_column) => m_products)
    @JoinColumn({ name: 'id_product'})
    @Exclude({ toPlainOnly: true })
    mProducts: m_products;
}