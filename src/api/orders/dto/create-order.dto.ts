import { IsArray, IsOptional, IsString, IsUUID } from "class-validator";
import { CreateOrderItemDto } from "./create-order-item.dto";


export class CreateOrderDto {

    @IsString()
    address: string;

    @IsString()
    @IsOptional()
    notes?: string;

    @IsUUID()
    restaurantId: string;

    @IsArray()
    items: CreateOrderItemDto[];
}
