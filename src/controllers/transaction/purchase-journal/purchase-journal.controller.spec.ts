import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseJournalController } from './purchase-journal.controller';

describe('PurchaseJournalController', () => {
  let controller: PurchaseJournalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseJournalController],
    }).compile();

    controller = module.get<PurchaseJournalController>(PurchaseJournalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
