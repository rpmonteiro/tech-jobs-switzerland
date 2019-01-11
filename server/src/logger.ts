import Koa from 'koa'
import winston from 'winston'
import { config } from './config'

export function logger(winstonInstance: typeof winston) {
  return async (ctx: Koa.Context, next: () => Promise<any>) => {
    const start = new Date().getMilliseconds()
    await next()
    const ms = new Date().getMilliseconds() - start

    let logLevel = ''
    if (ctx.status >= 500) {
      logLevel = 'error'
    }
    if (ctx.status >= 400) {
      logLevel = 'warn'
    }
    if (ctx.status >= 100) {
      logLevel = 'info'
    }

    const msg = `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`

    winstonInstance.configure({
      level: config.debugLogging ? 'debug' : 'info',
      transports: [
        //
        // - Write to all logs with level `debug` and below to console.
        new winston.transports.Console(),
        //
        // - Write all logs error (and below) to `error.log`.
        new winston.transports.File({ filename: 'error.log', level: 'error' })
      ]
    })

    winstonInstance.log(logLevel, msg)
  }
}
