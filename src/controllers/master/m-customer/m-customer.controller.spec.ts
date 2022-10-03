import { Test, TestingModule } from '@nestjs/testing';
import { MCustomerController } from './m-customer.controller';

describe('MCustomerController', () => {
  let controller: MCustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MCustomerController],
    }).compile();

    controller = module.get<MCustomerController>(MCustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
