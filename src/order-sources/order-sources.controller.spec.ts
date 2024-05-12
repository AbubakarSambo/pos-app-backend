import { Test, TestingModule } from '@nestjs/testing';
import { OrderSourcesController } from './order-sources.controller';
import { OrderSourcesService } from './order-sources.service';

describe('OrderSourcesController', () => {
  let controller: OrderSourcesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderSourcesController],
      providers: [OrderSourcesService],
    }).compile();

    controller = module.get<OrderSourcesController>(OrderSourcesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
