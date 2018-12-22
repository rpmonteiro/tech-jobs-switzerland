import * as preact from 'preact'
import { getJobs } from '../../api/job'
import { JobList } from '../../components/job-list'
import { Job } from '../../types'

interface State {
  jobs: Job[]
  error: string
  loading: boolean
}

interface Props {
  showSnackbar: (err: string) => void
}

export class Home extends preact.Component<{}, State> {
  state = {
    jobs: [] as Job[],
    error: '',
    loading: true
  }

  componentDidMount() {
    getJobs()
      .then((res) => this.setState({ jobs: res.data, loading: false }))
      .catch((err: Error) => this.setState({ error: err.message, loading: false }))
  }
  render() {
    const { jobs } = this.state

    return (
      <div class="home-page">
        <JobList jobs={jobs} />
      </div>
    )
  }
}
