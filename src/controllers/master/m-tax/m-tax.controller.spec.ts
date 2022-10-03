import { Test, TestingModule } from '@nestjs/testing';
import { MTaxController } from './m-tax.controller';

describe('MTaxController', () => {
  let controller: MTaxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MTaxController],
    }).compile();

    controller = module.get<MTaxController>(MTaxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
