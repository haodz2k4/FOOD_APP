import { Exclude, Expose, Type } from "class-transformer";
import { ResponseCategoryDto } from "src/api/categories/dto/response-category.dto";

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
    @Type(() => ResponseCategoryDto)
    category: ResponseCategoryDto;

    @Expose() 
    images: string[]

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}