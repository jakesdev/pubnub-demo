import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { UserModule } from '../user/user.module';
import { User, UserSchema } from '../user/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CallbackController } from './callbacks.controller';
import { AppleStrategy } from './strategy/apple.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '10000s' },
      }),
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
  ],
  controllers: [AuthController, CallbackController],
  providers: [AuthService, GoogleStrategy, JwtStrategy, AppleStrategy],
  exports: [PassportModule.register({ defaultStrategy: 'jwt' })],
})
export class AuthModule { }
