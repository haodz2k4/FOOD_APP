import { IsArray, IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { CreateOrderItemDto } from "./create-order-item.dto";
import { OrderStatus, PaymentMethod } from "src/constants/app.constant";


export class CreateOrderDto {

    @IsString()
    address: string;

    @IsString()
    @IsOptional()
    notes?: string;

    @IsUUID()
    restaurantId: string;

    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus;

    @IsEnum(PaymentMethod)
    paymentMethod: PaymentMethod;

    @IsArray()
    items: CreateOrderItemDto[];
}
