import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { ResponseCategoryDto } from './dto/response-category.dto';
import { plainToInstance } from 'class-transformer';
import { QueryCategoryDto } from './dto/query-category.dto';
import { OffsetPaginationDto } from 'src/common/dto/offset-pagination/offset-pagination.dto';
import { OffsetPaginatedDto } from 'src/common/dto/offset-pagination/offset-paginated.dto';

@Injectable()
export class CategoriesService {

  constructor(@InjectRepository(CategoryEntity) private categoriesRepository: Repository<CategoryEntity>) {}

  async create(createCategoryDto: CreateCategoryDto) :Promise<ResponseCategoryDto> {
    const category =  this.categoriesRepository.create(createCategoryDto);
    await category.save();
    return plainToInstance(ResponseCategoryDto, category);
  }

  async findAll(queryCategoryDto: QueryCategoryDto) :Promise<OffsetPaginatedDto<ResponseCategoryDto>> {
    const {keyword, status, limit, sortBy, sortOrder} = queryCategoryDto;
    const queryBuilder = this.categoriesRepository
    .createQueryBuilder('categories')
    .limit(limit)
    .offset(queryCategoryDto.offset())
    .orderBy(`categories.${sortBy}`, sortOrder)
    if(keyword) {
      queryBuilder.andWhere("categories.title LIKE :keyword",{keyword: `%${keyword}%`})
    }
    if(status) {
      queryBuilder.andWhere("categories.status LIKE :status",{status});
    }
    const [categories, count] = await queryBuilder.getManyAndCount();
    const offsetPagination = new OffsetPaginationDto(count,queryCategoryDto);

    return new OffsetPaginatedDto(plainToInstance(ResponseCategoryDto, categories), offsetPagination)
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.findOneBy({id});
    if(!category) {
      throw new NotFoundException("Category is not found")
    }
    Object.assign(category, updateCategoryDto)
    await category.save()
    return plainToInstance(ResponseCategoryDto, category);
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
