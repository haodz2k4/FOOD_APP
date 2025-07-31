import { Test, TestingModule } from '@nestjs/testing';
import { StatiticsController } from './statitics.controller';
import { StatiticsService } from './statitics.service';

describe('StatiticsController', () => {
  let controller: StatiticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatiticsController],
      providers: [StatiticsService],
    }).compile();

    controller = module.get<StatiticsController>(StatiticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
