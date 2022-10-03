import { Test, TestingModule } from '@nestjs/testing';
import { SubdepartmentController } from './subdepartment.controller';

describe('SubdepartmentController', () => {
  let controller: SubdepartmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubdepartmentController],
    }).compile();

    controller = module.get<SubdepartmentController>(SubdepartmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
