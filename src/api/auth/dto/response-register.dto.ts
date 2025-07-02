import { Exclude, Expose } from "class-transformer";



@Exclude()
export class ResponseRegisterDto {
    @Expose()
    id: string;

    @Expose()
    createdAt: Date;
}