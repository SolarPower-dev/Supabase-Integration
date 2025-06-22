import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Eye, Truck, CheckCircle, Clock, XCircle, Loader } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';
import { useAuth } from '../hooks/useAuth';

const Orders: React.FC = () => {
  const { orders, isLoading } = useOrders();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/orders' } } });
    }
  }, [isAuthenticated, navigate]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'processing':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-sunset-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your DuneVolt orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link
              to="/shop"
              className="bg-sunset-500 hover:bg-sunset-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                      {getStatusIcon(order.status)}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order #{order.id.slice(-8).toUpperCase()}
                        </h3>
                        <p className="text-gray-600">
                          Placed on {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <Link
                        to={`/order/${order.id}`}
                        className="flex items-center space-x-2 text-sunset-600 hover:text-sunset-700 font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </Link>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex flex-col lg:flex-row lg:justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-2">Items ({order.order_items.length})</h4>
                        <div className="space-y-2">
                          {order.order_items.slice(0, 2).map((item) => (
                            <div key={item.id} className="flex items-center space-x-3">
                              <img
                                src={item.products.images[0]}
                                alt={item.products.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  {item.products.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Qty: {item.quantity} × ${item.unit_price}
                                </p>
                              </div>
                            </div>
                          ))}
                          {order.order_items.length > 2 && (
                            <p className="text-sm text-gray-600">
                              +{order.order_items.length - 2} more items
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 lg:mt-0 lg:ml-8">
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Total Amount</p>
                          <p className="text-2xl font-bold text-gray-900">
                            ${order.total_amount.toFixed(2)}
                          </p>
                          {order.tracking_number && (
                            <p className="text-sm text-gray-600 mt-2">
                              Tracking: {order.tracking_number}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;