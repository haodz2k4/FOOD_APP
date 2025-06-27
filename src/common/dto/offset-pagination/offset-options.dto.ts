import { Expose, Type } from "class-transformer";
import { BaseQueryDto } from "../base-query.dto";
import { IsNumber, IsOptional, Min } from "class-validator";
import { DEFAULT_CURRENT_PAGE, DEFAULT_LIMIT } from "src/constants/app.constant";






export class OffsetOptionsDto extends BaseQueryDto {
    
    @IsNumber()
    @Type(() => Number)
    @Min(1)
    @IsOptional()
    page: number = DEFAULT_CURRENT_PAGE;
     
    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    limit: number = DEFAULT_LIMIT;


    offset(): number {
        return (this.page - 1) * this.limit;
    }
}