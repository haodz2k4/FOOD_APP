import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductOptionService } from './product-option.service';
import { ProductOptionEntity } from './entities/product-options.entity';
import { OptionValueEntity } from './entities/option_value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    ProductEntity, 
    ProductOptionEntity, 
    OptionValueEntity
  ])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductOptionService],
})
export class ProductsModule {}
