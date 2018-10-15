import * as preact from 'preact'
import { GooglePlacesAutocompletePrediction, Coords } from '../../types'
import { googlePlacesAutocomplete, googleGeolocation } from '../../api/location'
import { LoadingSpinner } from '../loading-spinner'
import { isEmpty } from '../../utils/helpers'
import { debounceService } from '../../utils/debounce'
import classNames from 'classnames'

interface Props {
  inputName: string
  label?: string
  initialValue?: string
  onCoordsResolve: (coords: Coords) => void
  onSelect: (address: string) => void
}

interface State {
  error: string
  query: string
  loading: boolean
  pristine: boolean
  activePredictionIdx: number
  showPredictions: boolean
  initialValue?: string
  predictions: GooglePlacesAutocompletePrediction[]
}

export class LocationAutocomplete extends preact.Component<Props, State> {
  state = {
    error: '',
    loading: false,
    pristine: true,
    activePredictionIdx: -1,
    showPredictions: false,
    query: this.props.initialValue || '',
    predictions: [] as GooglePlacesAutocompletePrediction[]
  }

  clearResults = () => {
    this.setState({
      showPredictions: false,
      predictions: []
    })
  }

  searchHandler = (query: string): void => {
    if (query.length < 3) {
      this.clearResults()
      return
    }

    this.setState(
      {
        activePredictionIdx: -1,
        predictions: [],
        showPredictions: true,
        loading: true,
        error: ''
      },
      () => {
        debounceService.debounce(() => {
          googlePlacesAutocomplete(query)
            .then(res => {
              this.setState({
                predictions: res.predictions,
                pristine: false,
                loading: false
              })
            })
            .catch((err: Error) =>
              this.setState({
                error: '',
                pristine: false,
                loading: false
              })
            )
        }, 300)
      }
    )
  }

  onInputHandler = (event: Event): void => {
    const query = (event.target as HTMLInputElement).value || ''
    this.setState({ query }, () => this.searchHandler(query))
  }

  blurHandler = () => {
    this.setState({
      showPredictions: false
    })
  }

  mouseOverHandler = (event: Event) => {
    event.stopPropagation()
    const predictionIdx = (event.currentTarget as HTMLDivElement).dataset.idx || ''
    this.setState({
      activePredictionIdx: parseInt(predictionIdx, 10) || -1
    })
  }

  selectPrediction = () => {
    const { onSelect, onCoordsResolve } = this.props
    const { predictions, activePredictionIdx } = this.state

    const outOfBounds = activePredictionIdx < 0 || activePredictionIdx > predictions.length - 1
    if (outOfBounds) {
      return
    }
    const prediction = predictions[activePredictionIdx]
    onSelect(prediction.description)

    this.setState(
      {
        showPredictions: false
      },
      () => {
        googleGeolocation(prediction.description)
          .then(res => {
            const firstResult = res.results[0]
            const { lat, lng } = firstResult.geometry.location
            if (lat && lng) {
              onCoordsResolve([lat, lng])
            }
          })
          .catch(err => {
            console.warn('some error occurred', err)
          })
      }
    )
  }

  keyboardHandler = (event: KeyboardEvent): void => {
    const { activePredictionIdx, predictions } = this.state
    switch (event.keyCode) {
      case 38: // arrow up
        this.setState({
          activePredictionIdx:
            activePredictionIdx === 0
              ? predictions.length - 1
              : (activePredictionIdx - 1) % predictions.length
        })
        break
      case 40: // arrow down
        this.setState({
          activePredictionIdx:
            activePredictionIdx < 0 ? 0 : (activePredictionIdx + 1) % predictions.length
        })
        break
      case 13: // enter
        this.selectPrediction()
      default:
        break
    }
  }

  render() {
    const {
      query,
      predictions,
      loading,
      pristine,
      showPredictions,
      activePredictionIdx
    } = this.state
    const { inputName, label } = this.props

    const noResultsFound = !pristine &&
      !loading &&
      isEmpty(predictions) && (
        <div className="loc-autocomplete__no-results-found">No results found</div>
      )

    const loadingSpinner = loading && (
      <div className="loc-autocomplete__loading-spinner">
        <LoadingSpinner loading={loading} />
      </div>
    )

    const predictionRows = predictions.map((p, idx) => (
      <div
        className={classNames('loc-autocomplete__predictions__row', {
          'loc-autocomplete__predictions__row-active': activePredictionIdx === idx
        })}
        data-idx={idx}
        onMouseOver={this.mouseOverHandler}
        onClick={this.selectPrediction}
      >
        <span>{p.structured_formatting.main_text}</span>
        &nbsp;
        <span>{p.structured_formatting.secondary_text}</span>
      </div>
    ))

    const predictionsSection = showPredictions && (
      <div
        className={classNames('loc-autocomplete__predictions__container', {
          'loc-autocomplete__predictions__container-loading': loading
        })}
      >
        {loadingSpinner}
        {noResultsFound}
        {predictionRows}
      </div>
    )

    return (
      <div className="loc-autocomplete">
        <input
          onKeyDown={this.keyboardHandler}
          onBlur={this.blurHandler}
          value={query}
          name={inputName}
          type="text"
          onInput={this.onInputHandler}
        />
        {label && <label for={inputName}>{label}</label>}
        {predictionsSection}
      </div>
    )
  }
}
