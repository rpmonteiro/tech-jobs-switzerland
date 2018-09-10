import { config } from '../config';

export function getJob(id: string): Promise<Job> {
  const url = `${config.API_HOST}/job/${id}`;
  return fetch<Job>(url);
}

export function getJobs(): Promise<Job[]> {
  const url = `${config.API_HOST}/jobs`;
  return fetch<Job[]>(url);
}

export function postJob(newJob: Omit<Job, 'id'>): Promise<Job> {
  const url = `${config.API_HOST}/job`;
  const options = {
    body: JSON.stringify(newJob),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    }
  };

  return fetch<Job>(url, options);
}

export function fetch<T>(url: string, opts?: RequestInit): Promise<T> {
  return window.fetch(url, opts)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return res.json() as Promise<ApiResponse<T>>;
    })
    .then(data => data.data)
    .catch((error: Error) => {
      // some service to catch errors is called here -> service(error)
      // re-throw the error so the client can catch it
      throw error;
    });
}
