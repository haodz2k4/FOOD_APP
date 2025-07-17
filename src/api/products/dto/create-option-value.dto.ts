import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";



export class CreateOptionValue {

    @IsString()
    value: string;

    @IsNumber()
    @Type(() => Number)
    extraPrice: number;
}