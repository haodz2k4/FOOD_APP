import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { ResponseProductDto } from './dto/response-product.dto';

@Injectable()
export class ProductsService {

  constructor(@InjectRepository(ProductEntity) private productsRepository: Repository<ProductEntity>) {}

  async create(createProductDto: CreateProductDto) :Promise<ResponseProductDto> {
    const product = this.productsRepository.create(createProductDto);
    await product.save()
    return plainToInstance(ResponseProductDto, product);
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
