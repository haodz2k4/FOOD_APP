import { Expose } from "class-transformer";
import { OffsetPaginationDto } from "./offset-pagination.dto";



export class OffsetPaginatedDto<T> {

    @Expose()
    items: T[];

    @Expose()
    pagination: OffsetPaginationDto;
    constructor(items: T[], pagination: OffsetPaginationDto) {
        this.items = items;
        this.pagination = pagination;
    }
}