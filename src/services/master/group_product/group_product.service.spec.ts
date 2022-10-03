import { Test, TestingModule } from '@nestjs/testing';
import { GroupProductService } from './group_product.service';

describe('GroupProductService', () => {
  let service: GroupProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupProductService],
    }).compile();

    service = module.get<GroupProductService>(GroupProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
