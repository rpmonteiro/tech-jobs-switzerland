import * as preact from 'preact';
import { getJob } from '../../api/job';
import { emptyJob, Job } from '../../types';
import { Button } from '../../components/button';

type SalaryType = 'simple' | 'range' | '';

interface ClickEventTarget extends EventTarget {
  value: string;
}

interface ClickEvent extends MouseEvent {
  target: ClickEventTarget;
}

interface State {
  salaryType: SalaryType;
  teaserCharsLeft: number;
}

const TEASER_MAX_CHARS = 80;

export class JobForm extends preact.Component<{}, State> {
  state = {
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

  setTeaserRef = (el: HTMLTextAreaElement): void => {
    this.teaserRef = el;
  }

  render() {
    const { teaserCharsLeft, salaryType } = this.state;

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
          A brief description about the job/company mission.
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

    const jobTypeRadio = (
      <input type="radio">
        <option label="Full-Time" value="Full-time">Full-time</option>
        <option>Part-time</option>
      </input>
    );

    const locationInput = (
      <div>
        <div class="form__input__label">Office location</div>
        <input class="form__input" type="text" />
      </div>
    );

    const salaryInput = (
      <div>
        <div class="form__input__label">Job title</div>
        <div class="form__input__description">
          Job posts that state the salary or a salary range get more candidates.
        </div>
        <div class="form__salary__row">
          <input
            name="salary-simple"
            type="radio"
            value="simple"
            checked={salaryType === 'simple'}
            onChange={this.handleSalaryRadio}
          />
          <label for="salary-simple">Salary</label>
          {salaryType === 'simple' && (
            <input
              type="text"
              maxLength={5}
              placeholder="80k"
            />
          )}
        </div>
        <div class="form__salary__row">
          <input
            name="salary-range"
            type="radio"
            value="range"
            checked={salaryType === 'range'}
            onChange={this.handleSalaryRadio}
          />
          {salaryType === 'range' && (
            <div class="form__salary-range__row">
              <span>From</span>
              <input
                type="text"
                maxLength={5}
                placeholder="80k"
              />
              <span>to</span>
              <input
                type="text"
                maxLength={5}
                placeholder="100k"
              />
            </div>
          )}
        </div>
        <label for="salary-range">Salary range</label>
        <input
          name="salary-null"
          type="radio"
          value=""
          checked={!salaryType}
          onChange={this.handleSalaryRadio}
        />
        <label for="salary-null">Don't display salary</label>
      </div>
    );

    return (
      <div class="form">
        {titleInput}
        {companyNameInput}
        {locationInput}
        {teaserInput}
        {jobTypeRadio}
        {salaryInput}
      </div>
    );
  }
}
