import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { CloudinaryResponse } from './types/cloudinary-response';

@Injectable()
export class CloudinaryService {
  uploadSingle(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  uploadMulti(files: Express.Multer.File[]) :Promise<CloudinaryResponse[]> {
    const uploadPromises = files.map((file) => this.uploadSingle(file));
    return Promise.all(uploadPromises)
  }
}
