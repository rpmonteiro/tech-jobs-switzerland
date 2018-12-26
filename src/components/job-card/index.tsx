import * as preact from 'preact'
import { Link } from '../link'
import { Job } from '../../types'
import ta from 'time-ago'
import { parseContractTypeDetail, parseSalary } from '../../utils/helpers'

interface Props {
  job: Job
}

export class JobCard extends preact.Component<Props> {
  render() {
    const { job } = this.props

    const image = (
      <div className="job-card__image">
        <img src={job.logo} />
      </div>
    )

    const details = [parseContractTypeDetail(job), job.location, parseSalary(job)]
      .filter(Boolean)
      .join(' \u2022 ')

    return (
      <div className="job-card__container">
        <Link to={`job/${job.id}`} className="job-card">
          {image}
          <div className="job-card__details-container">
            <div className="job-card__title">{job.title}</div>
            <div className="job-card__company">at {job.company}</div>
            <div className="job-card__details">{details}</div>
          </div>
        </Link>
        <div className="job-card__time-ago">Posted {ta.ago(job.createdAt)}.</div>
      </div>
    )
  }
}
