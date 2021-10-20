import { PickType } from '@nestjs/swagger';
import { User } from '../users.schema';

export class SignInDto extends PickType(User, ['email', 'password'] as const) {}
