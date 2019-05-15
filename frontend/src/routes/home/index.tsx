import * as preact from 'preact'
import { getJobs } from '../../api/job'
import { JobList } from '../../components/job-list'
import { Job, JobCategory } from '../../types'
import { JobsFilter } from '../../components/jobs-filter'
import './styles.less'

interface State {
  jobs: Job[]
  error: string
  loading: boolean
  filter: JobCategory[]
}

interface Props {
  showSnackbar: (err: string) => void
}

export class Home extends preact.Component<{}, State> {
  state = {
    jobs: [] as Job[],
    error: '',
    loading: true,
    filter: []
  }

  componentDidMount() {
    getJobs()
      .then((res) => this.setState({ jobs: res.data, loading: false }))
      .catch((err: Error) => this.setState({ error: err.message, loading: false }))
  }

  filterChangeHandler = (filter: JobCategory[]) => {
    this.setState({ filter })
  }

  render() {
    const { jobs, filter } = this.state

    return (
      <div class="home-page">
        {/* <WhyPostCta /> */}
        <div className="home-page__content">
          <JobsFilter filter={filter} changeHandler={this.filterChangeHandler} />
          <JobList filter={filter} jobs={jobs} />
        </div>
      </div>
    )
  }
}
