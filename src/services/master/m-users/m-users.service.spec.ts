import { Test, TestingModule } from '@nestjs/testing';
import { MUsersService } from './m-users.service';

describe('MUsersService', () => {
  let service: MUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MUsersService],
    }).compile();

    service = module.get<MUsersService>(MUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
