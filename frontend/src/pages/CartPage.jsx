import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

const CartPage = () => {
  const { 
    cart, 
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity, 
    clearCart, 
    getTotal,
    getOrderItemsPayload
  } = useCart();

  const handleCreateOrder = async () => {
  const payload = {
    shipping_address_id: selectedAddressId,
    items: getOrderItemsPayload()
  };

  await api.post('/orders', payload);
  clearCart();
};


  if (cart.length === 0) {
    return (
      <div className="container my-5">
        <div className="text-center py-5">
          <h2>Your cart is empty</h2>
          <p className="text-muted">Start adding some amazing prints!</p>
          <Link to="/prints" className="btn btn-primary mt-3">
            Browse Prints
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      
      <div className="row">
        <div className="col-lg-8">
          {cart.map(item => (
            <div key={item.id} className="card mb-3">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="img-fluid rounded"
                      style={{ maxHeight: '150px', objectFit: 'cover' }}
                    />
                  </div>

                  <div className="col-md-4">
                    <h5 className="card-title mb-1">{item.name}</h5>
                    <p className="text-muted mb-0">
                      {item.user?.name && `By ${item.user.name}`}
                    </p>
                    <p className="fw-bold mt-2 mb-0">
                      ${Number(item.price).toFixed(2)}
                    </p>
                  </div>

                  <div className="col-md-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>
                      <span className="mx-3 fw-bold">{item.quantity}</span>
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                    <p className="text-center text-muted small mt-2 mb-0">
                      Subtotal: ${(Number(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="col-md-2 text-end">
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button 
            className="btn btn-outline-danger mt-3"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>

        <div className="col-lg-4">
          <div className="card sticky-top" style={{ top: '20px' }}>
            <div className="card-body">
              <h4 className="card-title mb-4">Order Summary</h4>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Items:</span>
                <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal:</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong className="text-primary fs-4">
                  ${getTotal().toFixed(2)}
                </strong>
              </div>

              <button className="btn btn-primary w-100 mb-2">
                Proceed to Checkout
              </button>

              <Link to="/" className="btn btn-outline-secondary w-100">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;