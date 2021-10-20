import { PickType } from '@nestjs/swagger';
import { User } from '../users.schema';

export class UserCreateDto extends PickType(User, [
  'name',
  'email',
  'age',
  'password',
] as const) {}
