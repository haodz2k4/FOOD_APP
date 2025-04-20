import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    //CONFIG SET UP 
    ConfigModule.forRoot({
      isGlobal: true 
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
