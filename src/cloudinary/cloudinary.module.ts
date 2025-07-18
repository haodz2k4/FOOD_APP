import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CLOUDINARY } from 'src/constants/app.constant';
import { v2 } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [],
  providers: [CloudinaryService, {
    provide: CLOUDINARY,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => 
      v2.config({
        cloud_name: configService.get<string>('CLOUDINARY_CLOUD_NAME'),
        api_key: configService.get<string>('CLOUDINARY_API_KEY'),
        api_secret: configService.get<string>('CLOUDINARY_API_SECRET')
      })
  }],
  exports: [CloudinaryService]
})
export class CloudinaryModule {}
