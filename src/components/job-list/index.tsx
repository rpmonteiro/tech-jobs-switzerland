import * as preact from 'preact'
import { JobCard } from '../job-card'
import { Job } from '../../types'
import './styles.less'

interface Props {
  jobs: Job[]
}

export class JobList extends preact.Component<Props> {
  render() {
    const { jobs } = this.props

    const rows = jobs.map((job) => <JobCard job={job} />)
    return (
      <div className="job-list">
        <div className="job-list__rows__container">{rows}</div>
      </div>
    )
  }
}
