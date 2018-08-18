import * as preact from 'preact';
import { Home } from './routes/home';
import { NotFound } from './routes/not-found';
import { About } from './routes/about';
import { pushStateMonkeyPatch } from './utils/monkey-patch';
import { NavBar } from './components/navbar';

interface State {
  location: string;
}

export class App extends preact.Component<{}, State> {
  state = {
    location: window.location.pathname
  };

  componentDidMount() {
    pushStateMonkeyPatch();
    window.addEventListener('popstate', this.updateLocation);
    window.addEventListener('pushstate', this.updateLocation);
  }

  updateLocation = () => {
    this.setState({ location: window.location.pathname });
  }

  render() {
    const { location } = this.state;

    let component;
    switch (location) {
      case '/':
        component = [<NavBar />, <Home />];
        break;
      case '/about':
        component = [<NavBar />, <About />];
        break;
      default:
        component = [<NavBar />, <NotFound />];
        break;
    }

    return (
      <div class="app">
        {component}
      </div>
    );
  }
}
