import { BaseContext } from 'koa'

export async function getJob(ctx: BaseContext) {
  const collection = ctx.firestore.collection('jobs')
  const id: string = ctx.query.id
  const job = await collection.doc(id)

  if (!job) {
    ctx.throw('Job not found', 404)
    return
  }

  ctx.body = {
    data: job
  }
}

export async function validateJob(ctx: BaseContext) {
  // const job: Partial<Job> = ctx.body
  // const job = ctx.body
}
