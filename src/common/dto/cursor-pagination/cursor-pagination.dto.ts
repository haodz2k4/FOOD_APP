import { Expose } from "class-transformer";
import { CursorOptionDto } from "./cursor-options.dto";


//Cursor by timestamp createdAt
export class CursorPaginationDto {

    @Expose()
    readonly limit?: number;
    
    @Expose()
    readonly afterCursor?: string;

    @Expose()
    readonly beforeCursor?: string;

    @Expose()
    readonly totalRecords: number;

    
    constructor(total: number, opt: CursorOptionDto) {
        this.totalRecords = total;
        this.afterCursor = opt.afterCursor;
        this.beforeCursor = opt.beforeCursor;
        this.limit = opt.limit
    }
}