import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class group_product {
    @PrimaryGeneratedColumn()
    id_group_product: number;

    @Column({
        length: 50,
    })
    group_name: string;
}