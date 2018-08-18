import * as preact from 'preact';

interface Props {
  to: string;
}

export class Link extends preact.Component<preact.RenderableProps<Props>> {
  clickHandler = (e: MouseEvent) => {
    e.preventDefault();
    history.pushState(null, undefined, this.props.to);
  }

  render() {
    const { to, children } = this.props;
    return (
      <a href={to} onClick={this.clickHandler}>{children}</a>
    );
  }
}
