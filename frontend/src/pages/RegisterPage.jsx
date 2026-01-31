import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'

const RegisterPage = () => {
  const { register } = useContext(UserContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

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
      alert("Password must be at least 6 characters long.")
      return false
    }
    return true
  }

  const validatePasswordsMatch = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.")
      return false
    } else {
      return true
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const formIsValid = validateForm(e)
    if (!formIsValid) { return }
    const passwordIsValid = validatePassword(password)
    if (!passwordIsValid) { return }
    const passwordsMatch = validatePasswordsMatch(password, confirmPassword)
    if (!passwordsMatch) { return }
    register(email, password, name, username)
    setEmail("")
    setPassword("")
    setName("")
    setUsername("")
  }
  return (
    <section className="d-flex flex-column align-items-center justify-content-center gap-4">
      <form action="submit" className="d-flex flex-column gap-3 w-25" onSubmit={handleSubmit}>
        <h1>Register new account</h1>
        <div className="d-flex flex-column gap-2">
          <label htmlFor="name">Name</label>
          <input type="name" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="d-flex flex-column gap-2">
          <label htmlFor="username">Username</label>
          <input type="username" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="d-flex flex-column gap-2">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="d-flex flex-column gap-2">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="d-flex flex-column gap-2">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </section>
  )
}

export default RegisterPage
