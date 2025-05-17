import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { TransformInterceptor } from './interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  //swagger 
  const config = new DocumentBuilder()
    .setTitle('TOPCV')
    .setDescription('TRANG WEB TUYEN DUNG VIEC LAM')
    .setDescription('1.0')
    .build() 
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs',app, documentFactory);

  //versioning 
  app.setGlobalPrefix('api') 
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  })

  //Validation 
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true 
  }))
  const reflector = app.get(Reflector)
  app.useGlobalInterceptors(new TransformInterceptor(reflector))
  
  const PORT = configService.get('PORT')
  await app.listen(PORT);
}

bootstrap();
