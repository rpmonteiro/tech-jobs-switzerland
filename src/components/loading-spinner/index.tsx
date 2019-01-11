import * as preact from 'preact'
import './styles.less'

interface Props {
  loading: boolean
}

export const LoadingSpinner: preact.FunctionalComponent<Props> = ({ loading }) =>
  loading ? <div className="loading-spinner" /> : null
