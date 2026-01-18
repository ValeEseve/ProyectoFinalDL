import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useContext(UserContext)

  const validateForm = (e) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      alert("Por favor, rellena todos los campos requeridos.")
      return false
    }
    return true
  }

  const validatePassword = (password) => {
    if (password.length < 6) {
      alert("La clave debe ser de al menos 6 caracteres.")
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

  return (
    <section className="d-flex flex-column align-items-center justify-content-center vh-100 gap-4">
      <h1>Welcome back!</h1>
      <form action={"submit"} onSubmit={handleSubmit}>
        <div className="mb-4">
          <label for="exampleInputEmail1" className="form-label d-flex gap-2 "><i className="fa-regular fa-envelope"></i><p>Email</p></label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label d-flex gap-2 "><i className="fa-solid fa-key"></i><p>Password</p></label>
          <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </section>

  )
}

export default LoginPage
