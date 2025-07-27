import { MailerService } from '@nestjs-modules/mailer';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { generateRandomNumber } from 'src/utils/generate.util';

@Injectable()
export class MailService {

    constructor(
        private mailerService: MailerService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    async sendOtp(email: string): Promise<void> {
        const otp = generateRandomNumber(6);
        try {
            await this.cacheManager.set(`auth:forgot:${email}`, otp, 300);

            await this.mailerService.sendMail({
            to: email,
            subject: 'Xác thực mã Otp',
            template: './forgot.hbs',
            context: {
                otp
            }
            });
        } catch (error) {
            console.error(`Failed to send OTP: ${error.message}`);
            throw new Error('Không thể gửi mã OTP. Vui lòng thử lại sau.');
        }
    }

}
