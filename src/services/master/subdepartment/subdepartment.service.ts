import { m_subdeptCreateInterface } from '@config/interfaces/models/m-subdept.interface';
import { Label } from '@config/label';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';
import { m_subdepartement } from '@entities/m_subdepartment.entity';
import { Injectable } from '@nestjs/common';
import { mSubDepartmentRepository } from '@repository/m-subdep.repository';
import { UtilsService } from '@utils/utils.service';

@Injectable()
export class SubdepartmentService {
    label = Label;
    constructor(
        private mSubdept: mSubDepartmentRepository,
        private utils: UtilsService
    ) { }

    getSubDept(filterDto: GetActionFilterDto): Promise<m_subdepartement[]> {
        return this.mSubdept.getDept(filterDto);
    }

    async getDeptByCode(code: number): Promise<m_subdepartement> {
        return await this.mSubdept.getDeptByCode(code);
    }

    async getActiveDeptByCode(code: number): Promise<m_subdepartement> {
        return await this.mSubdept.getActiveDeptByCode(code);
    }

    async createDept(payload: m_subdeptCreateInterface): Promise<m_subdepartement> {
        return await this.mSubdept.createDepartment(payload);
    }

    async updateDept(id_subdepartment: number, payload: m_subdeptCreateInterface): Promise<m_subdepartement> {
        return await this.mSubdept.updateDepartement(id_subdepartment, payload);
    }

    async deactivate(id: number): Promise<m_subdepartement> {
        const subdepartment = await this.getDeptByCode(id);
        subdepartment.isActive = 'N';
        await this.mSubdept.save(subdepartment);
        return subdepartment;
    }
}
