import { IsOptional, IsString, IsUrl, IsUUID } from "class-validator";



export class CreateProductDto {

    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsUrl()
    @IsOptional()
    thumbnail?: string;

    @IsUUID()
    categoryId: string;

    
}
