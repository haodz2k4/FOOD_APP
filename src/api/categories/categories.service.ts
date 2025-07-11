import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { ResponseCategoryDto } from './dto/response-category.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CategoriesService {

  constructor(@InjectRepository(CategoryEntity) private categoriesRepository: Repository<CategoryEntity>) {}

  async create(createCategoryDto: CreateCategoryDto) :Promise<ResponseCategoryDto> {
    const category =  this.categoriesRepository.create(createCategoryDto);
    await category.save();
    return plainToInstance(ResponseCategoryDto, category);
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
