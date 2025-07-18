import { Body, Controller, HttpCode, HttpStatus, Ip, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ResponseLoginDto } from './dto/response-login.dto';
import { RefreshTokenInterceptor } from 'src/interceptors/refresh-token.interceptor';
import { RegisterDto } from './dto/register.dto';
import { ResponseRegisterDto } from './dto/response-register.dto';
import { Message } from 'src/decorators/message.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Not use local strategy because manual easy than
  @Post('login')
  @UseInterceptors(RefreshTokenInterceptor)
  @HttpCode(HttpStatus.OK)
  signIn(@Body() loginDto: LoginDto, @Ip() ip: string): Promise<ResponseLoginDto> {
    return this.authService.signIn(loginDto, ip);
  }

  @Message("Register success")
  @Post('register')
  @HttpCode(HttpStatus.OK)
  register(@Body() registerDto: RegisterDto): Promise<ResponseRegisterDto> {
    return this.authService.register(registerDto)
  }

  @Post('refresh')
  refresh() {

  }

  @Post('forgot-password')
  forgotPassword() {

  }

  @Post('verify') 
  verify() {

  }

  @Post('reset-password')
  resetPassword() {
    
  }
}
