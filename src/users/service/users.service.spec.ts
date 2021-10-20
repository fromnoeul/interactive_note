import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from '../repository/users.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  const mockedUsersRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersRepository],
    })
      .overrideProvider(UsersRepository)
      .useValue(mockedUsersRepository)
      .compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
