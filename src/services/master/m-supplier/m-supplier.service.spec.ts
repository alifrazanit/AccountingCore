import { Test, TestingModule } from '@nestjs/testing';
import { MSupplierService } from './m-supplier.service';

describe('MSupplierService', () => {
  let service: MSupplierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MSupplierService],
    }).compile();

    service = module.get<MSupplierService>(MSupplierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
