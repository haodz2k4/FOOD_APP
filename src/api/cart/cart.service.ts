import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { ResponseCartDto } from './dto/response-cart.dto';

@Injectable()
export class CartService {

  constructor(@InjectRepository(CartEntity) private cartsRepository: Repository<CartEntity>) {}
  async create(userId: string): Promise<void> {
    const exsist = await this.cartsRepository.findOneBy({userId});
    if(!exsist) {
      const cart = this.cartsRepository.create({userId});
      await cart.save()
    } 
  }

  findAll() {
    return `This action returns all cart`;
  }

  async findOne(userId: string): Promise<ResponseCartDto> {
  const cart = await this.cartsRepository
    .createQueryBuilder('cart')
    .leftJoinAndSelect('cart.items', 'items')
    .leftJoinAndSelect('items.product', 'product')
    .where('cart.userId = :userId', { userId })
    .getOne();


  const items = cart.items.map((item) => ({
    title: item.product.title,
    thumbnail: item.product.thumbnail,
    price: item.product.price,
    quantity: item.quantity,
    totalPrice: item.quantity * item.product.price,
  }));

  return plainToInstance(ResponseCartDto, {
    userId: cart.userId,
    items: items,
  });
}


  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
