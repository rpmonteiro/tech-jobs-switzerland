import * as preact from 'preact';
import { Link } from '../link';
import './styles.less';

interface Props {
  text: string;
  to?: string;
  containerClass?: string;
}

export class Button extends preact.Component<Props> {
  render() {
    const { text, containerClass, to } = this.props;

    const buttonText = (
      <span class="button__text">
        {text}
      </span>
    );

    const childEl = to
      ? <Link to={to}>{buttonText}</Link>
      : buttonText;

    return (
      <div class={containerClass}>
        <button class="button">
        hello
          {childEl}
        </button>
      </div>
    );
  }
}
