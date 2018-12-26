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

export const parseContractTypeDetail = (job: Job): string => {
  const { contractType, contractPercentage, contractDuration } = job

  let info = toTitleCase(job.contractType)
  if (contractPercentage !== 100 && contractType !== 'contractor') {
    info += ` (${contractPercentage}%)`
  } else if (contractType === 'contractor') {
    info += `\u00a0(${contractDuration}m)`
  }

  return info
}

export const toTitleCase = (value: String): string => value.replace(/\b\S/g, (t) => t.toUpperCase())

export const parseSalary = (job: Job | FullJob): string => {
  const contractor = job.contractType === 'contractor'
  const salary = job.salary

  if (!salary) {
    return ''
  }

  const values = 'CHF\u00a0'.concat(
    salary.map((n) => (contractor ? n.toString() : `${n}k`)).join('\u00a0-\u00a0')
  )
  if (contractor) {
    return `${values}\u00a0/\u00a0day`
  }

  return values
}

export const parseEquity = (equity: NumberRange): string => {
  return equity ? equity.map((n) => `${n}%`).join('\u00a0-\u00a0') : ''
}

export const parseEventToFloat = (event: Event): number => {
  return Number((parseFloat((event.target as HTMLInputElement).value) || 0).toFixed(2))
}
