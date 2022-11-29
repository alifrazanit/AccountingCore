import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { m_departement } from '@entities/m_department.entity';

@Entity()
export class m_subdepartement {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50,
        unique: true
    })
    subdepartment: string;

    @Column({
        length: 1
    })
    isActive: string;

    @OneToOne((_column) => m_departement, (departement) => departement.subdepartement, { eager: false})
    departement: m_departement;
}