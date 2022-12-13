import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AppModule } from './app.module';
import { TransformInterceptor } from '@interceptors/transform.interceptor';
import { Logger } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { BadRequestException } from '@nestjs/common';


async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:4200'
  });
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    disableErrorMessages: true,
    exceptionFactory: (validationErrors: ValidationError[]) => {
      const modifiedError = [];
      validationErrors.forEach(error => {
        for (const message of Object.values(error.constraints)) {
          let errorObj;
          try {
            var parsed = JSON.parse(message);
            if (!parsed && typeof parsed !== 'object') {
              throw new Error('still not an object');
            }
            errorObj = parsed;
          } catch (err) {
            errorObj = {
              message,
              parameters: error.property,
            };
          }
          modifiedError.push(errorObj);
        }
      })
      throw new BadRequestException({
        data: '',
        error: true,
        message: modifiedError,
        status: 400
      });
    },
  }));
  await app.listen(3000);
}
bootstrap();
