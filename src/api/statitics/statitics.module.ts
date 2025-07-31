import { Module } from '@nestjs/common';
import { StatiticsService } from './statitics.service';
import { StatiticsController } from './statitics.controller';

@Module({
  controllers: [StatiticsController],
  providers: [StatiticsService],
})
export class StatiticsModule {}
