import { Injectable, NotFoundException } from '@nestjs/common';
import { Label } from '@config/label';
import { mDepartmentRepository } from '@repository/m_department.repository';
import { UtilsService } from '@utils/utils.service';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';
import { m_departement } from '@entities/m_department.entity';
import { m_departmentCreateInterface, m_departmentUpdateInterface } from '@interfaces/models/m_department.interface';
import { m_users } from '@entities/m_users.entity';
import { m_subdepartement } from '@entities/m_subdepartment.entity';

@Injectable()
export class MDepartmentService {
    label = Label;
    constructor(
        private mDeptRepo: mDepartmentRepository,
        private utils: UtilsService
    ) { }

    getDept(filterDto: GetActionFilterDto): Promise<m_departement[]> {
        return this.mDeptRepo.getDept(filterDto);
    }

    async getDeptByCode(code: string): Promise<m_departement> {
        return await this.mDeptRepo.getDeptByCode(code);
    }

    async genCode(): Promise<string> {
        const month = new Date().getMonth() + 1;
        let m = '';
        if (month < 10) {
            m = `0${month}`;
        }
        const tmpCode = `DEPT${m}`;
        let deptCode = '';
        const query = this.mDeptRepo.createQueryBuilder('m_departement');
        query.where('m_departement.department_code LIKE :search ORDER BY department_code DESC', { search: `${tmpCode}%` });
        const rowData = await query.getMany();
        if (rowData.length !== 0) {
            let countCode = rowData.length + 1;
            let count = '';
            if (countCode < 10) {
                count = `00${countCode}`;
            } else if (countCode < 100) {
                count = `0${countCode}`;
            } else if (countCode < 1000) {
                count = `${countCode}`;
            }
            deptCode = `${tmpCode}${count}`
        } else {
            deptCode = `${tmpCode}001`;
        }
        return deptCode;
    }

    async createDept(payload: m_departmentCreateInterface, subdept: m_subdepartement): Promise<m_departement> {
        return await this.mDeptRepo.createDepartment(payload, subdept);
    }

    async updateDept(payload: m_departmentUpdateInterface): Promise<m_departement> {
        const {  department_code, departement, id_subdepartment, is_active } = payload;
        const dept = await this.getDeptByCode(department_code);
        if (!dept) {
            throw new NotFoundException({
                data: '',
                error: true,
                message: this.label.notification.dataNotfound,
                status: 404
            });
        }
        dept.departement = departement;
        dept.department_code = department_code;
        // dept.id_subdepartment = id_subdepartment;
        dept.is_active = is_active;
        await this.mDeptRepo.save(dept);
        return dept;
    }

    async deactivateDept(department_code: string) {
        const dept = await this.getDeptByCode(department_code);
        dept.is_active = 'N';
        await this.mDeptRepo.save(dept);
        return dept;
    }
}
