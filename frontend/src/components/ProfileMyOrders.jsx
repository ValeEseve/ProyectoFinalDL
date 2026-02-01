import { useOrders } from '../context/OrderContext';
import { Link } from 'react-router-dom';

const ProfileMyOrders = () => {
  const { orders, loading } = useOrders();

  if (loading) {
    return (
      <div className="container py-5">
        <p>Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h3>You don't have any orders yet</h3>
          <p className="text-muted">Start shopping to see your orders here!</p>
          <Link to="/prints" className="btn btn-primary mt-3">
            Browse Prints
          </Link>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: 'warning',
      processing: 'info',
      shipped: 'primary',
      delivered: 'success',
      cancelled: 'danger'
    };
    
    return `badge bg-${statusColors[status] || 'secondary'}`;
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">My Orders</h2>
      
      <div className="row">
        {orders.map(order => (
          <div key={order.id} className="col-12 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <h6 className="text-muted mb-1">Order #{order.id}</h6>
                    <p className="small text-muted mb-0">
                      {new Date(order.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>

                  <div className="col-md-2">
                    <span className={getStatusBadge(order.status)}>
                      {order.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="col-md-2">
                    <p className="mb-0">
                      <strong>{order.items?.length || 0}</strong> item(s)
                    </p>
                  </div>

                  <div className="col-md-3">
                    <h5 className="mb-0 text-primary">
                      ${Number(order.total_price).toFixed(2)}
                    </h5>
                  </div>

                  <div className="col-md-2 text-end">
                    <Link 
                      to={`/profile/my-orders/${order.id}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Mostrar preview de items si están disponibles */}
                {order.items && order.items.length > 0 && (
                  <div className="mt-3 pt-3 border-top">
                    <div className="d-flex gap-2 flex-wrap">
                      {order.items.slice(0, 3).map((item, index) => (
                        <div key={index} className="d-flex align-items-center gap-2">
                          {item.print?.img_url && (
                            <img 
                              src={item.print.img_url} 
                              alt={item.print.title}
                              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                              className="rounded"
                            />
                          )}
                          <small className="text-muted">
                            {item.print?.title} x{item.quantity}
                          </small>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <small className="text-muted">
                          +{order.items.length - 3} more
                        </small>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileMyOrders;