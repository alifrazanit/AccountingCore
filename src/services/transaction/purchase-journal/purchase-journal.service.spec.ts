import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseJournalService } from './purchase-journal.service';

describe('PurchaseJournalService', () => {
  let service: PurchaseJournalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseJournalService],
    }).compile();

    service = module.get<PurchaseJournalService>(PurchaseJournalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
