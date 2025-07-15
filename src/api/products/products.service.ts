import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { ResponseProductDto } from './dto/response-product.dto';
import { QueryproductDto } from './dto/query-product.dto';
import { OffsetPaginationDto } from 'src/common/dto/offset-pagination/offset-pagination.dto';
import { OffsetPaginatedDto } from 'src/common/dto/offset-pagination/offset-paginated.dto';

@Injectable()
export class ProductsService {

  constructor(@InjectRepository(ProductEntity) private productsRepository: Repository<ProductEntity>) {}

  async create(createProductDto: CreateProductDto) :Promise<ResponseProductDto> {
    const product = this.productsRepository.create(createProductDto);
    await product.save()
    return plainToInstance(ResponseProductDto, product);
  }

  async findAll(queryProductDto: QueryproductDto) :Promise<OffsetPaginatedDto<ResponseProductDto>> {
    const {
      keyword, 
      status, 
      minPrice, 
      maxPrice, 
      minDiscountPercentage, 
      maxDiscountPercentage, 
      limit,
      sortBy,
      sortOrder
    } = queryProductDto;
    console.log(queryProductDto)
    const queryBuilder = this.productsRepository
    .createQueryBuilder("products")
    .limit(limit)
    .offset(queryProductDto.offset())
    .andWhere("products.price >= :minPrice OR products.price <= :maxPrice",{minPrice,maxPrice})
    .andWhere(
      "products.discountPercentage >= :minDiscountPercentage OR products.discountPercentage <= :maxDiscountPercentage",{
        minDiscountPercentage,
        maxDiscountPercentage
    })
    .orderBy(`products.${sortBy}`,sortOrder)

    if(keyword) {
      queryBuilder.andWhere("title LIKE :keyword",{keyword: `%${keyword}%`})
    }
    if(status) {
      queryBuilder.andWhere("status = :status",{status})
    }
    const [products, count] = await queryBuilder.getManyAndCount()
    const pagination = new OffsetPaginationDto(count, queryProductDto);
    return new OffsetPaginatedDto(plainToInstance(ResponseProductDto, products), pagination);
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
