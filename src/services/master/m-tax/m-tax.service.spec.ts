import { Test, TestingModule } from '@nestjs/testing';
import { MTaxService } from './m-tax.service';

describe('MTaxService', () => {
  let service: MTaxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MTaxService],
    }).compile();

    service = module.get<MTaxService>(MTaxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
