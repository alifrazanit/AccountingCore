import { Test, TestingModule } from '@nestjs/testing';
import { MDepartmentService } from './m-department.service';

describe('MDepartmentService', () => {
  let service: MDepartmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MDepartmentService],
    }).compile();

    service = module.get<MDepartmentService>(MDepartmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
