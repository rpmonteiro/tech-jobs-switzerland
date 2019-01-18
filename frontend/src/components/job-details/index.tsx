import * as preact from 'preact'
import markerSvg from '../../assets/marker.svg'
import chfSvg from '../../assets/chf.svg'
import percentageSvg from '../../assets/percentage.svg'
import clockSvg from '../../assets/clock.svg'
import { Job } from '../../types'
import { parseSalary, parseEquity, toTitleCase } from '../../utils/helpers'
import './styles.less'

interface JobTitleProps {
  title: string
  company: string
}

export const JobTitle: preact.FunctionalComponent<JobTitleProps> = ({ title, company }) => (
  <div className="job-title">
    <h3 className="job-title__job">{title}</h3>
    <div className="job-title__company">at {company}</div>
  </div>
)

interface JobDetailsProps {
  job: Job
}

export const JobDetails: preact.FunctionalComponent<JobDetailsProps> = ({ job }) => (
  <div className="job-details">
    {job.contractType && (
      <div title="Job contract" className="job-details__contract">
        <img src={clockSvg} />
        {toTitleCase(job.contractType)}
        {job.contractDuration && (
          <div className="job-details__duration">
            &nbsp;-&nbsp;{job.contractDuration}&nbsp;months
          </div>
        )}
      </div>
    )}
    {job.location && (
      <div title="Job location" className="job-details__location">
        <img src={markerSvg} />
        {job.location}
      </div>
    )}
    {job.salary && (
      <div title="Job salary" className="job-details__salary">
        <img src={chfSvg} />
        {parseSalary(job)}
      </div>
    )}
    {job.equity && (
      <div title="Equity given" className="job-details__equity">
        <img src={percentageSvg} />
        {parseEquity(job.equity)}
      </div>
    )}
  </div>
)
