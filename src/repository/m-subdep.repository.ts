import { DataSource, Repository } from 'typeorm';
import { ConflictException,NotFoundException,  Injectable, InternalServerErrorException } from '@nestjs/common';
import { m_subdepartement } from '@entities/m_subdepartment.entity';
import { Label } from '@config/label';
import { UtilsService } from '@utils/utils.service';
import { m_subdeptCreateInterface } from '@config/interfaces/models/m-subdept.interface';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';

@Injectable()
export class mSubDepartmentRepository extends Repository<m_subdepartement>{
    label = Label;
    constructor(private dataSource: DataSource,
        private utils: UtilsService) {
        super(m_subdepartement, dataSource.createEntityManager());
    }

    async createDepartment(payload: m_subdeptCreateInterface): Promise<m_subdepartement> {
        const dept = this.create({
           subdepartment: payload.subdepartment,
           isActive: payload.isActive
        });
        try {
            await this.save(dept);
            return dept;
        } catch (err) {
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

    async getDept(filterDto: GetActionFilterDto): Promise<m_subdepartement[]>{
        const { search } = filterDto;
        const query = this.createQueryBuilder('m_subdepartement');
        if(search){
            query.where('LOWER(m_subdepartement.subdepartment) like LOWER(:search) OR LOWER(m_subdepartement.subdepartment) like LOWER(:search)', { search: `%${search}%`})
        }
        const dept = await query.getMany();
        return dept;
    }

    async getDeptByCode(code: number): Promise<m_subdepartement>{
        return await this.findOne({ where: { id: code }})
    }

    async getActiveDeptByCode(code: number): Promise<m_subdepartement>{
        return await this.findOne({ where: { id: code, isActive:'Y' }})
    }

    async updateDepartement(id: number, payload: m_subdeptCreateInterface): Promise<m_subdepartement> {
        const supDept = await this.findOne({ where: { id: id }});
        if (!supDept) {
            throw new NotFoundException({
                data: '',
                error: true,
                message: this.label.notification.dataNotfound,
                status: 404
            });
        }
        supDept.subdepartment = payload.subdepartment;
        supDept.isActive = payload.isActive;
        await this.save(supDept);
        return supDept;
    }
}