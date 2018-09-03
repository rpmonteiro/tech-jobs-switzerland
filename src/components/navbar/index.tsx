import * as preact from 'preact';
import { Link } from '../link';
import './styles.less';

export const NavBar = () => (
  <nav class="navbar">
    <div class="navbar__container container-fluid">
      <div class="logo">
        <Link to="/">FE Jobs</Link>
      </div>
      <div class="links__container">
        <Link to="/post-a-job">Post a job</Link>
        <Link to="/about">About</Link>
      </div>
    </div>
  </nav>
);
