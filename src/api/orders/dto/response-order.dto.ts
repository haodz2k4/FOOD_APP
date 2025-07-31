import { Exclude, Expose, Type } from "class-transformer";
import { OrderStatus } from "src/constants/app.constant";
import { ResponseOrderItemDto } from "./response-order-item.dto";
import { ResponseUserDto } from "src/api/users/dto/response-user.dto";

@Exclude()
export class ResponseOrderDto {

    @Expose()
    id: string;

    @Expose()
    status: OrderStatus;

    @Expose()
    address: string;

    @Expose()
    @Type(() => ResponseUserDto)
    user: ResponseUserDto

    @Expose()
    phone: string;

    @Expose()
    notes: string;

    @Expose()
    @Type(() => ResponseOrderItemDto)
    items: ResponseOrderItemDto[]

    @Expose()
    total: number;

    @Expose()
    createdAt: Date;
    
    @Expose()
    updatedAt: Date;

}