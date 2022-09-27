import * as redisStore from 'cache-manager-ioredis';
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});
let config: any = {
  store: redisStore,
  ttl: 24 * 3600,
};

const cacheConfig = (): any => {
  if (process.env.REDIS_CLUSTER === 'true') {
    config = {
      ...config,
      clusterConfig: {
        nodes: [
          {
            port: process.env.REDIS_PORT,
            host: process.env.REDIS_HOST,
          },
        ],
        options: {
          maxRedirections: 16,
          slotsRefreshTimeout: 2000,
          password: process.env.REDIS_PASSWORD,
        },
      },
    };
  } else {
    config = {
      ...config,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
      ttl: 120, // seconds
    };
  }

  return config;
};
export default cacheConfig;
