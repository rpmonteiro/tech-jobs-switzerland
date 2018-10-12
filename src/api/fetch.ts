import { ApiResponse } from '../types'

export function fetch<T>(url: string, opts?: RequestInit): Promise<T> {
  return window
    .fetch(url, opts)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json() as Promise<T>
    })
    .then(data => data)
    .catch((error: Error) => {
      // some service to catch errors (sentry, rollbar, etc.) is called here -> service(error)
      // re-throw the error so the client can catch it
      throw error
    })
}
