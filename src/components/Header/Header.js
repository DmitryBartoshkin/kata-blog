import { Outlet, Link } from 'react-router-dom'

import './Header.scss'

export default function Header() {
  return (
    <>
      <header>
        <h6 className="header-blog-name">
          <Link to="/">Realworld Blog</Link>
        </h6>
        <div className="header-auth-btns">
          <button className="btn btn-without-border" type="button">
            Sign In
          </button>
          <button className="btn btn-primary" type="button">
            Sign Up
          </button>
        </div>
      </header>
      <Outlet />
    </>
  )
}
