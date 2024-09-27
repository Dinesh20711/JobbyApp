import {Link, withRouter} from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-bar-section">
      <Link to="/" className="link-item">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          alt="website logo"
          className="logo-image"
        />
      </Link>
      <ul className="nav-items">
        <Link to="/" className="link-item">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="link-item">
          <li>Jobs</li>
        </Link>
      </ul>
      <li>
        <button onClick={onClickLogOut} className="logOut-btn">
          Logout
        </button>
      </li>
    </nav>
  )
}

export default withRouter(Header)
