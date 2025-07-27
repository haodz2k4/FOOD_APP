import { IsEmail, IsStrongPassword } from "class-validator";


export class ResetPasswordDto {

    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;
}