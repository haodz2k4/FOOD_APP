import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, IsUrl, IsUUID } from "class-validator";
import { Gender } from "src/constants/app.constant";


export class CreateUserDto {

    @IsString()
    fullName: string;

    @IsUrl()
    @IsOptional()
    avatar?: string;

    @IsEmail()
    email: string; 

    @IsStrongPassword()
    password: string;

    @IsPhoneNumber('VN')
    @IsOptional()
    phone?: string;

    @IsUUID()
    roleId: string;

    @IsEnum(Gender)
    @IsOptional()
    gender?: Gender;

}
