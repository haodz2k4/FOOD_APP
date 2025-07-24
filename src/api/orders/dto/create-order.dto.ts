import { IsArray, IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { CreateOrderItemDto } from "./create-order-item.dto";
import { PaymentMethod } from "src/constants/app.constant";


export class CreateOrderDto {

    @IsString()
    address: string;

    @IsString()
    @IsOptional()
    notes?: string;

    @IsUUID()
    restaurantId: string;

    @IsEnum(PaymentMethod)
    paymentMethod: PaymentMethod;

    @IsArray()
    items: CreateOrderItemDto[];
}
