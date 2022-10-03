import { Test, TestingModule } from '@nestjs/testing';
import { MUomService } from './m-uom.service';

describe('MUomService', () => {
  let service: MUomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MUomService],
    }).compile();

    service = module.get<MUomService>(MUomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
