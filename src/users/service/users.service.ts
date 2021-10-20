import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserCreateDto } from '../dto/users.create.dto';
import { UsersRepository } from '../repository/users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UsersRepository) {}

  async createUser(userCreateDto: UserCreateDto) {
    const { name, email, age, password } = userCreateDto;
    const isExists = await this.userRepo.existsByEmail(email);
    if (isExists == null) {
      return new UnauthorizedException('The email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = await this.userRepo.create({
      name,
      email,
      age,
      password: hashedPassword,
    });

    return createdUser.readOnlyData;
  }
}
