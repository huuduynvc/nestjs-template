import { GlobalHandleExceptionFilter } from '@blox3/infra-exception';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { WinstonModule, WinstonModuleOptions } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configurations from './config';
import { ApplicationSettings } from './config/app.config';
import { configAppSetting, configDb, configLog } from './config/consts';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configurations,
      isGlobal: true,
      envFilePath: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
      validationOptions: {
        abortEarly: true,
      },
    }),
    WinstonModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const config = configService.get<WinstonModuleOptions>(configLog);
        if (!config) {
          throw new Error('Cannot start app without winston config');
        }
        return config;
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const config = configService.get<TypeOrmModuleOptions>(configDb);
        if (!config) {
          throw new Error('Cannot start app without ORM config');
        }
        return config;
      },
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalHandleExceptionFilter,
    },
    {
      provide: configAppSetting,
      useFactory: (configService: ConfigService): ApplicationSettings => {
        const config = configService.get<ApplicationSettings>(configAppSetting);
        if (!config) {
          throw new Error('Cannot start app without application config');
        }
        return config;
      },
      inject: [ConfigService],
    },
  ],
  exports: [configAppSetting],
})
export class AppModule {}
