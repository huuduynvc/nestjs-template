import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { name as pkgName, description as pkgDesc, version as pkgVersion } from '../../package.json';

export const configSwagger = (app: INestApplication, apiVersion: string): void => {
  const options = new DocumentBuilder()
    .setTitle(pkgName)
    .setDescription(pkgDesc)
    .setVersion(pkgVersion)
    .setBasePath(apiVersion)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
};
