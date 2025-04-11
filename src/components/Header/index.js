import { Link, useNavigate } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { AiOutlineCalendar } from 'react-icons/ai'

import { BsFillBriefcaseFill } from 'react-icons/bs'
import { FiLogOut } from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = () => {
  const navigate = useNavigate()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', { replace: true })
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dtqmufptd/image/upload/v1731466123/Screenshot_2024-05-10_114343-removebg-preview_xzukr1.png"
            alt="website logo"
            className="home-website-logo"
          />
        </Link>
        <ul className="nav-items">
          <li>
            <Link to="/" className="nav-link-lg">
              Home
            </Link>
            <Link to="/" className="nav-link-sm">
              <AiFillHome className="small-header-icons" />
            </Link>
          </li>

          <li>
            <Link to="/jobs" className="nav-link-lg">
              Jobs
            </Link>
            <Link to="/jobs" className="nav-link-sm">
              <BsFillBriefcaseFill className="small-header-icons" />
            </Link>
          </li>
          
          <li>
  <Link to="/events" className="nav-link-lg">
    Events
  </Link>
  <Link to="/events" className="nav-link-sm">
    <AiOutlineCalendar className="small-header-icons" />
  </Link>
</li>

<li>
  <Link to="/quizzes" className="nav-link-lg">
    Quizzes
  </Link>
  <Link to="/quizzes" className="nav-link-sm">
    <AiOutlineCalendar className="small-header-icons" />
  </Link>
</li>


          <li className="logout-btn-list-item-small">
            <button
              type="button"
              className="logout-button-sm"
              onClick={onClickLogout}
            >
              <FiLogOut className="logout-icon-sm" />
            </button>
          </li>
        </ul>
        <button
          type="button"
          className="logout-button-lg"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Header
