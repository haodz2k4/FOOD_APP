import { Injectable } from '@nestjs/common';
import { CreateStatiticDto } from './dto/create-statitic.dto';
import { UpdateStatiticDto } from './dto/update-statitic.dto';

@Injectable()
export class StatiticsService {
  create(createStatiticDto: CreateStatiticDto) {
    return 'This action adds a new statitic';
  }

  findAll() {
    return `This action returns all statitics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} statitic`;
  }

  update(id: number, updateStatiticDto: UpdateStatiticDto) {
    return `This action updates a #${id} statitic`;
  }

  remove(id: number) {
    return `This action removes a #${id} statitic`;
  }
}
