import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import PrintsPage from './pages/PrintsPage'
import ArtistsPage from './pages/ArtistsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CartPage from './pages/CartPage'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/prints" element={<PrintsPage />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  )
}

export default App
