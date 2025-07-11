import { IsEnum, IsOptional, IsString, IsUrl } from "class-validator";
import { Status } from "src/constants/app.constant";


export class CreateCategoryDto {

    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsUrl()
    @IsOptional()
    thumbnail?: string;

    @IsEnum(Status)
    @IsOptional()
    status?: Status;
}
