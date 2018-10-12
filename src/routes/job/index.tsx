import * as preact from 'preact'
import { getJob } from '../../api/job'
import { emptyJob, Job } from '../../types'
import { CompDetails, CompanyDetails } from '../../components/job-details'
import { Button } from '../../components/button'

interface State {
  job: Job
  error: string
  loading: boolean
}

interface Props {
  id: string
}

export class JobPage extends preact.Component<Props, State> {
  state = {
    job: emptyJob,
    error: '',
    loading: true
  }

  componentDidMount() {
    getJob(this.props.id)
      .then(res => this.setState({ job: res.data, loading: false }))
      .catch((err: Error) => this.setState({ error: err.message, loading: false }))
  }

  render() {
    const { job, loading, error } = this.state

    // if (loading) {
    //   return <div>Loading...</div>;
    // }

    if (!job.id) {
      return null
    }

    const jobHeader = (
      <div className="job-page__header">
        <img className="job-page__header__company-logo" src={job.logo} />
        <div className="job-page__header__details">
          <h3 className="job-page__header__title">{job.title}</h3>
          <CompanyDetails job={job} />
          <CompDetails job={job} />
        </div>
      </div>
    )

    const jobDescription = (
      <div className="job-page__description">
        <h3>Job description</h3>
        <div dangerouslySetInnerHTML={{ __html: job.description }} />
      </div>
    )

    const applyButton = (
      <div className="job-page__button-container">
        <Button color="red" text="Apply for this job" to={job.link} />
      </div>
    )

    return (
      <div class="job-page">
        {jobHeader}
        {jobDescription}
        {applyButton}
      </div>
    )
  }
}
