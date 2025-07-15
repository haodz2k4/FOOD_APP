import { IsEnum, IsNumber, IsOptional, IsUUID } from "class-validator";
import { OffsetOptionsDto } from "src/common/dto/offset-pagination/offset-options.dto";
import { Status } from "src/constants/app.constant";
import { UUID } from "typeorm/driver/mongodb/bson.typings";



export class QueryproductDto extends OffsetOptionsDto {
    
    @IsEnum(Status)
    @IsOptional()
    status?: Status;

    @IsNumber()
    @IsOptional()
    minPrice?: number;

    @IsNumber()
    @IsOptional()
    maxPrice?: number;
    
    @IsNumber()
    minDiscountPercentage?: number;

    @IsNumber()
    @IsOptional()
    maxDiscountPercentage?: number;

    @IsUUID()
    @IsOptional()
    categoryId?: string;

}