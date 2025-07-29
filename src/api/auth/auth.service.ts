import { Repository } from 'typeorm';
import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { Providers, Status } from 'src/constants/app.constant';
import { JwtService } from '@nestjs/jwt';
import * as ms from 'ms';
import { ConfigService } from '@nestjs/config';
import { ResponseLoginDto } from './dto/response-login.dto';
import { plainToInstance } from 'class-transformer';
import { RegisterDto } from './dto/register.dto';
import { ResponseRegisterDto } from './dto/response-register.dto';
import { RolesService } from '../roles/roles.service';
import { Role } from 'src/constants/role.constant';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { MailService } from 'src/mail/mail.service';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../orders/entities/order.entity';
import { ProviderEntity } from '../users/entities/provider.entity';
import { RegisterGoogleDto } from './dto/register-google.dto';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private rolesService: RolesService,
        private mailService: MailService,
        @Inject(CACHE_MANAGER) private cache: Cache,
        @InjectRepository(ProviderEntity) private providerRepository: Repository<ProviderEntity>,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
    ) {}

    async registerGoogle(dto: RegisterGoogleDto) {
        const {email, fullName, providerId} = dto;
        const {id} = await this.rolesService.findRoleByName(Role.USER);
        const user = await this.userRepository.create({roleId: id ,email, fullName}).save()

        await this.providerRepository.create({
            userId: user.id,
            provider: Providers.GOOGLE,
            providerId
        }).save()

    }

    async loginGoogle(email: string) {
        const user = await this.usersService.findUserByEmail(email);
        if(!user) {
            throw new NotFoundException("User is not found")
        }
        const session = await this.usersService.createSession({
            ip: '123456',
            userId: user.id
        })
        const isExists = await this.providerRepository.findOneBy({
            userId: user.id
        })
        if(!isExists) {
            throw new UnauthorizedException("You have not registered with a Google account.")
        }

        const [accessToken, refreshToken] = await Promise.all([
            this.generateAccessToken(user.id, session.id),
            this.generateRefreshToken(user.id, session.id)
        ])
        return {
            accessToken,
            refreshToken
        }

    }

    async signIn(loginDto: LoginDto,ip: string) :Promise<ResponseLoginDto> {
        const {email, password} = loginDto;
        const user = await this.validateUser(email, password);
        const session = await this.usersService.createSession({
            ip,
            userId: user.id
        })
        const {title} = await this.rolesService.findOne(user.roleId)
        const [accessToken, refreshToken] = await Promise.all([
            this.generateAccessToken(user.id, session.id),
            this.generateRefreshToken(user.id, session.id)
        ])

        return plainToInstance(ResponseLoginDto, {
            id: user.id,
            accessToken,
            refreshToken,
            expiresIn: ms(this.configService.get<ms.StringValue>('JWT_ACCESS_EXPIRES')) / 1000,
            user,
            role: title
        })

    }

    async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
        const {email} = forgotPasswordDto;
        const user = await this.usersService.findUserByEmail(email);
        if(!user) {
            throw new NotFoundException("email is not found")
        }
        await this.mailService.sendOtp(email);
    }

    async validateUser(email: string, password: string) {
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
        return user;
    }

    async verify(verifyOtpDto: VerifyOtpDto) {
        const {email, otp} = verifyOtpDto;
        const user = await  this.usersService.findUserByEmail(email);
        if(!user) {
            throw new NotFoundException("Email is not found")
        }
        const otpCode = await this.cache.get(`auth:forgot:${email}`);
        if(!otpCode || otpCode !== otp) {
            throw new UnauthorizedException("Invalid otp code")
        }
        
    }

    async register(registerDto: RegisterDto): Promise<ResponseRegisterDto> {
        const {id} = await this.rolesService.findRoleByName(Role.USER);
        const user = await this.usersService.create({
            ...registerDto,
            roleId: id
        })

        return plainToInstance(ResponseRegisterDto, user);
    }

    async resetPassword(dto: ResetPasswordDto) {
        const {email, password} = dto;
        const user = await this.usersService.findUserByEmail(email);
        if(!user) {
            throw new NotFoundException("User is not found");
        }
        user.password = password;
        await user.save();
        
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
