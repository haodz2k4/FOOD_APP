import { IsNumber, IsOptional, IsString } from "class-validator";
import { BaseQueryDto } from "../base-query.dto";
import { DEFAULT_LIMIT } from "src/constants/app.constant";



export class CursorOptionDto extends BaseQueryDto {

    @IsString()
    @IsOptional()
    afterCursor?: string;

    @IsString()
    @IsOptional()
    beforeCursor?: string;

    @IsNumber()
    @IsOptional()
    limit?: number = DEFAULT_LIMIT;


}