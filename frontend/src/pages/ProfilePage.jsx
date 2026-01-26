import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import "../styles/ProfilePage.css"

const ProfilePage = () => {
  const {name, email, profileImgUrl} = useContext(UserContext)

  return (
    <main>
      <h1>PROFILE PAGE</h1>
      <div className='d-flex align-items-center'>
        <div className='avatar'>
        <img src={profileImgUrl} alt={`${name} profile photo`}/></div>
        <h5>Hi, {name}!</h5>
      </div>
    </main>
  )
}

export default ProfilePage
