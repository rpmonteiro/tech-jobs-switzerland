export type ContractType = 'full-time' | 'part-time' | 'contractor' | 'internship'
export type NumberRange = [number] | [number, number] | null
export type Coords = [number, number] | null

export interface Job {
  homeOffice: number
  isRemote: boolean
  link: string
  salary: NumberRange
  email: string
  equity: NumberRange
  contractPercentage: number
  coords: Coords
  location: string
  createdAt: string
  title: string
  teaser: string
  company: string
  contractDuration: string
  contractType: ContractType
  logo: string
  id: string
}

export interface FullJob extends Job {
  description: string
}

export const emptyJob: Job = {
  id: '',
  title: '',
  teaser: '',
  company: '',
  createdAt: '',
  logo: '',
  location: '',
  salary: null,
  equity: null,
  homeOffice: 0,
  isRemote: false,
  link: '',
  contractDuration: '',
  contractPercentage: 100,
  contractType: 'full-time',
  email: '',
  coords: null
}

export const emptyFullJob: FullJob = {
  ...emptyJob,
  description: ''
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
