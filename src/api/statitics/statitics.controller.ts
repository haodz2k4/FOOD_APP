import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatiticsService } from './statitics.service';
import { CreateStatiticDto } from './dto/create-statitic.dto';
import { UpdateStatiticDto } from './dto/update-statitic.dto';

@Controller('statitics')
export class StatiticsController {
  constructor(private readonly statiticsService: StatiticsService) {}

  @Post()
  create(@Body() createStatiticDto: CreateStatiticDto) {
    return this.statiticsService.create(createStatiticDto);
  }

  @Get()
  findAll() {
    return this.statiticsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statiticsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatiticDto: UpdateStatiticDto) {
    return this.statiticsService.update(+id, updateStatiticDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statiticsService.remove(+id);
  }
}
