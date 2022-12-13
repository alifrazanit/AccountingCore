import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { createUserDto, loginDto, m_usersDto, signUpDto } from '@dto/models/m_users.dto';
import { m_users } from '@entities/m_users.entity';
import { mUsersRepository } from '@repository/m_users.repository';
import { m_userCreateInterface } from '@config/interfaces/models/m_users.interface';
import * as bcrypt from 'bcrypt';
import { Label } from '@config/label';
import { UtilsService } from '@utils/utils.service';
import { JwtService } from '@nestjs/jwt';
import { MUsersService } from '@services/master/m-users/m-users.service';

@Injectable()
export class AuthService {
    label = Label;
    constructor(
        private mUserRepo: mUsersRepository,
        private utils: UtilsService,
        private jwtService: JwtService,
        private mUserService: MUsersService
    ) { }
    
    async signIn(p: loginDto): Promise<{ token: string }> {
        const { password, username } = p;
        const user = await this.mUserRepo.findOne({ where: { username, isActive: 'Y' } });
        if (user && (await bcrypt.compare(password, user.password))) {
            const payloadUsername = { username };
            const encryptData = this.utils.ecryptObj(payloadUsername);
            const p = {
                data: encryptData
            }
            const token: string = await this.jwtService.sign(p);
            return { token };
        } else {
            throw new UnauthorizedException({
                data: '',
                error: true,
                message: this.label.notification.failedLogin,
                status: 401
            })
        }
    }

}
