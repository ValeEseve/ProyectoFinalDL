import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import "../styles/ProfilePage.css"
import { Link, Outlet, Route, Routes } from 'react-router-dom'

const ProfilePage = () => {
  const { name, email, profileImgUrl } = useContext(UserContext)

  return (
    <main className="profile-page border-3">
      <header className="profile-header d-flex g-5 align-items-center w-100 m-5">
        <div className="avatar">
          <img src={profileImgUrl} alt={`${name} profile photo`} />
        </div>
        <h4 className='ms-4'>Hi, {name}!</h4>
      </header>

      <div className="profile-body d-flex m-5 gap-2">
        <nav className="profile-nav d-flex flex-column g-4">
          <Link to="my-prints">My Prints</Link>
          <Link to="my-orders">My Orders</Link>
          <Link to="new-post">New print</Link>
          <Link to="settings">Settings</Link>
        </nav>

        <section className="profile-content ">
          <Outlet />
        </section>
      </div>
    </main>

  )
}

export default ProfilePage
