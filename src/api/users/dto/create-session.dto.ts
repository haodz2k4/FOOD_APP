import { IsString, IsUUID } from "class-validator";




export class CreateSessionDto {

    @IsString()
    ip: string;

    @IsUUID()
    userId: string;
}