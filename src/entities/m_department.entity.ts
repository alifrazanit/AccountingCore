import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { m_subdepartement  } from './m_subdepartment.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class m_departement {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type:'char',
        length: 9,
        unique: true
    })
    department_code: string;

    @Column({
        type:'varchar',
        length: 50,
    })
    departement: string;

    @Column({
        type:'char',
        length: 1,
    })
    is_active: string;

    @ManyToOne((_column) => m_subdepartement)
    @JoinColumn({ name: 'id_subdepartment'})
    @Exclude({ toPlainOnly: true })
    subdepartement: m_subdepartement;
}