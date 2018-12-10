import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, `../configs/${process.env.ENVIRONMENT}.env`) })

export interface AppConfig {
  port: number
  googleProjectId: string
  firestoreKeyPath: string
  debugLogging: boolean
}

export const config: AppConfig = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  googleProjectId: process.env.GOOGLE_PROJECT_ID || '',
  firestoreKeyPath: path.resolve(__dirname, `../configs/${process.env.GOOGLE_AUTH_KEY}.json`) || '',
  debugLogging: process.env.NODE_ENV === 'development'
}
