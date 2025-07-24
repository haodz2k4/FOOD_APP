import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MomoService } from './momo.service';
import { CreateMomoDto } from './dto/create-momo.dto';
import { UpdateMomoDto } from './dto/update-momo.dto';

@Controller('momo')
export class MomoController {
  constructor(private readonly momoService: MomoService) {}

  @Post()
  create(@Body() createMomoDto: CreateMomoDto) {
    return this.momoService.create(createMomoDto);
  }

  @Get()
  findAll() {
    return this.momoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.momoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMomoDto: UpdateMomoDto) {
    return this.momoService.update(+id, updateMomoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.momoService.remove(+id);
  }
}
