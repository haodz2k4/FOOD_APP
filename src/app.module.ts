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
import { ProductEntity } from './api/products/entities/product.entity';
import { ProductImageEntity } from './api/products/entities/product-image.entity';
import { ProductOptionEntity } from './api/products/entities/product-options.entity';
import { OptionValueEntity } from './api/products/entities/option_value.entity';
import { UploadsModule } from './api/uploads/uploads.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { OrderEntity } from './api/orders/entities/order.entity';
import { RestaurantEntity } from './api/restaurants/entities/restaurant.entity';
import { OrderItemEntity } from './api/orders/entities/order-items.entity';
import { OrdersModule } from './api/orders/orders.module';
import { MomoModule } from './api/momo/momo.module';
import { SocketModule } from './socket/socket.module';
import { CartModule } from './api/cart/cart.module';
import { CartEntity } from './api/cart/entities/cart.entity';
import { MailModule } from './mail/mail.module';
import { CacheModule } from '@nestjs/cache-manager';
import { CartItemEntity } from './api/cart/entities/cart-item.entity';
import * as redisStore from 'cache-manager-ioredis';
import { ProviderEntity } from './api/users/entities/provider.entity';
import { RestaurantsModule } from './api/restaurants/restaurants.module';

@Module({
  imports: [
     CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      username: process.env.REDIS_USERNAME,
      password:process.env.REDIS_PASSWORD,
      ttl: 300

      
     }),
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
        entities: [
          UserEntity, 
          RoleEntity, 
          SessionEntity, 
          CategoryEntity, 
          ProductEntity, 
          ProductImageEntity,
          ProductOptionEntity,
          OptionValueEntity,
          OrderEntity,
          RestaurantEntity,
          OrderItemEntity,
          CartEntity,
          CartItemEntity,
          ProviderEntity
        ],
        synchronize: false
      })
    }),
    //API MODULE 
    UsersModule,
    RolesModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    UploadsModule,
    CloudinaryModule,
    OrdersModule,
    MomoModule,
    CartModule,
    RestaurantsModule,
    //SEED MODULE
    RoleSeedModule,
    SocketModule,
    MailModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
})
export class AppModule {}
