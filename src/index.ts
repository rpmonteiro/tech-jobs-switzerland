import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import winston from 'winston';
import cors from '@koa/cors';
import { logger } from './logger';
import { config } from './config';
import { router } from './routes';

const app = new Koa();

app.use(helmet());
app.use(cors());
app.use(logger(winston));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(config.port);

console.log(`Server running on port ${config.port}`);