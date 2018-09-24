import * as preact from 'preact';
import { Home } from './routes/home';
import { NotFound } from './routes/not-found';
import { About } from './routes/about';
import { JobPage } from './routes/job';
import { pushStateMonkeyPatch } from './utils/monkey-patch';
import { NavBar } from './components/navbar';

interface State {
  pathname: string;
}

export class App extends preact.Component<{}, State> {
  state = {
    pathname: window.location.pathname
  };

  componentDidMount() {
    pushStateMonkeyPatch();
    window.addEventListener('popstate', this.updateLocation);
    window.addEventListener('pushstate', this.updateLocation);
  }

  updateLocation = () => {
    this.setState({ pathname: window.location.pathname });
  }

  render() {
    const { pathname } = this.state;
    const notFound = <NotFound />;

    let page;
    switch (true) {
      case pathname === '/':
        page = <Home />;
        break;
      case pathname === '/about':
        page = <About />;
        break;
      case /job\//.test(pathname):
        const match = pathname.match(/([^\/]+)$/);
        console.log('inside job case', pathname, { match });
        page = match
          ? <JobPage id={match[1]} />
          : notFound;
        break;
      default:
        page = notFound;
        break;
    }

    return (
      <div class="app">
        <NavBar />
        <div className="app-page container-fluid">
          {page}
        </div>
      </div>
    );
  }
}
