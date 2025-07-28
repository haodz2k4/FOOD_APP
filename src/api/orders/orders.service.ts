import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { ProductEntity } from '../products/entities/product.entity';
import { ResponseOrderDto } from './dto/response-order.dto';
import { plainToInstance } from 'class-transformer';
import { OrderItemEntity } from './entities/order-items.entity';
import { OrderStatus } from 'src/constants/app.constant';
import { ResponseUpdateStatus } from './dto/response-update-status.dto';
import { QueryOrderDto } from './dto/query-order.dto';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(OrderEntity) private ordersRepository: Repository<OrderEntity>,
    @InjectRepository(ProductEntity) private productsRepository: Repository<ProductEntity>,
    @InjectRepository(OrderItemEntity) private orderItemsRepository: Repository<OrderItemEntity>
  ) {}
  async create(createOrderDto: CreateOrderDto, userId: string) {
  const { address, restaurantId, paymentMethod, items, status, notes } = createOrderDto;

  const productIds = items.map((item) => item.productId);

  const products = await this.productsRepository.find({
    where: { id: In(productIds) },
  });

  const order = this.ordersRepository.create({
    address,
    status,
    notes,
    restaurantId,
    paymentMethod,
    userId,
  });
  const savedOrder = await this.ordersRepository.save(order);

  const orderItems = products.map((product) => {
    const matchingItem = items.find((i) => i.productId === product.id);

    return this.orderItemsRepository.create({
      productId: product.id,
      quantity: matchingItem?.quantity || 1,
      price: product.price,
      order: savedOrder,
    });
  });

  await this.orderItemsRepository.save(orderItems);

  const fullOrder = await this.ordersRepository.findOne({
    where: { id: savedOrder.id },
    relations: {
      items: true,
    },
  });

  return fullOrder;
}


 async findAll(query: QueryOrderDto): Promise<ResponseOrderDto[]> {
  const {userId, status} = query
  const orders = await this.ordersRepository.find({
    relations: {
      items: {
        product: true,
      },
      user: true
    },
    order: {
      createdAt: 'DESC',
    },
    where: {
      userId,
      status
    }
  });

  return orders.map(order => {
    return plainToInstance(ResponseOrderDto, {
      id: order.id,
      status: order.status,
      address: order.address,
      notes: order.notes,
      user: order.user,
      items: order.items.map(item => ({
        quantity: item.quantity.toString(),
        title: item.product?.title,
        thumbnail: item.product?.thumbnail,
        price: item.price.toString(),
      })),
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    });
  });
}

  async updateStatus(id: string, status: OrderStatus) :Promise<ResponseUpdateStatus> {
    console.log(status)
    const order = await this.ordersRepository.findOneBy({id});
    if(!order) {
      throw new NotFoundException("Order is not found");
    }
    order.status = status;
    await order.save()
    console.log(order)
    return plainToInstance(ResponseUpdateStatus, order)
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
