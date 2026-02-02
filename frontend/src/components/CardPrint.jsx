import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CardPrint.css'

const CardPrint = ({ print, artist }) => {
  const { addToCart, isInCart } = useCart();
  const navigate = useNavigate();
  
  console.log("=== CardPrint Render ===");
  console.log("Print:", print);
  console.log("Print ID:", print?.id);
  console.log("Print title:", print?.title);
  
  if (!print || !print.id) {
    console.error("❌ CardPrint: Invalid print!", print);
    return null;
  }
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("🛒 Adding to cart - Print ID:", print.id);
    addToCart(print);
  };

  const handleCardClick = (e) => {
    // Solo si NO es el botón
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
      console.log("Click en botón, no navegar");
      return;
    }
    
    e.preventDefault();
    const targetUrl = `/prints/${print.id}`;
    console.log("🔗 Navigating to:", targetUrl);
    navigate(targetUrl);
  };

  const inCart = isInCart(print.id);
  const artistName = artist?.name || print.artist?.name || 'Unknown Artist';
  
  const linkUrl = `/prints/${print.id}`;
  console.log(`Card "${print.title}" - Link URL: ${linkUrl}`);

  return (
    <article>
      <div 
        className="card" 
        style={{ width: "15rem", cursor: "pointer" }}
        onClick={handleCardClick}
      >
        <img 
          src={print.img_url || 'https://via.placeholder.com/300x400?text=No+Image'} 
          className="card-img-top p-2 card-img-fixed h-100" 
          alt={print.title || "Print"} 
        />
        <div className="card-body">
          <h5 className="card-title">{print.title || 'Untitled'}</h5>
          <h6>Art by {artistName}</h6>
          <div className='d-flex justify-content-between align-items-center'>
            <p className="mb-0">${print.price}</p>
            <button
              onClick={handleAddToCart}
              className={`btn ${inCart ? 'btn-info' : 'btn-success'}`}
              type="button"
            >
              {inCart ? '✓' : 'Add to cart'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CardPrint;