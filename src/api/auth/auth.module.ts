import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    MailModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
