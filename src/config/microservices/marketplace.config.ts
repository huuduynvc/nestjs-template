import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { marketplaceMicroService } from './consts';

export default registerAs(marketplaceMicroService, () => {
  return {
    transport: Transport.TCP,
    options: {
      host: process.env.MARKETPLACE_MICROSERVICE_HOST,
      port: process.env.MARKETPLACE_MICROSERVICE_PORT,
      retryAttempts: process.env.MICROSERVICE_RETRY_ATTEMPTS || 3,
      retryDelay: process.env.MICROSERVICE_RETRY_DELAY_IN_MS || 10000,
    },
  };
});
