import { Controller, Post, Body, BadRequestException, UseGuards } from '@nestjs/common';
import { createUserDto, loginDto } from '@dto/models/m_users.dto';
import { callback } from '@config/interfaces/common/callback.interface';
import { AuthService } from '@services/auth/auth.service';
import { m_userCreateInterface } from '@interfaces/models/m_users.interface';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { UtilsService } from '@utils/utils.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private utils: UtilsService
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
}
