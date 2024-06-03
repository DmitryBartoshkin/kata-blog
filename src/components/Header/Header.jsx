import { Outlet, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import noAvatar from '../../assets/img/no-avatar.png'
import { logout } from '../../stores/userSlice'
import './Header.scss'

export default function Header() {
  const userStore = (state) => state.user
  const userData = useSelector(userStore)
  const { user } = userData.userData
  const dispatch = useDispatch()
  const loginHeader = (
    <div className="header-auth-btns">
      <Link to="sign-in">
        <button className="btn btn-without-border" type="button">
          Sign In
        </button>
      </Link>
      <Link to="sign-up">
        <button className="btn btn-primary header-auth-btns__last" type="button">
          Sign Up
        </button>
      </Link>
    </div>
  )
  const profileHeader = (
    <div className="header-auth-btns">
      <Link to="new-article">
        <button className="btn btn-primary header-auth-btns__small" type="button">
          Create article
        </button>
      </Link>
      <span className="header-profile-username">{localStorage.getItem('name')}</span>
      <Link to="profile">
        <img
          className="header-profile-avatar"
          src={localStorage.getItem('avatar') || noAvatar}
          alt="user avatar"
          width={46}
          height={46}
        />
      </Link>
      <button
        className="btn header-auth-btns__last"
        type="button"
        onClick={() => {
          localStorage.clear()
          dispatch(logout())
        }}
      >
        <Link to="sign-in">Log Out</Link>
      </button>
    </div>
  )

  useEffect(() => {}, [user])

  return (
    <>
      <header className="header">
        <h6 className="header-blog-name">
          <Link to="/">Realworld Blog</Link>
        </h6>
        {localStorage.getItem('token') ? profileHeader : loginHeader}
      </header>
      <Outlet />
    </>
  )
}
