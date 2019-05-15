import * as preact from 'preact'
import { JobCategory, JobCategoryToLabelEnum } from '../../types'
import cn from 'classnames'
import { toggleArrayValue } from '../../utils/helpers'
import filterIcons from '../../assets/*.png'
import './styles.less'
import { utilClasses } from '../../utils/util-classes'

interface JobFilterProps {
  changeHandler: (filter: JobCategory[]) => void
  filter: JobCategory[]
}

interface FilterOption {
  label: string
  value: JobCategory
  icon: string
}

const options: FilterOption[] = Object.keys(JobCategoryToLabelEnum).map((k) => ({
  label: JobCategoryToLabelEnum[k as JobCategory],
  value: k as JobCategory,
  icon: filterIcons[k]
}))

export class JobsFilter extends preact.Component<JobFilterProps> {
  clickHandler = (e: Event) => {
    const { filter, changeHandler } = this.props
    const value = (e.currentTarget as HTMLInputElement).dataset.value as string

    if (!value) {
      return
    }

    const newFilter = toggleArrayValue(filter, value) as JobCategory[]
    changeHandler(newFilter)
  }

  render() {
    const { filter } = this.props

    const opts = options.map(({ label, value, icon }) => (
      <div
        onClick={this.clickHandler}
        data-value={value}
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
          <div class={cn(utilClasses.noPhones, 'jobs-filter__header')}>tech jobs:</div>
          <div class="jobs-filter__options-container">{opts}</div>
        </div>
      </div>
    )
  }
}
