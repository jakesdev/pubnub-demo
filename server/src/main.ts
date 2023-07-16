import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('NestJS PubNub Swagger')
    .setDescription('NestJS PubNub description')
    .setVersion('1.0')
    .addTag('NestJS PubNub')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.enableCors();
  //install helmet
  app.use(helmet());
  // config dto validator
  app.useGlobalPipes(new ValidationPipe());
  //🛠 Import postman at http://localhost:${port}/documentation-json
  SwaggerModule.setup('documentation', app, document);
  await app.listen(port);
  Logger.log(`🚀 Work Service is running on: http://localhost:${port}}`);
}
bootstrap();
