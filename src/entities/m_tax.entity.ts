import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class m_tax {
    @PrimaryGeneratedColumn()
    id_tax: number;

    @Column({
        unique: true,
        length: 9,
    })
    tax_code: string;

    @Column({
        length: 15,
        unique: true,
    })
    tax_name: string;

    @Column('decimal', { precision: 5, scale: 2 })
    percentage: number;

    @Column({
        length: 1,
    })
    is_active: string;
}