import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class m_uom {
    @PrimaryGeneratedColumn()
    id_uom: number;

    @Column({
        unique: true,
        length: 6,
    })
    uom_code: string;

    @Column({
        length: 20,
        unique: true,
    })
    uom_name: string;

    @Column({
        length: 100,
    })
    description: string;

    @Column({
        length: 1,
    })
    is_active: string;
}