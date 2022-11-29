import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne } from 'typeorm';
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

    @OneToMany((_column) => m_departement, (departement) => departement.subdepartement)
    departement: m_departement;
}