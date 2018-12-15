import Koa from 'koa'
import cors from '@koa/cors'
import helmet from 'koa-helmet'
import winston from 'winston'
import bodyParser from 'koa-bodyparser'
import { Firestore } from '@google-cloud/firestore'
import { logger } from './logger'
import { config } from './config'
import { router } from './routes'

const app = new Koa()
const firestore = new Firestore({
  projectId: config.googleProjectId,
  keyFilename: config.firestoreKeyPath
})

app.context.firestore = firestore
app.use(helmet())
app.use(cors())
app.use(logger(winston))
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(config.port)
console.log(`Server running on port ${config.port}`)
