import { IsEnum, IsString } from "class-validator";
import { OrderStatus } from "src/constants/app.constant";


export class ChangeStatusOrderDto {

    @IsString()
    id: string;

    @IsEnum(OrderStatus)
    status: OrderStatus;
}