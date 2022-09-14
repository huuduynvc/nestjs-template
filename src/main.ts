import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { BadRequestException } from '@blox3/infra-exception';
import { AppModule } from './app.module';
import { name as pkgName, description as pkgDesc, version as pkgVersion } from '../package.json';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
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
  const options = new DocumentBuilder()
    .setTitle(pkgName)
    .setDescription(pkgDesc)
    .setVersion(pkgVersion)
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'refresh-token')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
