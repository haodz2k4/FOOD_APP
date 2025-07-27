import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Public } from 'src/decorators/public.decorator';
import { User } from 'src/decorators/user.decorator';

@Public()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  
  @Get()
  findOneByUserId(@User('userId') userId: string) {
    return this.cartService.findOne(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
