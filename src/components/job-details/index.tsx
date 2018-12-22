import * as preact from 'preact'
import officeSvg from '../../assets/office.svg'
import mapSvg from '../../assets/map.svg'
import chfSvg from '../../assets/chf.svg'
import equitySvg from '../../assets/equity.svg'
import contractSvg from '../../assets/contract.svg'
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
