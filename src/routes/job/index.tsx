import * as preact from 'preact';
import { getJob } from '../../api/job';
import { emptyJob, Job } from '../../types';
import { CompDetails, CompanyDetails } from '../../components/job-details';

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
        <img className="job-page__header__company-logo" src={job.logo} />
        <div className="job-page__header__details">
          <h3 className="job-page__header__title">{job.title}</h3>
          <CompanyDetails job={job} />
          <CompDetails job={job} />
        </div>
      </div>
    );
    // const jobDetails = (
    //   <div className="job-page__details">
    //   </div>
    // );

    const jobDescription = (
      <div className="job-page__description">
        <h3>Job description</h3>
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
      <div class="job-page">
        {jobHeader}
        {jobDescription}
        {contactSection}
      </div>
    );
  }
}
