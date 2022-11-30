import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Double } from 'typeorm';

@Entity()
export class purchaseJournal {
    @PrimaryGeneratedColumn()
    id_jp: number;

    @Column({
        unique: true,
        length: 5,
    })
    jp_code: string;

    @Column()
    transaction_date: Date;

    @Column()
    created_date: Date;

    @Column()
    updated_date: Date;

    @Column({
        length: 150
    })
    reason_update: string;

    @Column({
        length: 100
    })
    created_by: string;

    @Column()
    dis_term: Double;

    @Column()
    ed_dist_term: number;

    @Column()
    ed_term: number;
}