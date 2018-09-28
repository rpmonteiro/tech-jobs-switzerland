import * as preact from 'preact';
import { Link } from '../link';
import classnames from 'classnames';

interface Props {
  to?: string;
  color?: string;
  text: string;
}

export class Button extends preact.Component<Props> {
  render() {
    const { text, to, color } = this.props;

    const buttonText = (
      <span className="button__text">
        {text}
      </span>
    );

    const childEl = to
      ? <Link to={to}>{buttonText}</Link>
      : buttonText;

    return (
      <button className={classnames('button', color ? `button-${color}` : '')}>
        {childEl}
      </button>
    );
  }
}
