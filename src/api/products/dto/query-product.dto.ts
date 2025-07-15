import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsUUID } from "class-validator";
import { OffsetOptionsDto } from "src/common/dto/offset-pagination/offset-options.dto";
import { DEFAULT_MAX_PERCENTAGE, DEFAULT_MAX_PRICE, DEFAULT_MIN_PERCENTAGE, DEFAULT_MIN_PRICE, Status } from "src/constants/app.constant";
import { UUID } from "typeorm/driver/mongodb/bson.typings";



export class QueryproductDto extends OffsetOptionsDto {
    
    @IsEnum(Status)
    @IsOptional()
    status?: Status;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    minPrice?: number = DEFAULT_MIN_PRICE;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    maxPrice?: number =  DEFAULT_MAX_PRICE;
    
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    minDiscountPercentage?: number = DEFAULT_MIN_PERCENTAGE;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    maxDiscountPercentage?: number = DEFAULT_MAX_PERCENTAGE;

    @IsUUID()
    @IsOptional()
    categoryId?: string;

}