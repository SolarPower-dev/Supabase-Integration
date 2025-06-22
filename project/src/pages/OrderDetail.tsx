import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, XCircle, MapPin, CreditCard, Loader } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';
import { useAuth } from '../hooks/useAuth';
import { Database } from '../types/database';

type Order = Database['public']['Tables']['orders']['Row'] & {
  order_items: (Database['public']['Tables']['order_items']['Row'] & {
    products: Database['public']['Tables']['products']['Row'];
  })[];
};

const OrderDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOrder } = useOrders();
  const { isAuthenticated } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/order/${id}` } } });
      return;
    }

    if (id) {
      loadOrder(id);
    }
  }, [id, isAuthenticated, navigate]);

  const loadOrder = async (orderId: string) => {
    setIsLoading(true);
    const orderData = await getOrder(orderId);
    setOrder(orderData);
    setIsLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'processing':
        return <Package className="w-6 h-6 text-blue-500" />;
      case 'shipped':
        return <Truck className="w-6 h-6 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Clock className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
          <Link
            to="/orders"
            className="px-6 py-2 bg-sunset-500 text-white rounded-md hover:bg-sunset-600 transition-colors"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const shippingAddress = order.shipping_address as any;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/orders')}
          className="flex items-center space-x-2 text-gray-600 hover:text-sunset-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Orders</span>
        </button>

        {/* Order Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              {getStatusIcon(order.status)}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Order #{order.id.slice(-8).toUpperCase()}
                </h1>
                <p className="text-gray-600">
                  Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
              {order.tracking_number && (
                <p className="text-sm text-gray-600 mt-2">
                  Tracking: <span className="font-mono">{order.tracking_number}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Items</h2>
              
              <div className="space-y-6">
                {order.order_items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <img
                      src={item.products.images[0]}
                      alt={item.products.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.products.id}`}
                        className="text-lg font-semibold text-gray-900 hover:text-sunset-600 transition-colors"
                      >
                        {item.products.name}
                      </Link>
                      <p className="text-gray-600 text-sm mt-1">
                        {item.products.short_description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-gray-600">
                          Quantity: {item.quantity}
                        </span>
                        <span className="text-lg font-semibold text-gray-900">
                          ${item.total_price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary & Details */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">${order.tax_amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {order.shipping_amount === 0 ? 'Free' : `$${order.shipping_amount.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-gray-900">
                      ${order.total_amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">Shipping Address</h2>
              </div>
              
              <div className="text-gray-600 space-y-1">
                <p className="font-medium text-gray-900">
                  {shippingAddress.firstName} {shippingAddress.lastName}
                </p>
                <p>{shippingAddress.address}</p>
                <p>
                  {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                </p>
                <p>{shippingAddress.country}</p>
                {shippingAddress.phone && (
                  <p className="mt-2">Phone: {shippingAddress.phone}</p>
                )}
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-2 mb-4">
                <CreditCard className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">Payment</h2>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Method</span>
                  <span className="font-medium">{order.payment_method || 'Credit Card'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-medium ${
                    order.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;