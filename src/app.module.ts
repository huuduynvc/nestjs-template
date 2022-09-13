import { GlobalHandleExceptionFilter } from '@blox3/infra-exception';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { WinstonModule, WinstonModuleOptions } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configurations from './config';
import { ApplicationSettings } from './config/app.config';
import { configAppSetting, configLog } from './config/consts';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configurations,
      isGlobal: true,
      envFilePath: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
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
