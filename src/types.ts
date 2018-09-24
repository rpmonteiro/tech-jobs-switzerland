type JobType = 'fulltime' | 'part-time' | 'contract' | 'internship';

export const emptyJob: Job = {
  id: '',
  title: '',
  teaser: '',
  company: '',
  created: '',
  logo: '',
  location: '',
  type: 'fulltime',
  email: '',
  description: ''
};

export interface Job {
  id: string;
  title: string;
  description: string;
  teaser: string;
  company: string;
  created: string;
  logo: string;
  location: string;
  type: JobType;
  salary?: string;
  equity?: string;
  email?: string;
  link?: string;
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface AppConfig {
  API_HOST: string;
}
