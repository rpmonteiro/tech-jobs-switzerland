import * as preact from 'preact'
import officeSvg from '../../icons/office.svg'
import mapSvg from '../../icons/map.svg'
import chfSvg from '../../icons/chf.svg'
import equitySvg from '../../icons/equity.svg'
import contractSvg from '../../icons/contract.svg'
import { Link } from '../link'
import { Job } from '../../types'
import { parseSalary, parseEquity } from '../../utils/helpers'

interface Props {
  job: Job
}

export const CompDetails: preact.FunctionalComponent<Props> = ({ job }) => (
  <div className="row job-details">
    <div className="job-details__salary">
      <img src={chfSvg} />
      {parseSalary(job)}
    </div>
    {job.equity && (
      <div className="job-details__equity">
        <img src={equitySvg} />
        {parseEquity(job.equity)}
      </div>
    )}
  </div>
)

export const CompanyDetails: preact.FunctionalComponent<Props> = ({ job }) => (
  <div className="row job-details">
    <div className="job-details__company">
      <img src={officeSvg} />
      {job.company}
    </div>
    <div className="job-details__location">
      <img src={mapSvg} />
      {job.location}
    </div>
  </div>
)
