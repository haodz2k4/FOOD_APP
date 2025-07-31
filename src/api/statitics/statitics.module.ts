import { Module } from '@nestjs/common';
import { StatiticsService } from './statitics.service';
import { StatiticsController } from './statitics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { ProductEntity } from '../products/entities/product.entity';
import { OrderEntity } from '../orders/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProductEntity, OrderEntity])],
  controllers: [StatiticsController],
  providers: [StatiticsService],
})
export class StatiticsModule {}
