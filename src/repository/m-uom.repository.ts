import { DataSource, Repository } from 'typeorm';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { m_uom } from '@entities/m_uom.entity';
import { Label } from '@config/label';
import { UtilsService } from '@utils/utils.service';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';
import { createInterface, updateInterface } from '@interfaces/models/m-uom.interface';

@Injectable()
export class mUomRepository extends Repository<m_uom>{
    label = Label;
    constructor(private dataSource: DataSource,
        private utils: UtilsService) {
        super(m_uom, dataSource.createEntityManager());
    }

    async getUOM(filterDto: GetActionFilterDto): Promise<m_uom[]> {
        const { search } = filterDto;
        const query = this.createQueryBuilder('m_uom');
        if (search) {
            query.where('LOWER(m_uom.uom_code) like LOWER(:search)', { search: `%${search}%` })
        }
        const users = await query.getMany();
        return users;
    }

    async getCode(code: string): Promise<m_uom> {
        return await this.findOne({ where: { uom_code: code } })
    }

    async createUom(payload: createInterface): Promise<m_uom> {
        const { description, uom_code, uom_name } = payload;
        const uom = this.create({
            description: description,
            id_uom: 0,
            is_active: 'Y',
            uom_code: uom_code,
            uom_name: uom_name
        });
        try {
            await this.save(uom);
            return uom;
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
}