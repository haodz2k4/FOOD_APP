import { Expose } from "class-transformer";



export class ResponseCartItemDto {


    @Expose()
    title: string;

    @Expose()
    thumbnail: string;

    @Expose()
    price: number;

    @Expose()
    quantity: number;

    @Expose()
    totalPrice: number;

    
}