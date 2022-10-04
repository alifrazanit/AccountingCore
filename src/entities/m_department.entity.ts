import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { m_subdepartement  } from './m_subdepartment.entity';

@Entity()
export class m_departement {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 9,
        unique: true
    })
    department_code: string;

    @Column({
        length: 50,
    })
    departement: string;

    @Column()
    id_subdepartment: number;

    @Column({
        length: 1,
    })
    is_active: string;

    @OneToOne((_column) => m_subdepartement, (subdepartment) => subdepartment.departement, { eager: true})
    subdepartement: m_subdepartement
}