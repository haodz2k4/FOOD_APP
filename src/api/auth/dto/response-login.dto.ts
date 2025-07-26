import { Expose, Type } from "class-transformer";
import { ResponseUserDto } from "src/api/users/dto/response-user.dto";
import { Role } from "src/constants/role.constant";


export class ResponseLoginDto {
    
    @Expose()
    id: string;

    @Expose()
    accessToken: string;

    @Expose()
    refreshToken: string;

    @Expose()
    expiresIn: number;

    @Expose()
    @Type(() => ResponseUserDto)
    user: ResponseUserDto;

    @Expose()
    role: Role
}