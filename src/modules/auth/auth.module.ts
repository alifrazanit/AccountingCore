import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsService } from '@utils/utils.service';
import { m_users } from '@entities/m_users.entity';
import { AuthController } from '@controllers/auth/auth.controller';
import { AuthService } from '@services/auth/auth.service';
import { mUsersRepository } from '@repository/m_users.repository';
import { JwtStrategy } from '@strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MUsersService } from '@services/master/m-users/m-users.service';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => {
                return {
                    secret: config.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: config.get('JWT_EXPIRATION_TIME'),
                    },
                };
            },
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([
            m_users
        ]),
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
        mUsersRepository,
        UtilsService,
        JwtStrategy,
        ConfigService,
        MUsersService
    ],
    exports: [
        AuthService,
        JwtStrategy,
        PassportModule,
        ConfigService,
        mUsersRepository
    ]
})
export class AuthModule { }
