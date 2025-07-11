import { IsOptional, IsString, IsUrl } from "class-validator";


export class CreateCategoryDto {

    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsUrl()
    @IsOptional()
    thumbnail?: string;
}
