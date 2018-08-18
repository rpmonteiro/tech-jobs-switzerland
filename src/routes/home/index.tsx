import * as preact from 'preact';
import { Button } from '../../components/button';

export class Home extends preact.Component {
  render() {
    return (
      <div class="home-page">
        <div>Test123</div>

        <Button
          to="#"
          text="A nice little button with a link"
          containerClass="home-button__container"
        />
      </div>
    );
  }
}
