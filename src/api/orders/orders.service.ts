import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { ProductEntity } from '../products/entities/product.entity';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(OrderEntity) private ordersRepository: Repository<OrderEntity>,
    @InjectRepository(ProductEntity) private productsRepository: Repository<ProductEntity>
  ) {}
  async create(createOrderDto: CreateOrderDto, userId: string) {
    const { address, restaurantId, paymentMethod, items, status } = createOrderDto;

    const productIds = items.map((item) => item.productId);

    const products = await this.productsRepository.find({
      where: { id: In(productIds) },
    });

    const orderItems = products.map((product) => {
      const matchingItem = items.find((i) => i.productId === product.id);
      return {
        productId: product.id,
        quantity: matchingItem?.quantity || 1,
        price: product.price,
      };
    });

    const order = this.ordersRepository.create({
      address,
      status,
      restaurantId,
      paymentMethod,
      userId,
      items: orderItems,
    });

    return await this.ordersRepository.save(order);
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
