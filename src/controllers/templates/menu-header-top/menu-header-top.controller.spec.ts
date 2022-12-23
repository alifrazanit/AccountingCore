import { Test, TestingModule } from '@nestjs/testing';
import { MenuHeaderTopController } from './menu-header-top.controller';

describe('MenuHeaderTopController', () => {
  let controller: MenuHeaderTopController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuHeaderTopController],
    }).compile();

    controller = module.get<MenuHeaderTopController>(MenuHeaderTopController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
