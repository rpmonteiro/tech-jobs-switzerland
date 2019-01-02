import * as preact from 'preact'
import { Link } from '../link'
import { Job } from '../../types'
import ta from 'time-ago'
import { JobDetails } from '../job-details'

interface Props {
  job: Job
}

export class JobCard extends preact.Component<Props> {
  render() {
    const { job } = this.props

    return (
      <div className="job-card__container">
        <Link to={`job/${job.id}`} className="job-card">
          <div className="job-card__image">
            <img src={job.logo} />
          </div>
          <JobDetails job={job} />
        </Link>
        <div className="job-card__time-ago">Posted {ta.ago(job.createdAt)}.</div>
      </div>
    )
  }
}
