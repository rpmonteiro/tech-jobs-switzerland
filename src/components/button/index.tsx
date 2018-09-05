import * as preact from 'preact';
import { Link } from '../link';

interface Props {
  to?: string;
  text: string;
}

export class Button extends preact.Component<Props> {
  render() {
    const { text, to } = this.props;

    const buttonText = (
      <span className="button__text">
        {text}
      </span>
    );

    const childEl = to
      ? <Link to={to}>{buttonText}</Link>
      : buttonText;

    return (
      <button className="button">
        {childEl}
      </button>
    );
  }
}
