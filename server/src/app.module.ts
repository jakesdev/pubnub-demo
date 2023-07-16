import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { LoggingInterceptor } from './interceptors/logging-interceptor.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    ConfigModule,
    AuthModule,
    UserModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.getMongoConfig(),
    }),
  ],
  controllers: [],
  providers: [{ provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }],
})
export class AppModule {}
