import { NestFactory } from '@nestjs/core';
import { ValidationError, ValidationPipe, VersioningType } from '@nestjs/common';
import { BadRequestException } from '@blox3/infra-exception';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as cookieParser from 'cookie-parser';
import { MainModule } from './main.module';
import { configSwagger } from './config/swagger.config';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      REDIS_PORT: string;
      PACKAGE_NAME: string;
      PACKAGE_VERSION: string;
    }
  }
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(MainModule);

  app.use(cookieParser());
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
  });
  // app.setGlobalPrefix(MainModule.apiPrefix);

  configSwagger(app, MainModule.apiPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]): BadRequestException => {
        return BadRequestException.fromValidationErrors(errors);
      },
    }),
  );

  await app.listen(parseInt(process.env.PORT, 10) || 3000);
}

bootstrap();
