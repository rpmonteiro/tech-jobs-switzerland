import * as preact from 'preact'
import { JobFilter, JobFilterToLabelEnum } from '../../types'
import cn from 'classnames'
import { toggleArrayValue } from '../../utils/helpers'
import filterIcons from '../../assets/*.png'
import './styles.less'

interface JobFilterProps {
  changeHandler: (filter: JobFilter[]) => void
  filter: JobFilter[]
}

interface FilterOption {
  label: string
  value: JobFilter
  icon: string
}

const options: FilterOption[] = Object.keys(JobFilterToLabelEnum).map((k) => ({
  label: JobFilterToLabelEnum[k as JobFilter],
  value: k as JobFilter,
  icon: filterIcons[k]
}))

export class JobsFilter extends preact.Component<JobFilterProps> {
  clickHandler = (e: Event) => {
    const { filter, changeHandler } = this.props
    const newFilter = toggleArrayValue(filter, (e.target as HTMLInputElement).value) as JobFilter[]
    changeHandler(newFilter)
  }

  render() {
    const { filter } = this.props
    const opts = options.map(({ label, value, icon }) => (
      <div
        onClick={this.clickHandler}
        value={value}
        className={cn('jobs-filter__option', {
          'jobs-filter__option-selected': filter.includes(value)
        })}
      >
        <span>
          <img className="jobs-filter__icon" src={icon} />
          {label}
        </span>
      </div>
    ))

    return (
      <div class="jobs-filter">
        <div class="jobs-filter__sticky-container">
          <div class="jobs-filter__header">tech jobs:</div>
          <div class="jobs-filter__options-container">{opts}</div>
        </div>
      </div>
    )
  }
}
