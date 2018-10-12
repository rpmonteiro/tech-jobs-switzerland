import * as preact from 'preact'

interface Props {
  loading: boolean
}

export const LoadingSpinner: preact.FunctionalComponent<Props> = ({ loading }) =>
  loading ? <div className="loading-spinner" /> : null
