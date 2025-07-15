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
    minPrice?: number = DEFAULT_MIN_PRICE;

    @IsNumber()
    @IsOptional()
    maxPrice?: number =  DEFAULT_MAX_PRICE;
    
    @IsNumber()
    @IsOptional()
    minDiscountPercentage?: number = DEFAULT_MIN_PERCENTAGE;

    @IsNumber()
    @IsOptional()
    maxDiscountPercentage?: number = DEFAULT_MAX_PERCENTAGE;

    @IsUUID()
    @IsOptional()
    categoryId?: string;

}