import { Test, TestingModule } from '@nestjs/testing';
import { MUomController } from './m-uom.controller';

describe('MUomController', () => {
  let controller: MUomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MUomController],
    }).compile();

    controller = module.get<MUomController>(MUomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
