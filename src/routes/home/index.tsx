import * as preact from 'preact';
import { Button } from '../../components/button';
import { getJobs } from '../../api/job';
import { JobList } from '../../components/job-list';

interface State {
  jobs: Job[];
  error: string;
  loading: boolean;
}

export class Home extends preact.Component {
  state = {
    jobs: [],
    error: '',
    loading: true
  };

  componentDidMount() {
    getJobs()
      .then(jobs => this.setState({ jobs, loading: false }))
      .catch((err: Error) => this.setState({ error: err.message, loading: false }));
  }

  render() {
    const { jobs, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div class="home-page">
        <JobList jobs={jobs} />
      </div>
    );
  }
}
