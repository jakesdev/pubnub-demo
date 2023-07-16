import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { ClientSession, Model } from 'mongoose';
import { SignUpType } from 'src/common/user-type.enum';
import { LoginDto } from '../auth/dto/login.dto';
import { RegisterDto } from '../auth/dto/register.dto';
import { User } from './user.schema';

export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) { }

  async createUser(
    dto: RegisterDto,
    signUpType: SignUpType,
    session: ClientSession,
  ) {
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(dto.password, saltOrRounds);

    let user = new this.userModel({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      picture: dto.picture,
      password: dto.password ? hashPassword : null,
      signUpType: signUpType,
    });
    try {
      user = await user.save({ session });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return user;
  }

  async checkUserWithPassword(dto: LoginDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) {
      throw new NotFoundException('User not found!!');
    } else {
      const isMatchPassword = await bcrypt.compare(dto.password, user.password);
      if (isMatchPassword) {
        return user;
      } else {
        throw new BadRequestException('Wrong password!!');
      }
    }
  }

  async checkUserByEmail(email: string) {
    let user;
    try {
      user = await this.userModel.findOne({ email }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return user;
  }

  async findOneById(id: string) {
    let user;
    try {
      user = await this.userModel.findOne({ id }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return user;
  }
}
