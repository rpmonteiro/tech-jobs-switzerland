import * as preact from 'preact'
import { Link } from '../link'
import logoSvg from '../../assets/logo.svg'
import { Button } from '../button'

export const NavBar = () => (
  <nav className="navbar">
    <div className="navbar__container container-fluid">
      <Link className="navbar__logo" to="/">
        <img src={logoSvg} />
      </Link>
      <Button className="navbar__button" text="Post a job" to="/post-a-job" />
    </div>
  </nav>
)
