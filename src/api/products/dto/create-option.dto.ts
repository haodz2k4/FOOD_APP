import { IsArray, IsString } from "class-validator";
import { CreateOptionValue } from "./create-option-value.dto";



export class CreateOptionDto {

    @IsString()
    name: string;

    @IsArray()
    values: CreateOptionValue[]
}