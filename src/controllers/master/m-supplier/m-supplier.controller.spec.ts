import { Test, TestingModule } from '@nestjs/testing';
import { MSupplierController } from './m-supplier.controller';

describe('MSupplierController', () => {
  let controller: MSupplierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MSupplierController],
    }).compile();

    controller = module.get<MSupplierController>(MSupplierController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
