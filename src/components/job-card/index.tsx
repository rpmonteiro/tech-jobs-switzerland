import * as preact from 'preact'
import { Link } from '../link'
import { Job } from '../../types'
import ta from 'time-ago'
import { JobDetails, JobTitle } from '../job-details'
import './styles.less'

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
          <div className="job-card__content">
            <JobTitle title={job.title} company={job.company} />
            <JobDetails job={job} />
          </div>
        </Link>
        <div className="job-card__time-ago">Posted {ta.ago(job.createdAt)}.</div>
      </div>
    )
  }
}
