import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, IsUrl, IsUUID } from "class-validator";



export class CreateProductDto {

    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsUrl()
    @IsOptional()
    thumbnail?: string;

    @IsNumber()
    @Type(() => Number)
    price: number;

    @IsNumber()
    discountPercentage: number;
    
    @IsUUID()
    categoryId: string;

    
}
