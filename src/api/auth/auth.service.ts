import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { Status } from 'src/constants/app.constant';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService) {}

    async signIn(loginDto: LoginDto) {
        const {email, password} = loginDto;
        const user = await this.usersService.findUserByEmail(email);
        if(!user || !await user.isMatchPassword(password)) {
            throw new UnauthorizedException("Invalid email or password");
        }
        if(user.status === Status.INACTIVE) {
            throw new UnauthorizedException("User status is inactive")
        }
        

    }
}
