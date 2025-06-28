import { CursorOptionDto } from "./cursor-options.dto";
import { CursorPaginationDto } from "./cursor-pagination.dto";




export class CursorPaginatedDto<T> {

    items: T[];
    pagination: CursorOptionDto;

    constructor(items: T[], pagination: CursorPaginationDto) {
        this.items = items;
        this.pagination = pagination;
    }

}