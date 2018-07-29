import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export interface AppConfig {
  port: number;
  debugLogging: boolean;
  databaseUrl: string;
}

const config: AppConfig = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  debugLogging: process.env.NODE_ENV == 'development',
  databaseUrl: process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/apidb'
};

export { config };