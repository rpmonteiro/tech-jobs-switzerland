import Router from 'koa-router';
import { getJobs } from './endpoints/jobs';
import { getJob } from './endpoints/job';

const router = new Router();

router.get('/jobs', getJobs);
router.get('/job/:id', getJob);

export { router };