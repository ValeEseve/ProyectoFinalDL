import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CardPrint.css'

const CardPrint = ({ print, artist }) => {
    const { addToCart, isInCart } = useCart();
    console.log("Print img_url llegando a CardPrint: ", print.img_url)
    const handleAddToCart = () => {
        addToCart(print);
    };
    return (
        <article>
            
            <div className="card" style={{ width: "15rem" }}>
                <Link to={`/prints/${print.id}`}><img src={print.img_url || null} className="card-img-top p-2 card-img-fixed h-100" alt="..." /></Link>
                <div className="card-body">
                    <h5 className="card-title">{print.title}</h5>
                    <h6>Art by {artist?.name}</h6>
                    <div className='d-flex justify-content-between align-items-center'>
                        <p>${print.price}</p>
                        <button
                            onClick={handleAddToCart}
                            className={`btn ${isInCart(print.id) ? 'btn-info' : 'btn-success'}`}
                        >
                            {isInCart(print.id) ? '✓' : 'Add to cart'}
                        </button>
                    </div>
                </div>
            </div>
            
        </article>
    )
}

export default CardPrint
