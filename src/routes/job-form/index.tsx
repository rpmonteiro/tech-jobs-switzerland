import * as preact from 'preact'
import { ContractType, Coords } from '../../types'
import { Rte } from '../../components/rte'
import { Quill } from 'quill'
import { LocationAutocomplete } from '../../components/location-autocomplete'

type RangeType = 'simple' | 'range' | ''

interface State {
  contractType: ContractType
  salaryType: RangeType
  equityType: RangeType
  contractDuration: string
  contractPercentage: string
  teaserCharsLeft: number
  salary: string
  salaryRangeFrom: string
  salaryRangeTo: string
  equity: string
  equityRangeFrom: string
  equityRangeTo: string
}

const TEASER_MAX_CHARS = 80

// tslint:disable-next-line:max-line-length
export class JobForm extends preact.Component<{}, State> {
  state = {
    salary: '',
    salaryRangeFrom: '',
    salaryRangeTo: '',
    salaryType: 'simple' as RangeType,
    equity: '',
    equityType: '' as RangeType,
    equityRangeFrom: '',
    equityRangeTo: '',
    contractDuration: '',
    contractPercentage: '',
    contractType: 'full-time' as ContractType,
    teaserCharsLeft: TEASER_MAX_CHARS
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

  handleInputChange = (stateKey: keyof State) => {
    return (event: Event): void => {
      const value = (event.target as HTMLInputElement).value || ''

      this.setState(() => ({ [stateKey]: value }))
    }
  }

  setTeaserRef = (el: HTMLTextAreaElement): void => {
    this.teaserRef = el
  }

  handleLocationSelect = (address: string, coords: Coords | undefined) => {
    console.log({ address, coords })
  }

  setEditorRef = (editor: Quill): void => {
    this.descriptionRteSection = editor
  }

  render() {
    const {
      teaserCharsLeft,
      salaryType,
      contractType,
      salaryRangeFrom,
      salaryRangeTo,
      equityType,
      equityRangeFrom,
      equityRangeTo,
      contractDuration,
      contractPercentage
    } = this.state

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
            checked={contractType === 'full-time'}
            onChange={this.handleInputChange('contractType')}
          />
          <label for="job-type-full">Full-time</label>
        </div>
        <div class="row">
          <input
            name="job-type-part"
            type="radio"
            value="part-time"
            checked={contractType === 'part-time'}
            onChange={this.handleInputChange('contractType')}
          />
          <label for="job-type-part">Part-time</label>
          {contractType === 'part-time' && (
            <input
              type="text"
              maxLength={10}
              placeholder="80%"
              className="form__small-input"
              value={contractPercentage}
              onInput={this.handleInputChange('contractPercentage')}
            />
          )}
        </div>
        <div className="row">
          <input
            name="job-type-contract"
            type="radio"
            value="contractor"
            checked={contractType === 'contractor'}
            onChange={this.handleInputChange('contractType')}
          />
          <label for="job-type-contract">Contractor</label>
          {contractType === 'contractor' && (
            <div>
              <input
                name="contract-duration"
                className="form__small-input"
                type="text"
                maxLength={10}
                placeholder="6 months"
                value={contractDuration}
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
            checked={contractType === 'internship'}
            onChange={this.handleInputChange('contractType')}
          />
          <label for="job-type-internship">Internship</label>
        </div>
      </div>
    )

    const locationSection = (
      <div class="form__section">
        <div class="form__input__label">Office location</div>
        <LocationAutocomplete inputName="location" onSelect={this.handleLocationSelect} />
      </div>
    )

    const isContractor = contractType === 'contractor'
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
            onChange={this.handleInputChange('salaryType')}
          />
          <label for="salary-simple">{isContractor ? 'Daily rate' : 'Salary'}</label>
          {salaryType === 'simple' && (
            <input
              className="form__small-input"
              type="text"
              maxLength={5}
              placeholder={isContractor ? '750' : '80k'}
              onInput={this.handleInputChange('salary')}
            />
          )}
        </div>
        <div class="row">
          <input
            name="salary-range"
            type="radio"
            value="range"
            checked={salaryType === 'range'}
            onChange={this.handleInputChange('salaryType')}
          />
          <label for="salary-range">{isContractor ? 'Daily rate range' : 'Salary range'}</label>
          {salaryType === 'range' && (
            <div class="form__input__range">
              <input
                type="text"
                maxLength={5}
                value={salaryRangeFrom}
                placeholder={isContractor ? '750' : '80k'}
                className="form__small-input"
                onInput={this.handleInputChange('salaryRangeFrom')}
              />
              <span>to</span>
              <input
                type="text"
                maxLength={5}
                value={salaryRangeTo}
                placeholder={isContractor ? '1100' : '100k'}
                className="form__small-input"
                onInput={this.handleInputChange('salaryRangeTo')}
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
            onChange={this.handleInputChange('salaryType')}
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
            onChange={this.handleInputChange('equityType')}
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
            onChange={this.handleInputChange('equityType')}
          />
          <label for="equity-range">{'Equity range'}</label>
          {equityType === 'range' && (
            <div class="form__input__range">
              <input
                type="text"
                maxLength={4}
                placeholder={isContractor ? '0.5' : '8'}
                className="form__small-input"
                value={equityRangeFrom}
                onInput={this.handleInputChange('equityRangeFrom')}
              />
              <span>to</span>
              <input
                type="text"
                maxLength={4}
                placeholder={isContractor ? '1100' : '100k'}
                className="form__small-input"
                value={equityRangeTo}
                onInput={this.handleInputChange('equityRangeTo')}
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
            onChange={this.handleInputChange('equityType')}
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
      </div>
    )
  }
}
