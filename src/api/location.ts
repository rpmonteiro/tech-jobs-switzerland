// tslint:disable:max-line-length
import { fetch } from './fetch'
import { GooglePlacesAutocompleteResponse, GoogleGeolocationResponse } from '../types'

const sessionToken = '123456789'
const apiKey = 'AIzaSyBvwcajOtLcqFWc4fs8TSSq9bCpLz5yEmY'

export function googlePlacesAutocomplete(query: string): Promise<GooglePlacesAutocompleteResponse> {
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${query}&language=en&sessiontoken=${sessionToken}`
  return fetch<GooglePlacesAutocompleteResponse>(url)
}

export function googleGeolocation(address: string): Promise<GoogleGeolocationResponse> {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
  return fetch<GoogleGeolocationResponse>(url)
}
