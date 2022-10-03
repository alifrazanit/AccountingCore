import { DataSource, Repository } from 'typeorm';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { m_departement } from '@entities/m_department.entity';
import { Label } from '@config/label';
import { UtilsService } from '@utils/utils.service';
import { m_departmentCreateInterface, m_departmentUpdateInterface } from '@interfaces/models/m_department.interface';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';
import { m_subdepartement } from '@entities/m_subdepartment.entity';


@Injectable()
export class mDepartmentRepository extends Repository<m_departement>{
    label = Label;
    constructor(private dataSource: DataSource,
        private utils: UtilsService) {
        super(m_departement, dataSource.createEntityManager());
    }


    async createDepartment(payload: m_departmentCreateInterface, subdept: m_subdepartement): Promise<m_departement> {
        const dept = this.create({
            departement: payload.departement,
            department_code: payload.department_code,
            is_active: payload.is_active,
            id_subdepartment: subdept
        });
        try {
            await this.save(dept);
            return dept;
        } catch (err) {
            console.log('err', err)
            if (err.code === '23505') {
                const detail: string = err.detail;
                let field = this.utils.fetchErrorInsideString(detail);
                let msg = `field ${field} ${this.label.notification.duplicateError}`;
                throw new ConflictException({
                    data: '',
                    error: false,
                    message: msg,
                    status: 200
                })
            } else {
                throw new InternalServerErrorException({
                    data: '',
                    error: true,
                    message: err,
                    status: 500
                });
            }
        }
    }

    async getDept(filterDto: GetActionFilterDto): Promise<m_departement[]> {
        const { search } = filterDto;
        const query = this.createQueryBuilder('m_customer');
        if (search) {
            query.where('LOWER(m_departement.department_code) like LOWER(:search) OR LOWER(m_departement.departement) like LOWER(:search)', { search: `%${search}%` })
        }
        const dept = await query.getMany();
        return dept;
    }

    async getDeptByCode(code: string): Promise<m_departement> {
        return await this.findOne({ where: { department_code: code } })
    }


}