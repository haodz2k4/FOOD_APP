import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { ProductEntity } from '../products/entities/product.entity';
import { OrderItemEntity } from './entities/order-items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, ProductEntity, OrderItemEntity])],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {}
