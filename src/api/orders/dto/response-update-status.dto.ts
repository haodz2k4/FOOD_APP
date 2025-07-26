import { Expose } from "class-transformer";
import { OrderStatus } from "src/constants/app.constant";



export class ResponseUpdateStatus {

    @Expose()
    id: string;

    @Expose()
    status: OrderStatus;
}