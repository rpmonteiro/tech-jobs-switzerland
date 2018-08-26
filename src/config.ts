import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export interface AppConfig {
  port: number;
  debugLogging: boolean;
}

const config: AppConfig = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  debugLogging: process.env.NODE_ENV === 'development'
};

export { config };