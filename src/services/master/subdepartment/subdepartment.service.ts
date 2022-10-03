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

    async getDeptByCode(code: string): Promise<m_subdepartement> {
        return await this.mSubdept.getDeptByCode(code);
    }

    async createDept(payload: m_subdeptCreateInterface): Promise<m_subdepartement> {
        return await this.mSubdept.createDepartment(payload);
    }
}
