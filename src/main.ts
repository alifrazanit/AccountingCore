import { NestFactory } from '@nestjs/core';
import { ValidationPipe  } from '@nestjs/common/pipes';
import { AppModule } from './app.module';
import { TransformInterceptor } from '@interceptors/transform.interceptor';
import { Logger } from '@nestjs/common';


async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:4200'
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
