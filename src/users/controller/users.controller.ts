import { Body, Controller, Delete, Post } from '@nestjs/common';
import { UserCreateDto } from '../dto/users.create.dto';
import { SignInDto } from '../dto/users.signin.dto';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createAccount(@Body() userCreateDto: UserCreateDto) {
    return await this.usersService.createUser(userCreateDto);
  }

  @Post('signin')
  signIn(signInDto: SignInDto) {}

  @Post('signout')
  signOut() {}

  @Delete()
  deleteAccount() {}
}
