import { IsEmail, IsNumber, IsNumberString } from "class-validator";


export class VerifyOtpDto {

    @IsEmail()
    email: string;

    @IsNumberString()
    otp: string;
}