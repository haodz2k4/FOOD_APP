import { Exclude, Expose, Type } from "class-transformer";
import { OrderStatus } from "src/constants/app.constant";
import { ResponseOrderItemDto } from "./response-order-item.dto";

@Exclude()
export class ResponseOrderDto {

    @Expose()
    id: string;

    @Expose()
    status: OrderStatus;

    @Expose()
    address: string;

    @Expose()
    notes: string;

    @Expose()
    @Type(() => ResponseOrderItemDto)
    items: ResponseOrderItemDto[]

    @Expose()
    createdAt: Date;
    
    @Expose()
    updatedAt: Date;

}