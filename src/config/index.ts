import { registerAs } from '@nestjs/config';
import database from './db.config';
import jwt from './jwt.config';
import appSetting from './app-settings.config';
import cacheConfig from './cache.config';
import logingConfig from './log.config';

export default registerAs('config', () => {
  return {
    appSetting,
    database,
    jwt,
    cacheConfig: cacheConfig(),
    logingConfig,
  };
});
