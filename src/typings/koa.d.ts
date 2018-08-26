import massive from 'massive';

declare module 'koa' {
  interface BaseContext {
    db: massive.Database
  }
}