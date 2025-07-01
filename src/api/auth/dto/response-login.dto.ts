import { Expose } from "class-transformer";


export class ResponseLoginDto {
    
    @Expose()
    id: string;

    @Expose()
    accessToken: string;

    @Expose()
    refreshToken: string;

    @Expose()
    expiresIn: number;
}