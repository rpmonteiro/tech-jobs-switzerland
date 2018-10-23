import { BaseContext } from 'koa'
const jobDummyData = require('../../dummy-data/job.json')

export async function getJob(ctx: BaseContext) {
  // const id = ctx.query.id;
  // const job = ctx.db.find({ id });

  // if (!job) {
  //   ctx.throw("Job not found", 404);
  //   return;
  // }

  ctx.body = {
    data: jobDummyData
  }
}

export async function validateJob(ctx: BaseContext) {
  // const job: Partial<Job> = ctx.body
  // const job = ctx.body
}
