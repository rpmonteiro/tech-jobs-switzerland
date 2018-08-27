import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import winston from 'winston';
import cors from '@koa/cors';
import massive from 'massive';
import { logger } from './logger';
import { config } from './config';
import { router } from './routes';

const app = new Koa();
massive({
  user: config.dbUser,
  host: config.dbHost,
  port: config.dbPort,
  database: config.dbName,
  password: config.dbPassword
}).then((db) => {
  app.context.db = db;
  app.use(helmet());
  app.use(cors());
  app.use(logger(winston));
  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.listen(config.port);

  console.log(`Server running on port ${config.port}`);
}).catch((e: Error) => {
  console.log('Uh-oh. There was an error starting the DB:\n', e)
});
