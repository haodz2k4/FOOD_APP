import { IsNumber, IsUUID } from "class-validator";


export class CreateOrderItemDto {

    @IsUUID()
    productId: string;

    @IsNumber()
    quantity: number;

}