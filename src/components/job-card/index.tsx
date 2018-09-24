import * as preact from 'preact';
// import { Link } from '../link';
import officeSvg from '../../icons/office.svg';
import mapSvg from '../../icons/map.svg';
import chfSvg from '../../icons/chf.svg';
import equitySvg from '../../icons/equity.svg';
import jobTypeSvg from '../../icons/jobType.svg';
import { Link } from '../link';
import { Job } from '../../types';
import { CompanyDetails, CompDetails } from '../job-details';

interface Props {
  job: Job;
}

export class JobCard extends preact.Component<Props> {
  render() {
    const { job } = this.props;

    const title = <div className="job-card__title">{job.title}</div>;

    const jobType = (
      <div className="job-card__type">
        <img src={jobTypeSvg} />
        {job.type}
      </div>
    );

    const image = (
        <div className="job-card__image">
        <img src={job.logo} />
      </div>
    );

    const teaser = (
      <div className="job-card__details__teaser">{job.teaser}</div>
    );

    return (
      <Link to={`job/${job.id}`} className="job-card">
        {image}
        <div className="job-card__details">
          {title}
          {jobType}
          <CompanyDetails job={job} />
          {teaser}
          <CompDetails job={job} />
        </div>
      </Link>
    );
  }
}
