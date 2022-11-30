import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class m_uom {
    @PrimaryGeneratedColumn()
    id_uom: number;

    @Column({
        type:'char',
        unique: true,
        length: 6,
    })
    uom_code: string;

    @Column({
        type:'varchar',
        length: 20,
        unique: true,
    })
    uom_name: string;

    @Column({
        type:'varchar',
        length: 100,
    })
    description: string;

    @Column({
        type:'char',
        length: 1,
    })
    is_active: string;
}