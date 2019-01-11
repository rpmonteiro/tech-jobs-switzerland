import { AppConfig } from './types'
import uuid from 'uuid'

const isProduction = process.env.NODE_ENV === 'production'
const API_HOST = isProduction ? process.env.API_HOST || '' : 'http://localhost:5000'

export const config: AppConfig = {
  API_HOST,
  SESSION_TOKEN: uuid()
}
