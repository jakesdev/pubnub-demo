import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import { Connection } from 'mongoose';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from '../user/user.schema';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectConnection() private readonly mongoConnection: Connection,
    private authService: AuthService,
  ) {}

  @Get('/apple_sign_in')
  @UseGuards(AuthGuard('apple'))
  async appleSignIn() {
    return HttpStatus.OK;
  }

  @Get('/google_sign_in')
  @UseGuards(AuthGuard('google'))
  async googleSignIn() {
    return HttpStatus.OK;
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const res = await this.authService.register(dto, session);
      await session.commitTransaction();

      return res;
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(error);
    } finally {
      session.endSession();
    }
  }

  @Get('me')
  @UseGuards(AuthGuard())
  async getLoggedInUser(@CurrentUser() user): Promise<User> {
    return user;
  }
}
