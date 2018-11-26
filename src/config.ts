import dotenv from 'dotenv'
import parseDbUrl from 'parse-database-url'

dotenv.config({ path: '.env' })

interface DBConfig {
  user: string
  host: string
  port: string
  database: string
  password: string
}

const dbConfig: DBConfig = parseDbUrl(process.env['DATABASE_URL'])

console.log({ dbConfig })

export interface AppConfig {
  port: number
  dbName: string
  dbHost: string
  dbPort: number
  dbUser: string
  dbPassword: string
  debugLogging: boolean
}

export const config: AppConfig = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  dbName: dbConfig.database,
  dbHost: dbConfig.host,
  dbPort: parseInt(dbConfig.port, 10),
  dbUser: dbConfig.user,
  dbPassword: dbConfig.password,
  debugLogging: process.env.NODE_ENV === 'development'
}
