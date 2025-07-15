import { Injectable, NotFoundException } from '@nestjs/common';
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
      sortOrder,
      categoryId
    } = queryProductDto;
    const queryBuilder = this.productsRepository
    .createQueryBuilder("products")
    .limit(limit)
    .offset(queryProductDto.offset())
    .andWhere("products.price >= :minPrice AND products.price <= :maxPrice",{minPrice,maxPrice})
    .andWhere(
      "products.discountPercentage >= :minDiscountPercentage AND products.discountPercentage <= :maxDiscountPercentage",{
        minDiscountPercentage,
        maxDiscountPercentage
    })
    .orderBy(`products.${sortBy}`,sortOrder)
    .leftJoin("products.category","category")
    .addSelect(["category.id","category.title"])
    if(keyword) {
      queryBuilder.andWhere("title LIKE :keyword",{keyword: `%${keyword}%`})
    }
    if(status) {
      queryBuilder.andWhere("status = :status",{status})
    }
    if(categoryId) {
      queryBuilder.andWhere("categoryId = :categoryId",{categoryId})
    }
    const [products, count] = await queryBuilder.getManyAndCount()
    const pagination = new OffsetPaginationDto(count, queryProductDto);
    return new OffsetPaginatedDto(plainToInstance(ResponseProductDto, products), pagination);
  }

  async findOne(id: string): Promise<ResponseProductDto> {
    console.log(id)
    const product = await this.productsRepository.createQueryBuilder("product")
    .where("product.id = :id",{id})
    .leftJoin("product.category","category")
    .addSelect(["category.id","category.title"])
    .getOne()
    if(!product) {
      throw new NotFoundException("Product is not found")
    }
    return plainToInstance(ResponseProductDto, product)
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
