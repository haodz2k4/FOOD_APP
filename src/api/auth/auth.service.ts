import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { Status } from 'src/constants/app.constant';
import { JwtService } from '@nestjs/jwt';
import * as ms from 'ms';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async signIn(loginDto: LoginDto,ip: string) {
        const {email, password} = loginDto;
        //1. Find user is exists with email sended
        const user = await this.usersService.findUserByEmail(email);
        //2. Check user is exists with password is match
        if(!user || !await user.isMatchPassword(password)) {
            throw new UnauthorizedException("Invalid email or password");
        }
        //3. Check status user
        if(user.status === Status.INACTIVE) {
            throw new UnauthorizedException("User status is inactive")
        }
        //4. Create session 
        const session = await this.usersService.createSession({
            ip,
            userId: user.id
        })


    }








    //GENERATE
    generateAccessToken(userId: string, sessionId: string): Promise<string> {
        return this.jwtService.signAsync(
            {userId, sessionId}, 
            {
                expiresIn: ms(this.configService.get('JWT_ACCESS_EXPIRES')),
                secret: this.configService.get('JWT_ACCESS_SECRET')
            }
        )
    }

    generateRefreshToken(userId: string, sessionId: string): Promise<string> {
        return this.jwtService.signAsync(
            {userId, sessionId}, 
            {
                expiresIn: ms(this.configService.get('JWT_REFRESH_EXPIRES')),
                secret: this.configService.get('JWT_REFRESH_SECRET')
            }
        )
    }
    
}
