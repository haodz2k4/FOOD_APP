import { Injectable } from '@nestjs/common';
import { CreateStatiticDto } from './dto/create-statitic.dto';
import { UpdateStatiticDto } from './dto/update-statitic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { OrderEntity } from '../orders/entities/order.entity';
import { ProductEntity } from '../products/entities/product.entity';
import { OrderStatus } from 'src/constants/app.constant';
import * as dayjs from 'dayjs';
import { Between } from 'typeorm';


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


  async profit() {
    const today = dayjs();
    const startDate = today.subtract(29, 'day').startOf('day');
    const endDate = today.endOf('day');

    const completedOrders = await this.ordersRepository.find({
      where: {
        status: OrderStatus.DONE,
        createdAt: Between(startDate.toDate(), endDate.toDate()),
      },
      relations: ['items'],
    });

    // Tạo map mặc định 30 ngày gần nhất với revenue = 0
    const dailyRevenueMap = new Map<string, number>();
    for (let i = 0; i < 30; i++) {
      const dateKey = startDate.add(i, 'day').format('YYYY-MM-DD');
      dailyRevenueMap.set(dateKey, 0);
    }

    // Cộng dồn doanh thu theo từng ngày
    completedOrders.forEach(order => {
      const dateKey = dayjs(order.createdAt).format('YYYY-MM-DD');
      const revenue = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      if (dailyRevenueMap.has(dateKey)) {
        dailyRevenueMap.set(dateKey, dailyRevenueMap.get(dateKey)! + revenue);
      }
    });

    // Trả về mảng để render biểu đồ
    const result = Array.from(dailyRevenueMap.entries()).map(([date, revenue]) => ({
      date,
      revenue,
    }));

    return result;
  }

}
