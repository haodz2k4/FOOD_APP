import { Exclude, Expose } from "class-transformer";

@Exclude()
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

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}