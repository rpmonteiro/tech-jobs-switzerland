import * as preact from 'preact'
import { Link } from '../link'
import logoSvg from '../../assets/logo.svg'
import navbarDividerSvg from '../../assets/navbar-divider.svg'
import { Button } from '../button'
import './styles.less'

export const NavBar = () => (
  <nav className="navbar">
    <div className="navbar__container container-fluid">
      <Link className="navbar__logo" to="/">
        <img src={logoSvg} />
      </Link>
      <Button className="navbar__button" text="Post a job" to="/post-a-job" />
    </div>
    <div className="navbar__divider  container-fluid">

    </div>
  </nav>
)
