import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('NestJS Authentication Swagger')
    .setDescription('NestJS Authentication description')
    .setVersion('1.0')
    .addTag('NestJS Authentication')
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
