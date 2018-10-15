export type ContractType = 'full-time' | 'part-time' | 'contractor' | 'internship'

export const emptyJob: Job = {
  id: '',
  title: '',
  teaser: '',
  company: '',
  created: '',
  logo: '',
  location: '',
  contract: 'full-time',
  email: '',
  coords: null,
  description: ''
}

export interface Job {
  id: string
  title: string
  coords: Coords | null
  description: string
  teaser: string
  company: string
  created: string
  logo: string
  location: string
  contract: ContractType
  salary?: string
  equity?: string
  email?: string
  link?: string
}

export interface GooglePlacesAutocompleteResponse {
  predictions: GooglePlacesAutocompletePrediction[]
}

export interface GoogleGeolocationResponse {
  results: GoogleGeolocationResult[]
}

export interface GooglePlacesAutocompletePrediction {
  description: string
  structured_formatting: {
    main_text: string
    secondary_text: string
  }
}

export type Coords = [number, number]

export interface GoogleGeolocationResult {
  formatted_address: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface ValidateJobResponse {
  valid: boolean
  message?: string
}

export interface AppConfig {
  API_HOST: string
  SESSION_TOKEN: string
}
