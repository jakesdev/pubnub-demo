import { Controller } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(
    @InjectConnection() private readonly mongoConnection: Connection,
    private userService: UserService,
  ) {}
}
