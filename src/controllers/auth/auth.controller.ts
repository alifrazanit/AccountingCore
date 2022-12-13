import { Controller, Post, Body, BadRequestException, UseGuards } from '@nestjs/common';
import { loginDto, signUpDto } from '@dto/models/m_users.dto';
import { callback } from '@config/interfaces/common/callback.interface';
import { AuthService } from '@services/auth/auth.service';
import { m_userCreateInterface } from '@interfaces/models/m_users.interface';
import * as bcrypt from 'bcrypt';
import { UtilsService } from '@utils/utils.service';
import { MUsersService } from '@services/master/m-users/m-users.service';
import { Label } from '@config/label';

@Controller('auth')
export class AuthController {
    label = Label;
    constructor(
        private authService: AuthService,
        private utils: UtilsService,
        private mUserService: MUsersService
    ) { }

    @Post('/login')
    async signIn(@Body() payload: loginDto): Promise<callback> {
        const res = await this.authService.signIn(payload);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }

    @Post('/sign-up')
    async signUp(@Body() dataBody: signUpDto): Promise<callback> {
        const { name, password, phone, username, email } = dataBody;
        const userExist = await this.mUserService.getOneUserBy({ username })
        if (userExist) {
            throw new BadRequestException({
                data: '',
                error: true,
                message: this.label.notification.dataalreadyexist + 'username',
                status: 400
            });
        }
        const tmpPhone = await this.utils.genPhone(phone);
        if (tmpPhone === '') {
            throw new BadRequestException({
                data: '',
                error: true,
                message: this.label.notification.invalid + ' phone number!',
                status: 400
            });
        }
        const userExist2 = await this.mUserService.getOneUserBy({ email })
        if (userExist2) {
            throw new BadRequestException({
                data: '',
                error: true,
                message: this.label.notification.dataalreadyexist + 'email',
                status: 400
            });
        }
        const genNik = await this.mUserService.genNIK();
        const salt = await bcrypt.genSalt();
        const hashedPassowrd = await bcrypt.hash(password, salt);
        const uuid = await this.mUserService.genUUID();
        const payload: m_userCreateInterface = {
            name: name.toLocaleUpperCase(),
            address: '',
            city: '',
            country: '',
            email: email,
            nik: genNik,
            password: hashedPassowrd,
            phone: tmpPhone,
            postalcode: '',
            username: username,
            uuid,
            isActive: 'Y',
            createdDate: new Date(this.utils.formatDate(new Date()))
        }
        const res = await this.mUserService.createUser(payload);
        return {
            data: res,
            error: false,
            message: '',
            status: 200
        }
    }
}
