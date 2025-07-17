import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, IsUrl, IsUUID } from "class-validator";
import { CreateOptionDto } from "./create-option.dto";



export class CreateProductDto {

    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsUrl()
    @IsOptional()
    thumbnail?: string;

    @IsOptional()
    options?: CreateOptionDto[];

    @IsNumber()
    @Type(() => Number)
    price: number;

    @IsNumber()
    discountPercentage: number;
    
    @IsUUID()
    categoryId: string;

    
}
