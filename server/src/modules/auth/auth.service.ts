import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectConnection } from '@nestjs/mongoose';
import { ClientSession } from 'mongodb';
import { Connection } from 'mongoose';
import { SignUpType } from 'src/common/user-type.enum';
import { User } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectConnection() private readonly mongoConnection: Connection,
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async googleLogin(req) {
    if (!req.user) {
      throw new NotFoundException('Not found Google User!!');
    }
    if (req.user) {
      const existUser = await this.userService.checkUserByEmail(req.user.email);
      if (!existUser) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
          const createUser: RegisterDto = {
            email: req.user.email,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            picture: req.user.picture,
            password: '',
          };
          const res = await this.userService.createUser(
            createUser,
            SignUpType.GOOGLE,
            session,
          );
          await session.commitTransaction();
          return this.generateJwtToken(res);
        } catch (error) {
          await session.abortTransaction();
          throw new BadRequestException(error);
        } finally {
          session.endSession();
        }
      }
      return this.generateJwtToken(existUser);
    }
  }

  async appleLogin(req) {
    const user = await this.jwtService.decode(req.id_token);
    if (!user) {
      throw new NotFoundException('Not found Apple User!!');
    }
    if (user.hasOwnProperty('email')) {
      const existUser = await this.userService.checkUserByEmail(user['email']);
      if (!existUser) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
          const createUser: RegisterDto = {
            email: user['email'],
            firstName: '',
            lastName: '',
            picture: '',
            password: '',
          };
          const res = await this.userService.createUser(
            createUser,
            SignUpType.APPLE,
            session,
          );

          await session.commitTransaction();
          return this.generateJwtToken(res);
        } catch (error) {
          await session.abortTransaction();
          throw new BadRequestException(error);
        } finally {
          session.endSession();
        }
      }
      return this.generateJwtToken(existUser);
    }
  }

  async register(dto: RegisterDto, session: ClientSession) {
    return await this.userService.createUser(dto, SignUpType.REGISTER, session);
  }

  async login(dto: LoginDto) {
    try {
      const user = await this.userService.checkUserWithPassword(dto);
      if (user) {
        this.generateJwtToken(user);
        return this.generateJwtToken(user);
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async generateJwtToken(user: User) {
    const userData = user.toObject();
    delete userData.password;

    return {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
      accessToken: this.jwtService.sign({ id: user.id, email: user.email }),
      userData,
    };
  }

  verifyJwt(jwt: string): Promise<any> {
    return this.jwtService.verifyAsync(jwt);
  }
}
