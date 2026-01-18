import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import PrintsPage from './pages/PrintsPage'
import ArtistsPage from './pages/ArtistsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CartPage from './pages/CartPage'
import { Routes, Route } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage'
import PrintDetail from './pages/PrintDetail'
import ArtistDetail from './pages/ArtistDetail'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/prints" element={<PrintsPage />} />
         <Route path="/print/:id" element={<PrintDetail />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/artist/:id" element={<ArtistDetail />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
