import * as preact from 'preact';
import { Link } from '../link';
import './styles.less';

export const NavBar = () => (
  <nav class="navbar">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
  </nav>
);
