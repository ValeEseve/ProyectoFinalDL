import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CardPrint.css'

const CardPrint = ({ print }) => {
    const { addToCart, isInCart } = useCart();
    const handleAddToCart = () => {
        addToCart(print);
    };
    console.log("PRINT de CardPrint:", print)

    const id = print.id;
    return (
        <article>

            <div className="card" style={{ width: "15rem" }}>
                <Link to={`/prints/${id}`}>
                    <img src={print.img_url || null} className="card-img-top p-2 card-img-fixed h-100" alt="..." /></Link>
                <div className="card-body">
                    <h5 className="card-title">{print.title}</h5>
                    <h6>Art by {print.artist?.name}</h6>
                    <div className='d-flex justify-content-between align-items-center'>
                        <p>${print.price}</p>
                        <button
                            onClick={handleAddToCart}
                            className={`btn ${isInCart(id)
                                ? 'btn-info' : 'btn-success'}`}
                        >
                            {isInCart(id)
                                ? '✓' : 'Add to cart'}
                        </button>
                    </div>
                </div>
            </div>

        </article>
    )
}

export default CardPrint
