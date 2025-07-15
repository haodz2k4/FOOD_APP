import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryproductDto } from './dto/query-product.dto';
import { OffsetPaginatedDto } from 'src/common/dto/offset-pagination/offset-paginated.dto';
import { ResponseProductDto } from './dto/response-product.dto';
import { Message } from 'src/decorators/message.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() queryProductDto: QueryproductDto) :Promise<OffsetPaginatedDto<ResponseProductDto>> {
    return this.productsService.findAll(queryProductDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) :Promise<ResponseProductDto> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @Message("Update product success")
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) :Promise<void> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) :Promise<void> {
    return this.productsService.remove(id);
  }
}
