import { Exclude, Expose } from "class-transformer";


@Exclude()
export class ResponseSessionDto {

    @Expose()
    id: string;

    @Expose()
    ip: string;

    @Expose()
    expiresAt: Date;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}