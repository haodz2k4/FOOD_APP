import { Exclude, Expose } from "class-transformer";



@Exclude()
export class ResponseCategoryDto {

    @Expose()
    id: string;

    @Expose()
    title: string;

    @Expose()
    description: string;

    @Expose()
    thumbnail: string;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}