import * as preact from 'preact';
import { getJob } from '../../api/job';
import { emptyJob, Job } from '../../types';

interface State {
  job: Job;
  error: string;
  loading: boolean;
}

interface Props {
  id: string;
}

export class JobPage extends preact.Component<Props> {
  state = {
    job: emptyJob,
    error: '',
    loading: true
  };

  componentDidMount() {
    getJob(this.props.id)
      .then(job => this.setState({ job, loading: false }))
      .catch((err: Error) => this.setState({ error: err.message, loading: false }));
  }

  render() {
    const { job, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!job.id) {
      return null;
    }

    const jobHeader = (
      <div className="job-page__header">
        <img src={job.logo} />
        <div className="job-page__header-details">
          <h3 className="job-page__title">{job.title}</h3>
          <div className="row">
            <div>{job.company}</div>
            <div>{job.type}</div>
          </div>
          <div className="row">
            <div>{job.salary}</div>
            <div>{job.equity}</div>
          </div>
        </div>
      </div>
    );
    // const jobDetails = (
    //   <div className="job-page__details">
    //   </div>
    // );

    const jobDescription = (
      <div className="job-page__description">
        <div dangerouslySetInnerHTML={{ __html: job.description }} />
      </div>
    );

    const contactSection = (
      <div className="job-page__contact">
        {job.link && <a className="job-page__link">{job.link}</a>}
        {job.email && <div className="job-page__email">{job.email}</div>}
      </div>
    );

    return (
      <div class="job-page container-fluid">
        {jobHeader}
        {jobDescription}
        {contactSection}
      </div>
    );
  }
}
