import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';

const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, getTaxAmount, getShippingAmount, getFinalTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Discover our amazing solar products</p>
          <Link
            to="/shop"
            className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const tax = getTaxAmount();
  const shipping = getShippingAmount();
  const total = getFinalTotal();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {cartItems.map((item) => (
                <div key={item.product.id} className="p-6 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.product.id}`}
                        className="text-lg font-semibold text-gray-900 hover:text-sunset-600 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-gray-600 text-sm">{item.product.short_description}</p>
                      <p className="text-xl font-bold text-gray-900 mt-1">
                        ${item.product.price}
                      </p>
                      {item.product.stock_quantity <= 5 && (
                        <p className="text-red-600 text-sm mt-1">
                          Only {item.product.stock_quantity} left in stock
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-gray-600 hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 py-1 border-x border-gray-300">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock_quantity}
                          className="p-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <Link
                to="/shop"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="px-6 py-2 text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-gray-900">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {shipping === 0 ? (
                <div className="mb-4 p-3 bg-green-50 rounded-md">
                  <p className="text-sm text-green-700 font-medium">
                    🎉 You qualify for free shipping!
                  </p>
                </div>
              ) : (
                <div className="mb-4 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-700">
                    Add ${(200 - subtotal).toFixed(2)} more for free shipping
                  </p>
                </div>
              )}

              <Link
                to="/checkout"
                className="w-full bg-sunset-500 hover:bg-sunset-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors text-center block"
              >
                Proceed to Checkout
              </Link>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Secure checkout • 30-day returns
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;