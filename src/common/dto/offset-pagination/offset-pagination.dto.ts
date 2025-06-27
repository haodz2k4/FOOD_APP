import { Expose } from "class-transformer";
import { OffsetOptionsDto } from "./offset-options.dto";




export class OffsetPaginationDto {

    @Expose()
    readonly currentPage: number;

    @Expose()
    readonly limit: number;

    @Expose()
    readonly offset: number;

    @Expose()
    readonly nextPage?: number;

    @Expose()
    readonly previousPage?: number;

    @Expose()
    readonly totalRecords: number;

    @Expose()
    readonly totalPages: number;

    constructor(totalRecords: number, options: OffsetOptionsDto) {
        this.totalRecords = totalRecords;
        this.currentPage = options.page;
        this.limit = options.limit;
        this.offset = options.offset();
        this.nextPage = this.currentPage < this.totalPages ? this.currentPage + 1 : undefined;
        this.previousPage = this.currentPage > 1 ? this.currentPage - 1 : undefined; 
        this.totalPages = Math.ceil(this.totalRecords / this.limit);
    }
}