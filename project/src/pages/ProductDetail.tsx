import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Zap, Shield, Truck, RotateCcw, Loader } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { Database } from '../types/database';

type Product = Database['public']['Tables']['products']['Row'];

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct } = useProducts();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) {
      loadProduct(id);
    }
  }, [id]);

  const loadProduct = async (productId: string) => {
    setIsLoading(true);
    const productData = await getProduct(productId);
    setProduct(productData);
    setIsLoading(false);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-sunset-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-2 bg-sunset-500 text-white rounded-md hover:bg-sunset-600 transition-colors"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-sunset-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Images */}
            <div className="p-8">
              <div className="mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex space-x-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-1 h-20 rounded-md overflow-hidden border-2 ${
                        selectedImage === index
                          ? 'border-sunset-500'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                
                {/* Stock Status */}
                {product.stock_quantity <= 5 && product.in_stock && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-700 text-sm font-medium">
                      Only {product.stock_quantity} left in stock - order soon!
                    </p>
                  </div>
                )}
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">
                    {product.rating} ({product.review_count} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.original_price && (
                    <span className="ml-3 text-2xl text-gray-500 line-through">
                      ${product.original_price}
                    </span>
                  )}
                  {product.original_price && (
                    <span className="ml-3 bg-sunset-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                      Save ${(product.original_price - product.price).toFixed(0)}
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-gray-600 text-lg mb-6">
                  {product.short_description}
                </p>

                {/* Quantity and Add to Cart */}
                <div className="flex items-center space-x-4 mb-8">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.in_stock}
                    className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                      product.in_stock
                        ? 'bg-sunset-500 hover:bg-sunset-600 text-white hover:shadow-lg'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>{product.in_stock ? 'Add to Cart' : 'Out of Stock'}</span>
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center">
                    <Shield className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">2 Year Warranty</p>
                  </div>
                  <div className="text-center">
                    <Truck className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Free Shipping</p>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">30-Day Returns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Description and Specs */}
          <div className="p-8 border-t">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {product.description}
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Zap className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Specifications</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <dl className="space-y-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <dt className="font-medium text-gray-900">{key}:</dt>
                        <dd className="text-gray-600 text-right">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;