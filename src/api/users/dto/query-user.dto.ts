import { IsEnum, IsOptional } from "class-validator";
import { OffsetOptionsDto } from "src/common/dto/offset-pagination/offset-options.dto";
import { Gender, Status } from "src/constants/app.constant";



export class QueryUserDto extends OffsetOptionsDto {

    @IsOptional()
    @IsEnum(Gender)
    gender?: Gender;

    @IsOptional()
    @IsEnum(Status)
    status?: Status;
}