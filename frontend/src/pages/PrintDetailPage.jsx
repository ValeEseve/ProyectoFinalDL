import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { PrintContext } from '../context/PrintContext'
import { useCart } from '../context/CartContext'
import "../styles/PrintDetailPage.css"

const PrintDetail = () => {
  const { id } = useParams()
  const { users } = useContext(UserContext)
  const { prints } = useContext(PrintContext)
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = () => {
    addToCart(print);
  };

  const print = prints.find((p) => p.id === String(id))
  const printArtist = users.find((a) => a.id === print.userId)

  if (!users.length || !prints.length) {
    return <p>Loading print...</p>;
  }

  return (
    <main>
      <section className='d-flex m-5'>
        <div className='print-img-frame'>
        <img src={print.img | null} alt={print.name} className='print-img' />
        </div>
        <div className='ms-3 p-4'>
          <h1>{print.name} <span className='text-muted text-black-50'>by {printArtist.name}</span></h1>
          <p>{print.descr}</p>
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

export default PrintDetail
