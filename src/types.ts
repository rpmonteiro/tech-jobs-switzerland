import { GeoPoint, Timestamp } from '@google-cloud/firestore'

type NumberRange = null | [number] | [number, number]
type ContractType = 'full-time' | 'contractor' | 'part-time' | 'internship'
type ContractDuration = number | null

// TODO: define and add job_category
export interface Job {
  title: string
  teaser: string
  company: string
  isRemote: boolean
  homeOffice: number
  created_at: Timestamp
  coords: GeoPoint
  logo: string
  location: string
  contract_percentage: number
  contract_type: ContractType
  contract_duration: ContractDuration
  salary: NumberRange
  equity: NumberRange
  link: string
  email: string
  description: string
}
