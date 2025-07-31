import { Test, TestingModule } from '@nestjs/testing';
import { StatiticsService } from './statitics.service';

describe('StatiticsService', () => {
  let service: StatiticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatiticsService],
    }).compile();

    service = module.get<StatiticsService>(StatiticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
