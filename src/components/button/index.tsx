import * as preact from 'preact'
import { Link } from '../link'
import cn from 'classnames'
import { LoadingSpinner } from '../loading-spinner'

interface Props {
  to?: string
  color?: string
  text: string
  disabled?: boolean
  onClick?: () => void
  loading?: boolean
  className?: string
}

export class Button extends preact.Component<Props> {
  clickHandler = () => {
    const { onClick } = this.props
    onClick && onClick()
  }

  render() {
    const { text, to, color, disabled, loading, className } = this.props

    const buttonText = <span className="button__text">{text}</span>
    const childEl = to ? <Link to={to}>{buttonText}</Link> : buttonText
    const loadingSpinner = loading && <LoadingSpinner loading={loading} />

    return (
      <button
        className={cn('button', color ? `button-${color}` : '', className)}
        disabled={disabled || loading}
        onClick={this.clickHandler}
      >
        {loadingSpinner || childEl}
      </button>
    )
  }
}
