import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import PrintsPage from './pages/PrintsPage'
import ArtistsPage from './pages/ArtistsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CartPage from './pages/CartPage'
import { Routes, Route } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage'
import PrintDetailPage from './pages/PrintDetailPage'
import ArtistDetailPage from './pages/ArtistDetailPage'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/prints" element={<PrintsPage />} />
         <Route path="/print/:id" element={<PrintDetailPage />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/artist/:id" element={<ArtistDetailPage />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
