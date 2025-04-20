import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('TOPCV')
    .setDescription('TRANG WEB TUYEN DUNG VIEC LAM')
    .setDescription('1.0')
    .build() 
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs',app, documentFactory);

  const PORT = configService.get('PORT')
  await app.listen(PORT);
}

bootstrap();
