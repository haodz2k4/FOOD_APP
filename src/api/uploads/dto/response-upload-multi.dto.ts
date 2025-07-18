import { Expose } from "class-transformer";



export class ResponseUploadMultiDto {

    @Expose()
    urls: string[]
}