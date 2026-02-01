import { useContext } from 'react'
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

  const handleAddToCart = () => {
    addToCart(print);
  };
  const print = prints.find(p => String(p.id) === id)

  if (!print || !prints.length || !artists.length) {
    return <p>Loading print...</p>
  }

  const printArtist = artists.find(a => a.id === print.artist_id)


  return (
    <main>
      <section className='d-flex m-5'>
        <div className='print-img-frame'>
          <img src={print.img_url} alt={print.title} className='print-img' />
        </div>
        <div className='ms-3 p-4'>
          <h1>{print.title} <span className='text-muted text-black-50'>by {printArtist?.name}</span></h1>
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
