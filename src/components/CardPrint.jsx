import { useCart } from '../context/CartContext';
import './CardPrint.css'

const CardPrint = ({ print, user }) => {
    const { addToCart, isInCart } = useCart();

    const handleAddToCart = () => {
        addToCart(print);
    };
    return (
        <article>
            <div className="card" style={{ width: "18rem" }}>
                <img src={print.img} className="card-img-top p-2 card-img-fixed" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{print.name}</h5>
                    <h6>Art by {user?.name}</h6>
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
