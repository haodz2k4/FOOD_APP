import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ResponseOrderItemDto {

    @Expose()
    quantity: string;

    @Expose()
    title: string;

    @Expose()
    thumbnail: string;

    @Expose()
    price: string;

}