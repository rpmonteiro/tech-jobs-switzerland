import * as preact from 'preact';
import { Link } from '../link';
import classnames from 'classnames';

interface Props {
  to?: string;
  text: string;
  orange: boolean;
  containerClass?: string;
}

export class Button extends preact.Component<Props> {
  render() {
    const { text, containerClass, to, orange } = this.props;

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
