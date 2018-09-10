import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export interface AppConfig {
  port: number;
  dbName: string;
  dbHost: string;
  dbPort: number;
  dbUser: string;
  dbPassword: string;
  debugLogging: boolean;
}

const config: AppConfig = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  dbName: process.env.DB_NAME || "jobs",
  dbHost: process.env.DB_HOST || "localhost",
  dbPort: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  dbUser: process.env.DB_USER || "postgres",
  dbPassword: process.env.DB_PASSWORD || "123123",
  debugLogging: process.env.NODE_ENV === "development"
};

export { config };
