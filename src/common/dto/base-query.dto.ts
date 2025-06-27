import { IsEnum, IsOptional, IsString } from "class-validator";
import { SortOrder } from "src/constants/app.constant";



export class BaseQueryDto {

    @IsString()
    @IsOptional()
    keyword?: string;

    @IsString()
    @IsOptional()
    sortBy?: string;

    @IsEnum(SortOrder)
    @IsOptional()
    sortOrder?: SortOrder;
}