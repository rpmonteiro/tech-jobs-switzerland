import { BaseContext } from "koa";
const jobsDummyData = require("../../dummy-data/jobs.json");

export async function getJobs(ctx: BaseContext) {
  ctx.body = {
    data: jobsDummyData
  };
}
