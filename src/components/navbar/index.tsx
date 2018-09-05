import * as preact from 'preact';
import { Link } from '../link';
import './styles.less';
import { Button } from '../button';

export const NavBar = () => (
  <nav className="navbar">
    <div className="navbar__container container-fluid">
      <div className="logo">
        <Link to="/">FE Jobs</Link>
      </div>
      <div className="links__container">
        <Button
          orange
          text="Post a job"
          to="/post-a-job"
        />
      </div>
    </div>
  </nav>
);
