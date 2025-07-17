import { Exclude, Expose, Type } from "class-transformer";
import { ResponseOptionValueDto } from "./response-option-value.dto";



@Exclude()
export class ResponseOptionDto {

    @Expose()
    name: string;

    @Expose()
    @Type(() => ResponseOptionValueDto)
    values: ResponseOptionValueDto[];
}