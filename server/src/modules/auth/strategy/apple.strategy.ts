import { Strategy } from '@arendajaelu/nestjs-passport-apple';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy, 'apple') {
  constructor() {
    super({
      clientID: process.env.APPLE_CLIENT_ID,
      teamID: process.env.APPLE_TEAM_ID,
      keyID: process.env.APPLE_PRIVATE_KEY,
      keyFilePath: process.env.APPLE_KEY_FILE_PATH,
      callbackURL: process.env.APPLE_CALLBACK,
      passReqToCallback: false,
      scope: ['email', 'name'],
    });
  }

}
