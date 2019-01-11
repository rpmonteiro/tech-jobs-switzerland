import Router from 'koa-router'
import { getJobs } from './endpoints/jobs'
import { getJob, validateJob } from './endpoints/job'

const router = new Router()

router.get('/jobs', getJobs)
router.get('/job/:id', getJob)
router.post('/job/validate', validateJob)

export { router }
