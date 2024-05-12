import { Test, TestingModule } from '@nestjs/testing';
import { OrderSourcesService } from './order-sources.service';

describe('OrderSourcesService', () => {
  let service: OrderSourcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderSourcesService],
    }).compile();

    service = module.get<OrderSourcesService>(OrderSourcesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
