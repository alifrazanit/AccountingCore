import { DataSource, Repository } from 'typeorm';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { m_users } from '@entities/m_users.entity';
import { UtilsService } from '@utils/utils.service';
import { Label } from '@config/label';
import { m_userCreateInterface } from '@config/interfaces/models/m_users.interface';
import { loginDto } from '@dto/models/m_users.dto';
import { GetActionFilterDto } from '@dto/filters/action-filter.dto';

@Injectable()
export class mUsersRepository extends Repository<m_users>{
    label = Label;

    constructor(private dataSource: DataSource,
        private utils: UtilsService) {
        super(m_users, dataSource.createEntityManager());
    }

    async createUser(payload: m_userCreateInterface): Promise<m_users> {
        const user = this.create(payload);
        try{
            await this.save(user);
            return user;
        } catch(err){
            if(err.code === '23505'){
                const detail:string = err.detail;
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

    async findUserLogin(payload: loginDto) {
        const userTmp = await this.findOne({ where: { username: payload.username }});
    }

    async getUser(filterDto: GetActionFilterDto): Promise<m_users[]>{
        const { search } = filterDto;
        const query = this.createQueryBuilder('m_users');
        if(search){
            query.where('LOWER(m_users.name) like LOWER(:search)', { search: `%${search}%`})
        }
        const users = await query.getMany();
        return users;
    }

    async getUserByUUID(uuid: string): Promise<m_users>{
        return await this.findOne({ where: { uuid }})
    }
}