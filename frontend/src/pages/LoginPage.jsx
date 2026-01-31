import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useLocation, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const location = useLocation();

  const successMessage = location.state?.successMessage;

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useContext(UserContext)

  const validateForm = (e) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      alert("Please fill in all fields.")
      return false
    }
    return true
  }

  const validatePassword = (password) => {
    if (password.length < 6) {
      alert("Password must be 6 characters minimum.")
      return false
    }
    return true
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const formIsValid = validateForm(e)
    if (!formIsValid) { return }
    const passwordIsValid = validatePassword(password)
    if (!passwordIsValid) { return }
    login(email, password)

  }

  useEffect(() => {
  if (successMessage) {
    const timer = setTimeout(() => {
      navigate(location.pathname, { replace: true });
    }, 5000);
    return () => clearTimeout(timer);
  }
}, [successMessage]);


  return (
    <section className="d-flex flex-column align-items-center justify-content-center vh-100 gap-4">
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <h1>Welcome back!</h1>
      <form action={"submit"} onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="exampleInputEmail1" className="form-label d-flex gap-2 "><i className="fa-regular fa-envelope"></i><p>Email</p></label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label d-flex gap-2 "><i className="fa-solid fa-key"></i><p>Password</p></label>
          <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </section>

  )
}

export default LoginPage
