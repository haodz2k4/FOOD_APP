import { Controller,Post, Body } from '@nestjs/common';
import { MomoService } from './momo.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { User } from 'src/decorators/user.decorator';
import { Public } from 'src/decorators/public.decorator';

@Controller('momo')
export class MomoController {
  constructor(private readonly momoService: MomoService) {}

  @Post()
  @Public()
  payment(@Body() createMomoDto: CreatePaymentDto, @User('userId') userId: string) {
    return this.momoService.payment(createMomoDto, userId);
  }

}
