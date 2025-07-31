import { Injectable } from '@nestjs/common';
import { CreateStatiticDto } from './dto/create-statitic.dto';
import { UpdateStatiticDto } from './dto/update-statitic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { OrderEntity } from '../orders/entities/order.entity';
import { ProductEntity } from '../products/entities/product.entity';
import { OrderStatus } from 'src/constants/app.constant';

@Injectable()
export class StatiticsService {
  
  constructor(
    @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
    @InjectRepository(OrderEntity) private ordersRepository: Repository<OrderEntity>,
    @InjectRepository(ProductEntity) private productsRepository: Repository<ProductEntity>
  ) {

  }
  async general() {
  // 1. Tổng số người dùng
  const userCount = await this.usersRepository.count();

  // 2. Lấy tất cả đơn hàng có trạng thái đã giao (done/delivered)
  const completedOrders = await this.ordersRepository.find({
    where: { status:  OrderStatus.DONE}, // hoặc 'done' tùy theo backend bạn
    relations: ['items'],
  });
  console.log(completedOrders)
  // 3. Tính tổng doanh thu
  const totalRevenue = completedOrders.reduce((total, order) => {
    const orderTotal = order.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
    return total + orderTotal;
  }, 0);

  // 4. Tổng số sản phẩm
  const productCount = await this.productsRepository.count();

  return {
    userCount,
    totalOrders: completedOrders.length,
    totalRevenue,
    productCount,
  };
}

}
