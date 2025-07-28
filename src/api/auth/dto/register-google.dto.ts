import { IsEmail, IsString } from "class-validator";


export class RegisterGoogleDto {

    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsString()
    providerId: string;
}