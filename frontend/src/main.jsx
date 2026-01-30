import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootswatch/dist/brite/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from 'react-router-dom'
import PrintsProvider from './context/PrintContext.jsx';
import UsersProvider from './context/UserContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import ArtistProvider from './context/ArtistContext.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UsersProvider>
        <ArtistProvider>
          <PrintsProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </PrintsProvider>
        </ArtistProvider>
      </UsersProvider>
    </BrowserRouter>
  </StrictMode>,
)
