import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootswatch/dist/brite/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from 'react-router-dom'
import PrintsProvider from './context/PrintContext.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PrintsProvider>
        <App />
      </PrintsProvider>
    </BrowserRouter>
  </StrictMode>,
)
