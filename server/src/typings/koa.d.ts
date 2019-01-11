import massive from 'massive'
import { Firestore } from '@google-cloud/firestore'

declare module 'koa' {
  interface BaseContext {
    firestore: Firestore
  }
}
