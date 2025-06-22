import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, Shield, Check, Loader } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { useOrders } from '../hooks/useOrders';
import toast from 'react-hot-toast';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, getTaxAmount, getShippingAmount, getFinalTotal, clearCart } = useCart();
  const { user, profile, isAuthenticated } = useAuth();
  const { createOrder } = useOrders();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: profile?.first_name || '',
    lastName: profile?.last_name || '',
    email: user?.email || '',
    phone: profile?.phone || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'UAE'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }

    if (cartItems.length === 0) {
      navigate('/cart');
      return;
    }
  }, [isAuthenticated, cartItems.length, navigate]);

  React.useEffect(() => {
    if (profile) {
      setShippingInfo(prev => ({
        ...prev,
        firstName: profile.first_name || '',
        lastName: profile.last_name || '',
        phone: profile.phone || '',
      }));
    }
    if (user) {
      setShippingInfo(prev => ({
        ...prev,
        email: user.email || '',
      }));
    }
  }, [profile, user]);

  const subtotal = getCartTotal();
  const tax = getTaxAmount();
  const shipping = getShippingAmount();
  const total = getFinalTotal();

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create order in database
      const orderData = {
        items: cartItems.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
          unit_price: item.product.price,
        })),
        shipping_address: shippingInfo,
        payment_method: 'Credit Card',
        subtotal,
        tax_amount: tax,
        shipping_amount: shipping,
        total_amount: total,
      };

      const orderId = await createOrder(orderData);

      if (orderId) {
        // Clear cart and redirect to order confirmation
        clearCart();
        navigate(`/order/${orderId}`);
        toast.success('Order placed successfully!');
      } else {
        toast.error('Failed to create order. Please try again.');
      }
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated || cartItems.length === 0) {
    return null;
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
          <Loader className="w-16 h-16 text-sunset-500 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Processing Your Order</h2>
          <p className="text-gray-600 mb-6">
            Please wait while we process your payment and create your order...
          </p>
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-sm text-blue-700">
              Do not refresh or close this page
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-sunset-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 1 ? 'bg-sunset-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                1
              </div>
              <span className="ml-2 font-medium">Shipping</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${currentStep >= 2 ? 'bg-sunset-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${currentStep >= 2 ? 'text-sunset-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 2 ? 'bg-sunset-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 ? (
              /* Shipping Form */
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                  <Truck className="w-6 h-6 text-sunset-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Shipping Information</h2>
                </div>

                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, firstName: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sunset-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, lastName: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sunset-500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sunset-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sunset-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sunset-500"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sunset-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State/Province *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, state: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sunset-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, zipCode: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sunset-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <select
                      required
                      value={shippingInfo.country}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, country: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sunset-500"
                    >
                      <option value="UAE">United Arab Emirates</option>
                      <option value="SA">Saudi Arabia</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-sunset-500 hover:bg-sunset-600 text-white py-3 px-4 rounded-md font-semibold transition-colors"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            ) : (
              /* Payment Form */
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                  <CreditCard className="w-6 h-6 text-sunset-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Payment Information</h2>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardNumber: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sunset-500"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => setPaymentInfo(prev => ({ ...prev, expiryDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sunset-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo(prev => ({ ...prev, cvv: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sunset-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name on Card *
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentInfo.nameOnCard}
                      onChange={(e) => setPaymentInfo(prev => ({ ...prev, nameOnCard: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sunset-500"
                    />
                  </div>

                  <div className="flex items-center space-x-2 p-4 bg-green-50 rounded-md">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-green-700">
                      Your payment information is secure and encrypted
                    </span>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 px-4 rounded-md font-semibold transition-colors"
                    >
                      Back to Shipping
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="flex-1 bg-sunset-500 hover:bg-sunset-600 disabled:bg-sunset-300 text-white py-3 px-4 rounded-md font-semibold transition-colors"
                    >
                      {isProcessing ? 'Processing...' : 'Place Order'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-gray-900">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {shipping === 0 && (
                <div className="mt-4 p-3 bg-green-50 rounded-md">
                  <p className="text-sm text-green-700 font-medium">
                    🎉 You qualify for free shipping!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;