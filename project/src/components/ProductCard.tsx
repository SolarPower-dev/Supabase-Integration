import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Zap } from 'lucide-react';
import { Database } from '../types/database';
import { useCart } from '../hooks/useCart';

type Product = Database['public']['Tables']['products']['Row'];

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:scale-[1.02]">
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {product.original_price && (
            <div className="absolute top-4 left-4 bg-sunset-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
              Save ${(product.original_price - product.price).toFixed(0)}
            </div>
          )}
          {!product.in_stock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">Out of Stock</span>
            </div>
          )}
          {product.stock_quantity <= 5 && product.in_stock && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
              Only {product.stock_quantity} left
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-sunset-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.short_description}
          </p>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {product.rating} ({product.review_count})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.original_price && (
                <span className="text-lg text-gray-500 line-through">
                  ${product.original_price}
                </span>
              )}
            </div>
            <div className="flex items-center text-teal-600">
              <Zap className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">Solar Powered</span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.in_stock}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
              product.in_stock
                ? 'bg-sunset-500 hover:bg-sunset-600 text-white hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>{product.in_stock ? 'Add to Cart' : 'Out of Stock'}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;