import { Expose } from "class-transformer";






export class OffsetOptionsDto {
    
    @Expose()
    page: number;
    
    @Expose()
    limit: number;


    offset(): number {
        return (this.page - 1) * this.limit;
    }
}