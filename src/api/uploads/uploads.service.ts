import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ResponseUploadSingleDto } from './dto/response-upload-single.dto';
import { plainToInstance } from 'class-transformer';
import { ResponseUploadMultiDto } from './dto/response-upload-multi.dto';

@Injectable()
export class UploadsService {

    constructor(private cloudinaryService: CloudinaryService) {}

    async uploadSingle(file: Express.Multer.File) :Promise<ResponseUploadSingleDto> {
        const result = await this.cloudinaryService.uploadSingle(file)
        return plainToInstance(ResponseUploadSingleDto, result);
    }

    async uploadMulti(files: Express.Multer.File[]) :Promise<ResponseUploadMultiDto> {
        const results = await this.cloudinaryService.uploadMulti(files);
        const urls = results.map((item) => item.secure_url)
        return plainToInstance(ResponseUploadMultiDto, {urls})
    }
}
