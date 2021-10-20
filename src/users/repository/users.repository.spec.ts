import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../users.schema';
import { UsersRepository } from './users.repository';
import * as userCreateDto from '../test_data/user.create.json';
import * as readOnlyUserDto from '../test_data/user.readonly.json';

describe('UsersRepository', () => {
  let repo: UsersRepository;
  const mockUserModel = {
    exists: jest.fn((emailObj) => readOnlyUserDto),
    create: jest.fn((userCreateDto) => readOnlyUserDto),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    repo = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  describe('createUser', () => {
    it('should have function existsByEmail', () => {
      expect(typeof repo.existsByEmail).toBe('function');
    });

    it('should have function create', () => {
      expect(typeof repo.create).toBe('function');
    });

    it('should call userModel.exists({email})', async () => {
      const email = userCreateDto.email;
      await repo.existsByEmail(email);
      expect(mockUserModel.exists).toBeCalledWith({ email });
    });

    it('should call userModel.create(userCreateDto)', async () => {
      await repo.create(userCreateDto);
      expect(mockUserModel.create).toBeCalledWith(userCreateDto);
    });
  });
});
