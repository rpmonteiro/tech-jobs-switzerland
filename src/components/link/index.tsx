import * as preact from 'preact'

interface Props {
  to: string
  className?: string
}

export class Link extends preact.Component<preact.RenderableProps<Props>> {
  clickHandler = (e: MouseEvent) => {
    e.preventDefault()
    history.pushState(null, '', this.props.to)
  }

  render() {
    const { to, children, className = '' } = this.props
    return (
      <a class={className} href={to} onClick={this.clickHandler}>
        {children}
      </a>
    )
  }
}
