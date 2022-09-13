import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { configTcpMicroservice } from './consts';

export default registerAs(configTcpMicroservice, () => {
  return {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: parseInt(process.env.TCP_PORT, 10) || 3100,
    },
  };
});
