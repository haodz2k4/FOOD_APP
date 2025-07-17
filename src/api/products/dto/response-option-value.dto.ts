import { Exclude, Expose } from "class-transformer";


@Exclude()
export class ResponseOptionValueDto {

    @Expose()
    value: string;

    @Expose()
    extraPrice: number;
    
}