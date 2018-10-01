import * as preact from 'preact';
import { ContractType } from '../../types';

type SalaryType = 'simple' | 'range' | '';

interface State {
  contract: ContractType;
  salaryType: SalaryType;
  teaserCharsLeft: number;
}

const TEASER_MAX_CHARS = 80;

export class JobForm extends preact.Component<{}, State> {
  state = {
    contract: 'full-time' as ContractType,
    salaryType: 'simple' as SalaryType,
    teaserCharsLeft: TEASER_MAX_CHARS
  };

  teaserRef: HTMLTextAreaElement | undefined;

  updateTeaserCharsLeft = (): void => {
    if (!this.teaserRef) {
      return;
    }

    this.setState({
      teaserCharsLeft: TEASER_MAX_CHARS - this.teaserRef.value.length
    });
  }

  handleSalaryRadio = (event?: Event): void => {
    if (!event) {
      return;
    }

    this.setState({
      salaryType: ((event.target as HTMLInputElement).value || '') as SalaryType
    });
  }

  handleContractRadio = (event?: Event): void => {
    if (!event) {
      return;
    }

    this.setState({
      contract: ((event.target as HTMLInputElement).value || '') as ContractType
    });
  }

  setTeaserRef = (el: HTMLTextAreaElement): void => {
    this.teaserRef = el;
  }

  render() {
    const { teaserCharsLeft, salaryType, contract } = this.state;

    const titleInput = (
      <div>
        <div class="form__input__label">Job title</div>
        <input class="form__input" type="text" />
      </div>
    );

    const companyNameInput = (
      <div>
        <div class="form__input__label">Company name</div>
        <input class="form__input" type="text" />
      </div>
    );

    const teaserInput = (
      <div>
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
        <div class="form__input__label">
          {`${teaserCharsLeft}/${TEASER_MAX_CHARS} characters left`}
        </div>
      </div>
    );

    const contractRadio = (
      <div>
        <div class="form__input__label">Type of contract</div>
        <div className="row">
          <input
            name="job-type-full"
            type="radio"
            value="full-time"
            checked={contract === 'full-time'}
            onChange={this.handleContractRadio}
          />
          <label for="job-type-full">Full-time</label>
        </div>
        <div class="row">
          <input
            name="job-type-part"
            type="radio"
            value="part-time"
            checked={contract === 'part-time'}
            onChange={this.handleContractRadio}
          />
          <label for="job-type-part">Part-time</label>
          {contract === 'part-time' && (
            <input
              type="text"
              maxLength={10}
              placeholder="80%"
              className="form__small-input"
            />
          )}
        </div>
        <div className="row">
          <input
            name="job-type-contract"
            type="radio"
            value="contractor"
            checked={contract === 'contractor'}
            onChange={this.handleContractRadio}
          />
          <label for="job-type-contract">Contractor</label>
          {contract === 'contractor' && (
            <div>
              <input
                name="contract-duration"
                className="form__small-input"
                type="text"
                maxLength={5}
                placeholder="6 months"
              />
            </div>
          )}
        </div>
        <div className="row">
          <input
            name="job-type-internship"
            type="radio"
            value="internship"
            checked={contract === 'internship'}
            onChange={this.handleContractRadio}
          />
          <label for="job-type-internship">Internship</label>
        </div>
      </div>
    );

    const locationInput = (
      <div>
        <div class="form__input__label">Office location</div>
        <input class="form__input" type="text" />
      </div>
    );

    const isContractor = contract === 'contractor';
    const salaryInput = (
      <div>
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
            onChange={this.handleSalaryRadio}
          />
          <label for="salary-simple">
            {isContractor ? 'Daily rate' : 'Salary'}
          </label>
          {salaryType === 'simple' && (
            <input
              className="form__small-input"
              type="text"
              maxLength={5}
              placeholder={isContractor ? '750' : '80k'}
            />
          )}
        </div>
        <div class="row">
          <input
            name="salary-range"
            type="radio"
            value="range"
            checked={salaryType === 'range'}
            onChange={this.handleSalaryRadio}
          />
          <label for="salary-range">
            {isContractor ? 'Daily rate range' : 'Salary range'}
          </label>
          {salaryType === 'range' && (
            <div class="form__salary-range">
              <span>From</span>
              <input
                type="text"
                maxLength={5}
                placeholder={isContractor ? '750' : '80k'}
                className="form__small-input"
              />
              <span>to</span>
              <input
                type="text"
                maxLength={5}
                placeholder={isContractor ? '1100' : '100k'}
                className="form__small-input"
              />
            </div>
          )}
        </div>
        <input
          name="salary-null"
          type="radio"
          value=""
          checked={!salaryType}
          onChange={this.handleSalaryRadio}
        />
        <label for="salary-null">
          {`Don't display ${isContractor ? 'daily rate' : 'salary'}`}
        </label>
      </div>
    );

    return (
      <div class="form">
        {titleInput}
        {companyNameInput}
        {locationInput}
        {teaserInput}
        {contractRadio}
        {salaryInput}
      </div>
    );
  }
}
