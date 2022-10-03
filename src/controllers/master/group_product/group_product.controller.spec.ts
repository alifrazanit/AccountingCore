import { Test, TestingModule } from '@nestjs/testing';
import { GroupProductController } from './group_product.controller';

describe('GroupProductController', () => {
  let controller: GroupProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupProductController],
    }).compile();

    controller = module.get<GroupProductController>(GroupProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
