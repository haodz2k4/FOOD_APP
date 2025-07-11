import { IsEnum, IsOptional, IsString } from "class-validator";
import { OffsetOptionsDto } from "src/common/dto/offset-pagination/offset-options.dto";
import { Status } from "src/constants/app.constant";


export class QueryCategoryDto extends OffsetOptionsDto {

    @IsEnum(Status)
    @IsOptional()
    status?: Status;
}