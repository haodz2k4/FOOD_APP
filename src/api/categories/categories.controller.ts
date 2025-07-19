import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ResponseCategoryDto } from './dto/response-category.dto';
import { Message } from 'src/decorators/message.decorator';
import { QueryCategoryDto } from './dto/query-category.dto';
import { OffsetPaginatedDto } from 'src/common/dto/offset-pagination/offset-paginated.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Message("Create category success")
  create(@Body() createCategoryDto: CreateCategoryDto):Promise<ResponseCategoryDto> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @Message("Get categories")
  findAll(@Query() queryCategoryDto: QueryCategoryDto) :Promise<OffsetPaginatedDto<ResponseCategoryDto>> {
    return this.categoriesService.findAll(queryCategoryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) :Promise<ResponseCategoryDto> {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) :Promise<ResponseCategoryDto> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriesService.remove(id);
  }
}
