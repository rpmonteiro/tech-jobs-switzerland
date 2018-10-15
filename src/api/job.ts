import { config } from '../config'
import { Job, Omit, ApiResponse, ValidateJobResponse } from '../types'
import { fetch } from './fetch'

export function getJob(id: string): Promise<ApiResponse<Job>> {
  const url = `${config.API_HOST}/job/${id}`
  return fetch<ApiResponse<Job>>(url)
}

export function getJobs(): Promise<ApiResponse<Job[]>> {
  const url = `${config.API_HOST}/jobs`
  return fetch<ApiResponse<Job[]>>(url)
}

export function validateJob(job: Job): Promise<ApiResponse<ValidateJobResponse>> {
  const url = `${config.API_HOST}/job/validate`
  return fetch<ApiResponse<ValidateJobResponse>>(url, {
    method: 'POST',
    body: JSON.stringify(job)
  })
}

export function postJob(newJob: Omit<Job, 'id'>): Promise<ApiResponse<Job>> {
  const url = `${config.API_HOST}/job`
  const options = {
    body: JSON.stringify(newJob),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  }

  return fetch<ApiResponse<Job>>(url, options)
}
