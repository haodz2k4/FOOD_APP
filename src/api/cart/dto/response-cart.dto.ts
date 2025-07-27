import { Expose } from "class-transformer";
import { ResponseCartItemDto } from "./response-cart-item.dto";



export class ResponseCartDto {

    @Expose()
    userId: string;

    @Expose()
    items: ResponseCartItemDto[];
}