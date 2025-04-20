import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './api/users/users.module';
import { UserEntity } from './api/users/entities/user.entity';

@Module({
  imports: [
    //CONFIG SET UP 
    ConfigModule.forRoot({
      isGlobal: true 
    }),
    //CONNECT MYSQL 
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USERNAME'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        entities: [UserEntity],
        synchronize: false
      })
    }),
    //API MODULE 
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
