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
                    <button
                        onClick={handleAddToCart}
                        className={`btn ${isInCart(print.id) ? 'btn-success' : 'btn-primary'}`}
                    >
                        {isInCart(print.id) ? <i class="fa-regular fa-square-check"></i> : <i className="fa-solid fa-cart-arrow-down"></i>}
                    </button>
                </div>
            </div>
        </article>
    )
}

export default CardPrint
