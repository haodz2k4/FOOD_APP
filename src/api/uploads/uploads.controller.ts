import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseUploadSingleDto } from './dto/response-upload-single.dto';
import { ResponseUploadMultiDto } from './dto/response-upload-multi.dto';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('file'))
  uploadSingle(@UploadedFile() file: Express.Multer.File) :Promise<ResponseUploadSingleDto> {
    return this.uploadsService.uploadSingle(file)
  }

  @Post('multi')
  @UseInterceptors(FileInterceptor('files'))
  uploadMulti(@UploadedFiles() files: Express.Multer.File[]): Promise<ResponseUploadMultiDto> {
    return this.uploadsService.uploadMulti(files);
  }
}
