import { Injectable } from '@nestjs/common';
import { ClientSession } from 'mongoose';
import { SignUpType } from 'src/common/user-type.enum';
import { LoginDto } from '../auth/dto/login.dto';
import { RegisterDto } from '../auth/dto/register.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async createUser(
    dto: RegisterDto,
    signUpType: SignUpType,
    session: ClientSession,
  ) {
    return await this.userRepository.createUser(dto, signUpType, session);
  }

  async checkUserWithPassword(dto: LoginDto) {
    return await this.userRepository.checkUserWithPassword(dto);
  }

  async checkUserByEmail(email: string) {
    return await this.userRepository.checkUserByEmail(email);
  }

  async findOneById(id: string) {
    return await this.userRepository.findOneById(id);
  }
}
