import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './api/users/users.module';
import { UserEntity } from './api/users/entities/user.entity';
import { RolesModule } from './api/roles/roles.module';
import { RoleEntity } from './api/roles/entities/role.entity';
import { RoleSeedModule } from './database/seeds/role-seed/role-seed.module';
import { AuthModule } from './api/auth/auth.module';
import { SessionEntity } from './api/users/entities/session.entity';
import { JwtModule } from '@nestjs/jwt';
import { ProductsModule } from './api/products/products.module';
import { CategoriesModule } from './api/categories/categories.module';
import { CategoryEntity } from './api/categories/entities/category.entity';

@Module({
  imports: [
    //JWT MODULE
    JwtModule.register({global: true}),
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
        entities: [UserEntity, RoleEntity, SessionEntity, CategoryEntity],
        synchronize: false
      })
    }),
    //API MODULE 
    UsersModule,
    RolesModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    //SEED MODULE
    RoleSeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
