import { NumberRange, Job, FullJob } from '../types'

export const isEmpty = (obj: Object | any[] | undefined | null): boolean => {
  if (!obj) {
    return true
  }

  if (Array.isArray(obj)) {
    return obj.length === 0
  }

  return Object.keys(obj).length === 0
}

export const parseSalary = (job: Job | FullJob): string => {
  const contractor = job.contractType === 'contractor'
  const salary = job.salary

  if (!salary) {
    return ''
  }

  const values = salary.map((n) => (contractor ? n.toString() : `${n}k`)).join(' - ')
  if (contractor) {
    return `${values} / day`
  }

  return values
}

export const parseEquity = (equity: NumberRange): string => {
  return equity ? equity.map((n) => `${n}%`).join(' - ') : ''
}

export const parseEventToFloat = (event: Event): number => {
  return Number((parseFloat((event.target as HTMLInputElement).value) || 0).toFixed(2))
}
