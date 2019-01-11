import * as preact from 'preact'
import { ContractType, Coords, FullJob, emptyFullJob } from '../../types'
import { Rte } from '../../components/rte'
import { Quill } from 'quill'
import { LocationAutocomplete } from '../../components/location-autocomplete'
import { Button } from '../../components/button'
import { validateJob } from '../../api/job'
import { parseEventToFloat } from '../../utils/helpers'
import './styles.less'

type RangeType = 'simple' | 'range' | ''

interface State {
  salaryType: RangeType
  equityType: RangeType
  jobData: FullJob
  isValidating: boolean
  teaserCharsLeft: number
}

const TEASER_MAX_CHARS = 80

// tslint:disable-next-line:max-line-length
export class JobForm extends preact.Component<{}, State> {
  state = {
    salaryType: '' as RangeType,
    equityType: '' as RangeType,
    teaserCharsLeft: TEASER_MAX_CHARS,
    isValidating: false,
    jobData: {
      ...emptyFullJob
    }
  }

  descriptionRteSection: Quill
  teaserRef: HTMLTextAreaElement | undefined

  updateTeaserCharsLeft = (): void => {
    if (!this.teaserRef) {
      return
    }

    this.setState({
      teaserCharsLeft: TEASER_MAX_CHARS - this.teaserRef.value.length
    })
  }

  handleInputChange = (stateKey: keyof FullJob) => {
    return (event: Event): void => {
      const value = (event.target as HTMLInputElement).value || ''

      this.setState(() => ({ [stateKey]: value }))
    }
  }

  setTeaserRef = (el: HTMLTextAreaElement): void => {
    this.teaserRef = el
  }

  handleLocationSelect = (location: string) => {
    this.setState({
      jobData: {
        ...this.state.jobData,
        location
      }
    })
  }

  handleLocationCoords = (coords: Coords) => {
    this.setState({
      jobData: {
        ...this.state.jobData,
        coords
      }
    })
  }

  handleNumberRangeChange = (event: Event) => {
    const key = (event.target as HTMLInputElement).dataset['key'] as 'salary' | 'equity'
    const idx = parseInt((event.target as HTMLInputElement).dataset['idx'] || '', 10)
    if (!idx || !key) {
      return
    }

    const { jobData } = this.state
    const value = parseEventToFloat(event)
    const currValue = jobData[key]
    const newValue = (currValue || []).slice()

    if (idx === 1) {
      newValue[0] = newValue[0] || value - value * 0.2
      newValue[1] = value
    } else {
      newValue[0] = value
    }

    const validRange = newValue.some((n) => n > 0)
    this.setState((state: State) => ({
      jobData: {
        ...state.jobData,
        range: validRange ? newValue : null
      }
    }))
  }

  handleSalaryTypeChange = (event: Event) => {
    const value = (event.target as HTMLInputElement).value || ''
    this.setState({ salaryType: value as RangeType })
  }

  handleEquityTypeChange = (event: Event) => {
    const value = (event.target as HTMLInputElement).value || ''
    this.setState({ equityType: value as RangeType })
  }

  setEditorRef = (editor: Quill): void => {
    this.descriptionRteSection = editor
  }

  submitHandler = (): void => {
    // const job = {}
    // validateJob(job)
    //   .then((res) => {
    //     if (res.data.valid) {
    //       console.log('isValid')
    //       return
    //     }
    //     throw new Error(res.data.message)
    //   })
    //   .catch((err: Error) => {
    //     console.log('err', err)
    //   })
  }

  render() {
    const { jobData, teaserCharsLeft, isValidating, salaryType, equityType } = this.state

    const titleSection = (
      <div class="form__section">
        <div class="form__input__label">Job title</div>
        <input class="form__input" type="text" />
      </div>
    )

    const companyNameSection = (
      <div class="form__section">
        <div class="form__input__label">Company name</div>
        <input class="form__input" type="text" />
      </div>
    )

    const teaserSection = (
      <div class="form__section">
        <div class="form__input__label">Job teaser</div>
        <div class="form__input__description">
          A brief description about the job/company mission
        </div>
        <textarea
          maxLength={80}
          ref={this.setTeaserRef}
          class="form__input"
          onInput={this.updateTeaserCharsLeft}
        />
        <div class="form__input__chars-left">
          {`${teaserCharsLeft}/${TEASER_MAX_CHARS} characters left`}
        </div>
      </div>
    )

    const contractSection = (
      <div class="form__section">
        <div class="form__input__label">Type of contract</div>
        <div className="row">
          <input
            name="job-type-full"
            type="radio"
            value="full-time"
            checked={jobData.contractType === 'full-time'}
            onChange={this.handleInputChange('contractType')}
          />
          <label for="job-type-full">Full-time</label>
        </div>
        <div class="row">
          <input
            name="job-type-part"
            type="radio"
            value="part-time"
            checked={jobData.contractType === 'part-time'}
            onChange={this.handleInputChange('contractType')}
          />
          <label for="job-type-part">Part-time</label>
          {jobData.contractType === 'part-time' && (
            <input
              type="text"
              maxLength={10}
              placeholder="80%"
              className="form__small-input"
              value={jobData.contractPercentage}
              onInput={this.handleInputChange('contractPercentage')}
            />
          )}
        </div>
        <div className="row">
          <input
            name="job-type-contract"
            type="radio"
            value="contractor"
            checked={jobData.contractType === 'contractor'}
            onChange={this.handleInputChange('contractType')}
          />
          <label for="job-type-contract">Contractor</label>
          {jobData.contractType === 'contractor' && (
            <div>
              <input
                name="contract-duration"
                className="form__small-input"
                type="text"
                maxLength={10}
                placeholder="6 months"
                value={jobData.contractDuration}
                onInput={this.handleInputChange('contractDuration')}
              />
            </div>
          )}
        </div>
        <div className="row">
          <input
            name="job-type-internship"
            type="radio"
            value="internship"
            checked={jobData.contractType === 'internship'}
            onChange={this.handleInputChange('contractType')}
          />
          <label for="job-type-internship">Internship</label>
        </div>
      </div>
    )

    const locationSection = (
      <div class="form__section">
        <div class="form__input__label">Office location</div>
        <LocationAutocomplete
          inputName="location"
          initialValue={jobData.location}
          onCoordsResolve={this.handleLocationCoords}
          onSelect={this.handleLocationSelect}
        />
      </div>
    )

    const isContractor = jobData.contractType === 'contractor'
    const salarySection = (
      <div class="form__section">
        <div class="form__input__label">Salary (in CHF)</div>
        <div class="form__input__description">
          Job posts that state the salary or a salary range get more candidates
        </div>
        <div class="row">
          <input
            name="salary-simple"
            type="radio"
            value="simple"
            checked={salaryType === 'simple'}
            onChange={this.handleSalaryTypeChange}
          />
          <label for="salary-simple">{isContractor ? 'Daily rate' : 'Salary'}</label>
          {salaryType === 'simple' && (
            <input
              data-idx="0"
              data-key="salary"
              className="form__small-input"
              type="text"
              maxLength={5}
              placeholder={isContractor ? '750' : '80k'}
              onInput={this.handleNumberRangeChange}
            />
          )}
        </div>
        <div class="row">
          <input
            name="range"
            type="radio"
            value="range"
            checked={salaryType === 'range'}
            onChange={this.handleSalaryTypeChange}
          />
          <label for="salary-range">{isContractor ? 'Daily rate range' : 'Salary range'}</label>
          {salaryType === 'range' && (
            <div class="form__input__range">
              <input
                type="text"
                data-idx="0"
                data-key="salary"
                maxLength={5}
                name="salary-range"
                value={(jobData.salary && jobData.salary[0]) || ''}
                placeholder={isContractor ? '750' : '80k'}
                className="form__small-input"
                onInput={this.handleNumberRangeChange}
              />
              <span>to</span>
              <input
                type="text"
                data-idx="1"
                data-key="salary"
                maxLength={5}
                value={(jobData.salary && jobData.salary[0]) || ''}
                placeholder={isContractor ? '1100' : '100k'}
                className="form__small-input"
                onInput={this.handleNumberRangeChange}
              />
            </div>
          )}
        </div>
        <div class="row">
          <input
            name="salary-null"
            type="radio"
            value=""
            checked={!salaryType}
            onChange={this.handleSalaryTypeChange}
          />
          <label for="salary-null">
            {`Don't display ${isContractor ? 'daily rate' : 'salary'}`}
          </label>
        </div>
      </div>
    )

    const equitySection = !isContractor && (
      <div class="form__section">
        <div class="form__input__label">Equity (%)</div>
        <div class="row">
          <input
            name="equity-simple"
            type="radio"
            value="simple"
            checked={equityType === 'simple'}
            onChange={this.handleEquityTypeChange}
          />
          <label for="equity-simple">{'Equity'}</label>
          {equityType === 'simple' && (
            <input className="form__small-input" type="text" maxLength={5} placeholder={'0.5'} />
          )}
        </div>
        <div class="row">
          <input
            name="equity-range"
            type="radio"
            value="range"
            checked={equityType === 'range'}
            onChange={this.handleEquityTypeChange}
          />
          <label>{'Equity range'}</label>
          {equityType === 'range' && (
            <div class="form__input__range">
              <input
                type="text"
                maxLength={4}
                data-idx="0"
                data-key="equity"
                placeholder={isContractor ? '0.5' : '8'}
                className="form__small-input"
                value={(jobData.equity && jobData.equity[0]) || ''}
                onInput={this.handleNumberRangeChange}
              />
              <span>to</span>
              <input
                type="text"
                maxLength={4}
                data-idx="1"
                data-key="equity"
                placeholder={isContractor ? '1100' : '100k'}
                className="form__small-input"
                value={(jobData.equity && jobData.equity[0]) || ''}
                onInput={this.handleNumberRangeChange}
              />
            </div>
          )}
        </div>
        <div class="row">
          <input
            name="equity-null"
            type="radio"
            value=""
            checked={!equityType}
            onChange={this.handleEquityTypeChange}
          />
          <label for="equity-null">{'No equity'}</label>
        </div>
      </div>
    )

    const descriptionRteSection = (
      <div class="form__rte-container">
        <div class="form__input__label">Job description</div>
        <Rte setEditorRef={this.setEditorRef} />
      </div>
    )

    const submitButton = (
      <div class="form__submit-button">
        <Button text="Next" onClick={this.submitHandler} loading={isValidating} />
      </div>
    )

    return (
      <div class="form">
        {titleSection}
        {companyNameSection}
        {locationSection}
        {teaserSection}
        {descriptionRteSection}
        {contractSection}
        {salarySection}
        {equitySection}
        {submitButton}
      </div>
    )
  }
}
