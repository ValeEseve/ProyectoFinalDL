import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import "../styles/ProfilePage.css"
import { Link, Outlet, Route, Routes } from 'react-router-dom'

const ProfilePage = () => {
  const { name, email, profileImgUrl } = useContext(UserContext)

  return (
    <main className="profile-page">
      <header className="profile-header d-flex g-5 align-items-center w-100 pt-5 ps-5">
        <div className="avatar">
          <img src={profileImgUrl} alt={`${name} profile photo`} />
        </div>
        <h4 className='ms-4'>Hi, {name}!</h4>
      </header>

      <div className="profile-body d-flex gap-2 w-100">
        <nav className="profile-nav d-flex flex-column g-4 ps-5">
          <Link to="my-prints"><h5>My Prints</h5></Link>
          <Link to="my-orders"><h5>My Orders</h5></Link>
          <Link to="new-post"><h5>New print</h5></Link>
          <Link to="settings"><h5>Settings</h5></Link>
        </nav>

        <section className="profile-content ">
          <Outlet />
        </section>
      </div>
    </main>

  )
}

export default ProfilePage
