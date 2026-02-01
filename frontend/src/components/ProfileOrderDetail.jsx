import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import './ProfileOrderDetail.css'

const ProfileOrderDetail = () => {
  const { id } = useParams();
  const { getOrderById } = useOrders();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetail = async () => {
      setLoading(true);
      try {
        const data = await getOrderById(id);
        if (data) {
          setOrder(data);
        } else {
          navigate('/profile/my-orders');
        }
      } catch (error) {
        console.error('Error fetching order detail:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrderDetail();
    }
  }, [id]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'warning', text: 'Pending' },
      processing: { color: 'info', text: 'Processing' },
      shipped: { color: 'primary', text: 'Shipped' },
      delivered: { color: 'success', text: 'Delivered' },
      cancelled: { color: 'danger', text: 'Cancelled' }
    };
    
    const config = statusConfig[status] || { color: 'secondary', text: status };
    return (
      <span className={`badge bg-${config.color} fs-6`}>
        {config.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h3>Order not found</h3>
          <Link to="/profile/my-orders" className="btn btn-primary mt-3">
            Back to My Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Link to="/profile/my-orders" className="btn btn-outline-secondary btn-sm mb-2">
            ← Back to Orders
          </Link>
          <h2 className="mb-1">Order #{order.id}</h2>
          <p className="text-muted">
            Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        <div>
          {getStatusBadge(order.status)}
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Order Items</h5>
            </div>
            <div className="card-body">
              {order.items && order.items.map((item) => (
                <div key={item.id} className="row align-items-center mb-3 pb-3 border-bottom">
                  <div className="col-md-2">
                    {item.print?.img_url && (
                      <img 
                        src={item.print.img_url} 
                        alt={item.print.title}
                        className="img-fluid rounded"
                        style={{ maxHeight: '80px', objectFit: 'cover' }}
                      />
                    )}
                  </div>
                  
                  <div className="col-md-5">
                    <h6 className="mb-1">{item.print?.title || 'Unknown Print'}</h6>
                  </div>

                  <div className="col-md-2 text-center">
                    <p className="mb-0">
                      <strong>Qty:</strong> {item.quantity}
                    </p>
                  </div>

                  <div className="col-md-3 text-end">
                    <p className="mb-0 text-muted small">
                      ${Number(item.unit_price).toFixed(2)} each
                    </p>
                    <p className="mb-0 fw-bold">
                      ${(Number(item.unit_price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header bg-white">
              <h5 className="mb-0">Order Status</h5>
            </div>
            <div className="card-body">
              <div className="timeline">
                <div className={`timeline-item ${order.status === 'pending' || order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' ? 'active' : ''}`}>
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h6>Order Placed</h6>
                    <p className="text-muted small mb-0">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className={`timeline-item ${order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' ? 'active' : ''}`}>
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h6>Processing</h6>
                    <p className="text-muted small mb-0">Your order is being prepared</p>
                  </div>
                </div>

                <div className={`timeline-item ${order.status === 'shipped' || order.status === 'delivered' ? 'active' : ''}`}>
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h6>Shipped</h6>
                    <p className="text-muted small mb-0">Your order is on the way</p>
                  </div>
                </div>

                <div className={`timeline-item ${order.status === 'delivered' ? 'active' : ''}`}>
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h6>Delivered</h6>
                    <p className="text-muted small mb-0">Your order has been delivered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${Number(order.total_price).toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total:</strong>
                <strong className="text-primary fs-5">
                  ${Number(order.total_price).toFixed(2)}
                </strong>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header bg-white">
              <h5 className="mb-0">Shipping Address</h5>
            </div>
            <div className="card-body">
              {order.address ? (
                <>
                  <p className="mb-1">{order.address.street}</p>
                  <p className="mb-1">{order.address.city}, {order.address.state}</p>
                  <p className="mb-1">{order.address.zip_code}</p>
                  <p className="mb-0">{order.address.country}</p>
                </>
              ) : (
                <p className="text-muted mb-0">
                  Address ID: {order.shipping_address}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOrderDetail;