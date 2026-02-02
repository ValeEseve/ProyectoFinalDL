import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PrintContext } from '../context/PrintContext'
import { useCart } from '../context/CartContext'
import "../styles/PrintDetailPage.css"
import { ArtistContext } from '../context/ArtistContext'

const PrintDetailPage = () => {
  const { id } = useParams()
  const { artists } = useContext(ArtistContext)
  const { prints } = useContext(PrintContext)
  const { addToCart, isInCart } = useCart();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("PrintDetailPage - ID from params:", id);
    console.log("PrintDetailPage - Prints available:", prints.length);
    console.log("PrintDetailPage - Artists available:", artists.length);
    
    // Dar tiempo para que los contexts se carguen
    if (prints.length > 0 && artists.length > 0) {
      setLoading(false);
    }
  }, [id, prints, artists]);

  const handleAddToCart = () => {
    if (print) {
      addToCart(print);
    }
  };

  // Convertir ambos IDs a número para comparación
  const print = prints.find(p => Number(p.id) === Number(id))

  console.log("PrintDetailPage - Found print:", print);

  // Mostrar loading solo si los datos aún no están disponibles
  if (loading || prints.length === 0 || artists.length === 0) {
    return (
      <main className="container my-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading print details...</p>
        </div>
      </main>
    )
  }

  // Si ya tenemos los datos pero no encontramos el print
  if (!print) {
    return (
      <main className="container my-5">
        <div className="text-center">
          <h3>Print not found</h3>
          <p className="text-muted">The print you're looking for doesn't exist.</p>
          <a href="/prints" className="btn btn-primary mt-3">
            Back to Prints
          </a>
        </div>
      </main>
    )
  }

  const printArtist = artists.find(a => a.id === print.artist_id)

  return (
    <main>
      <section className='d-flex m-5'>
        <div className='print-img-frame'>
          <img src={print.img_url} alt={print.title} className='print-img' />
        </div>
        <div className='ms-3 p-4'>
          <h1>{print.title} <span className='text-muted text-black-50'>by {printArtist?.name || 'Unknown Artist'}</span></h1>
          <p>{print.description}</p>
          <h5 className='text-end'>Dimensions: {print.width}x{print.height} cms</h5>
          <div className='d-flex justify-content-between align-items-center'>
            <h2>${print.price}</h2>
            <button
              onClick={handleAddToCart}
              className={`btn ${isInCart(print.id) ? 'btn-info' : 'btn-success'}`}
            >
              {isInCart(print.id) ? '✓' : 'Add to cart'}
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default PrintDetailPage