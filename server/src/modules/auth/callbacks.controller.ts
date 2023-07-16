import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('callbacks')
export class CallbackController {
  constructor(private authService: AuthService) {}

  @Post('/auth/apple/apple_sign_in')
  async redirect(@Body() req): Promise<any> {
    return this.authService.appleLogin(req);
  }

  @Get('/auth/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }
}
