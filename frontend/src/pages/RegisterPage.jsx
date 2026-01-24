import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'

const RegisterPage = () => {
      const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const {register} = useContext(UserContext)

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
        if (password !== confirmPassword){
            alert("Las contraseñas no coinciden")
            return false
        } else {
            return true
        }
    }
    const handleSubmit = (e) => {
      e.preventDefault()
      const formIsValid = validateForm(e)
      if (!formIsValid) {return}
      const passwordIsValid = validatePassword(password)
      if (!passwordIsValid) {return}
      const passwordsMatch = validatePasswordsMatch(password, confirmPassword)
      if (!passwordsMatch) {return}
      register(email, password)
      alert("Bienvenid@, tu cuenta ha sido creada!")
  
    }
    return (
      <section className="d-flex flex-column align-items-center justify-content-center vh-100 gap-4">
        <form action="submit" className="d-flex flex-column gap-3 w-25" onSubmit={handleSubmit}>
          <h1>Register new account</h1>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" name="confirm-password" onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </section>
  )
}

export default RegisterPage
