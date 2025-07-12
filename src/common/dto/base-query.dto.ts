import { IsEnum, IsOptional, IsString } from "class-validator";
import { DEFAULT_SORT_BY, DEFAULT_SORT_ORDER, SortOrder } from "src/constants/app.constant";



export class BaseQueryDto {

    @IsString()
    @IsOptional()
    keyword?: string;

    @IsString()
    @IsOptional()
    sortBy?: string = DEFAULT_SORT_BY;

    @IsEnum(SortOrder)
    @IsOptional()
    sortOrder?: SortOrder = DEFAULT_SORT_ORDER;
}