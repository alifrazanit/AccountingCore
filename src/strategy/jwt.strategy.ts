import { jwtPayload } from "@config/interfaces/common/jwt-payload.interface";
import { m_users } from "@entities/m_users.entity";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { mUsersRepository } from "@repository/m_users.repository";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Label  } from "@config/label";
import { ConfigService } from '@nestjs/config';
import { UtilsService } from "@utils/utils.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    label = Label;
    constructor(
        @InjectRepository(mUsersRepository)
        private mUserRepo: mUsersRepository,
        private config: ConfigService,
        private utils: UtilsService
    ) { 
        super({
            secretOrKey: config.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: jwtPayload): Promise<m_users>{
        const encrypted = payload.data;
        const { username } = this.utils.decrypt(encrypted);
        const user: m_users = await this.mUserRepo.findOne({ where: { username }})
        if(!user){
            throw new UnauthorizedException({
                data: '',
                error: true,
                message: this.label.notification.accessDenied,
                status: 401   
            });
        } else{
            return user;
        }
    }
}