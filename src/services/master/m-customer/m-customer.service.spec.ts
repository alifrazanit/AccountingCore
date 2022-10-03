import { Test, TestingModule } from '@nestjs/testing';
import { MCustomerService } from './m-customer.service';

describe('MCustomerService', () => {
  let service: MCustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MCustomerService],
    }).compile();

    service = module.get<MCustomerService>(MCustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
