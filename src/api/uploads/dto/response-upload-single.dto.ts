import { Exclude, Expose } from "class-transformer";


@Exclude()
export class ResponseUploadSingleDto {

    @Expose()
    url: string;
}