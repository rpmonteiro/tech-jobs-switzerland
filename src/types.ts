type JobType = 'fulltime' | 'part-time' | 'contract' | 'internship'

interface Job {
  id: string;
  title: string;
  teaser: string;
  company: string;
  created: string;
  logo: string;
  location: string;
  type: JobType;
  salary?: number;
  equity?: number;
  email: string;
  description: string;
}

declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface ApiResponse<T> {
  data: T;
  message?: string;
}

interface AppConfig {
  API_HOST: string;
}
