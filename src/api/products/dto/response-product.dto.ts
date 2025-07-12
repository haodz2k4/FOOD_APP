import { Expose } from "class-transformer";


export class ResponseProductDto {

    @Expose()
    id: string;

    @Expose()
    title: string;

    @Expose()
    description?: string;

    @Expose()
    thumbnail?: string;

    @Expose()
    price: number;

    @Expose()
    discountPercentage: number;
}