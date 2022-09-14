import DatabaseConfig from './db.config';
import LogConfig from './log.config';
import TcpMicroserviceConfig from './tcp-microservice.config';
import AppSettings from './app.config';
import MarketplaceMicroService from './microservices/marketplace.config';

export default [
  DatabaseConfig,
  LogConfig,
  TcpMicroserviceConfig,
  AppSettings,
  MarketplaceMicroService,
];
