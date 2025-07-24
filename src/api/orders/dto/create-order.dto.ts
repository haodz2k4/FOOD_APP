import { IsOptional, IsString, IsUUID } from "class-validator";


export class CreateOrderDto {

    @IsString()
    address: string;

    @IsString()
    @IsOptional()
    notes?: string;

    @IsUUID()
    restaurantId: string;
}
