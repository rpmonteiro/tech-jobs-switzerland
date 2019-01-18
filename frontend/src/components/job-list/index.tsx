import * as preact from 'preact'
import { JobCard } from '../job-card'
import { Job, JobCategory } from '../../types'
import './styles.less'

interface Props {
  jobs: Job[]
  filter: JobCategory[]
}

export class JobList extends preact.Component<Props> {
  render() {
    const { jobs, filter } = this.props
    const hasFilters = Boolean(filter[0])
    const filteredJobs = hasFilters ? jobs.filter((job) => filter.includes(job.category)) : jobs

    const rows = filteredJobs.map((job) => <JobCard job={job} />)
    return (
      <div className="job-list">
        <div className="job-list__rows__container">{rows}</div>
      </div>
    )
  }
}
