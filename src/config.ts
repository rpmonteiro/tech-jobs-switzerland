import { AppConfig } from './types';

const isProduction = process.env.NODE_ENV === 'production';
const API_HOST = isProduction
  ? process.env.API_HOST
  : 'http://localhost:3000';

export const config: AppConfig = {
  API_HOST
};
