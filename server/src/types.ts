import { GeoPoint, Timestamp } from '@google-cloud/firestore'

type NumberRange = null | [number] | [number, number]
type ContractType = 'full-time' | 'contractor' | 'part-time' | 'internship'
type ContractDuration = number | null

type JobCategory =
  | 'backend'
  | 'frontend'
  | 'fullstack'
  | 'designer-ux'
  | 'devops-sysadmin'
  | 'sales-marketing'
  | 'business-product'
  | 'customer-support'

// TODO: define and add job_category
export interface Job {
  title: string
  teaser: string
  company: string
  isRemote: boolean
  homeOffice: number
  createdAt: Timestamp
  coords: GeoPoint
  logo: string
  location: string
  contractPercentage: number
  contractType: ContractType
  contractDuration: ContractDuration
  salary: NumberRange
  equity: NumberRange
  link: string
  email: string
  description: string
  category: JobCategory
}
