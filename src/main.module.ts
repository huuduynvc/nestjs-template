import { GlobalHandleExceptionFilter } from '@blox3/infra-exception';
import { Module, OnModuleDestroy, Inject, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { GLOBAL_CACHE_MANAGER, GlobalCacheModule, LoggerMiddleware } from '@blox3/infra-common';
import * as helmet from 'helmet';
import { Cache } from 'cache-manager';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { config as cfig } from 'dotenv';
import config from './config';
import { UserModule } from './modules/user/user.module';
import { enviroments } from './config/enviroments';
import { PostModule } from './modules/post/post.module';

cfig();
const modules = [UserModule, PostModule];
const { NODE_ENV = 'dev' } = process.env;
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      envFilePath: enviroments[NODE_ENV] || '.env',
      validationOptions: {
        abortEarly: true,
      },
    }),
    WinstonModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { logingConfig } = configService;
        if (!logingConfig) {
          throw new Error('Cannot start app without winston config');
        }
        return logingConfig;
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { database } = configService;
        if (!database) {
          throw new Error('Cannot start app without ORM config');
        }
        return database;
      },
    }),
    GlobalCacheModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { cacheConfig } = configService;
        if (!cacheConfig) {
          throw new Error('Cannot start without Cache config');
        }
        return cacheConfig;
      },
    }),
    EventEmitterModule.forRoot(),
    ...modules,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalHandleExceptionFilter,
    },
  ],
})
export class MainModule implements OnModuleDestroy, NestModule {
  static apiPrefix: string;

  constructor(
    @Inject(GLOBAL_CACHE_MANAGER)
    private readonly cacheManager?: Cache,
  ) {
    MainModule.apiPrefix = '/v1';
  }

  configure(consumer: MiddlewareConsumer): void {
    // @ts-ignore
    consumer.apply(helmet()).forRoutes('*');
    consumer.apply(LoggerMiddleware).exclude('healthz').forRoutes('*');
  }

  onModuleDestroy(): void {
    if (this.cacheManager) {
      // @ts-ignore
      const cacheClient = this.cacheManager.store.getClient();
      if (cacheClient) {
        cacheClient.disconnect();
      }
    }
  }
}
