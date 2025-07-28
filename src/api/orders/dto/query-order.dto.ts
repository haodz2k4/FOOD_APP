import { IsEnum, IsOptional, IsUUID } from "class-validator";
import { OrderStatus } from "src/constants/app.constant";



export class QueryOrderDto {
    
    @IsUUID()
    @IsOptional()
    userId?: string;

    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus;
}