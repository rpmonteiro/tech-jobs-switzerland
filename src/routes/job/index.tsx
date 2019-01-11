import * as preact from 'preact'
import { getJob } from '../../api/job'
import { FullJob, emptyFullJob } from '../../types'
import { JobDetails, JobTitle } from '../../components/job-details'
import { Button } from '../../components/button'
import { Divider } from '../../components/divider/divider'
import './styles.less'

interface State {
  job: FullJob
  error: string
  loading: boolean
}

interface Props {
  id: string
}

export class JobPage extends preact.Component<Props, State> {
  state = {
    job: emptyFullJob,
    error: '',
    loading: true
  }

  componentDidMount() {
    getJob(this.props.id)
      .then((res) => this.setState({ job: res.data, loading: false }))
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
        <Divider />
        <div className="job-page__header__content">
          <img className="job-page__header__content__company-logo" src={job.logo} />
          <div className="job-page__header__content__details">
            <JobTitle title={job.title} company={job.company} />
            <JobDetails job={job} />
          </div>
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
        <Button text="Apply to this job now" to={job.link} />
      </div>
    )

    return (
      <div class="job-page">
        {jobHeader}
        <div className="job-page__container">
          {jobDescription}
          {applyButton}
        </div>
      </div>
    )
  }
}
