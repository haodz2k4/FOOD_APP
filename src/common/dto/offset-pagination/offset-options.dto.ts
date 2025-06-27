import { Expose } from "class-transformer";
import { BaseQueryDto } from "../base-query.dto";






export class OffsetOptionsDto extends BaseQueryDto {
    
    @Expose()
    page: number;
    
    @Expose()
    limit: number;


    offset(): number {
        return (this.page - 1) * this.limit;
    }
}