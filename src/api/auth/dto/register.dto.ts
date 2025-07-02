import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";
import { Gender } from "src/constants/app.constant";




export class RegisterDto {

    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;

    @IsPhoneNumber()
    @IsOptional()
    phone?: string;

    @IsEnum(Gender)
    @IsOptional()
    gender?: Gender;
}