import * as preact from 'preact';
import { Link } from '../link';
import swissFlagSvg from '../../icons/swissFlag.svg';
import { Button } from '../button';

export const NavBar = () => (
  <nav className="navbar">
    <div className="navbar__container container-fluid">
        <Link className="navbar__logo" to="/">
          <div>Front-end jobs</div>
          <div>Switzerland</div>
          <img src={swissFlagSvg} />
        </Link>
      {/* <div className="links__container">
        <Button
          orange
          text="Post a job"
          to="/post-a-job"
        />
      </div> */}
    </div>
  </nav>
);
