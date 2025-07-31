import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatiticsService } from './statitics.service';
import { CreateStatiticDto } from './dto/create-statitic.dto';
import { UpdateStatiticDto } from './dto/update-statitic.dto';

@Controller('statitics')
export class StatiticsController {
  constructor(private readonly statiticsService: StatiticsService) {}

  @Get('general')
  general() {
    return this.statiticsService.general()
  }

  @Get('revenue')
  profit() {
    return this.statiticsService.profit()
  }
}
