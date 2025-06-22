import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Globe, Star, Sun, Battery, Lightbulb, Loader } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';

const Home: React.FC = () => {
  const { products, isLoading } = useProducts();
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-desert-100 via-sunset-50 to-teal-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,138,80,0.1),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Power Your
                <span className="text-sunset-500 block">Adventure</span>
                <span className="text-teal-600">Off-Grid</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Discover premium solar gear built for the desert. From portable panels to rugged power stations, 
                DuneVolt keeps you powered wherever your journey takes you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/shop"
                  className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2 group"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="border border-gray-300 hover:border-sunset-500 text-gray-700 hover:text-sunset-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative animate-slide-up">
              <div className="bg-white p-8 rounded-2xl shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Solar panel in desert"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">Explorer 100W</h3>
                    <p className="text-gray-600">Military-grade solar panel</p>
                  </div>
                  <span className="text-2xl font-bold text-sunset-500">$299</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose DuneVolt?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for adventurers who demand reliability, efficiency, and durability in extreme conditions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-sunset-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-sunset-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Desert Tested</h3>
              <p className="text-gray-600">
                Every product is rigorously tested in harsh desert conditions to ensure maximum durability and performance.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">High Efficiency</h3>
              <p className="text-gray-600">
                Advanced solar technology delivers maximum power output even in challenging light conditions.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-desert-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-desert-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Support</h3>
              <p className="text-gray-600">
                Based in UAE with worldwide shipping and 24/7 customer support for all your adventures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Our most popular solar gear for outdoor enthusiasts
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center">
              <Loader className="w-12 h-12 text-sunset-500 animate-spin" />
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              <div className="text-center">
                <Link
                  to="/shop"
                  className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg inline-flex items-center space-x-2"
                >
                  <span>View All Products</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Product Categories
            </h2>
            <p className="text-xl text-gray-600">
              Complete solar solutions for every adventure
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/shop?category=Solar%20Panels"
              className="group bg-gradient-to-br from-sunset-100 to-sunset-200 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Sun className="w-12 h-12 text-sunset-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Solar Panels</h3>
              <p className="text-gray-600">Portable and fixed solar panels for maximum power generation</p>
            </Link>
            
            <Link
              to="/shop?category=Power%20Banks"
              className="group bg-gradient-to-br from-teal-100 to-teal-200 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Battery className="w-12 h-12 text-teal-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Power Banks</h3>
              <p className="text-gray-600">High-capacity portable power solutions with solar charging</p>
            </Link>
            
            <Link
              to="/shop?category=Power%20Stations"
              className="group bg-gradient-to-br from-desert-200 to-desert-300 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Zap className="w-12 h-12 text-desert-700 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Power Stations</h3>
              <p className="text-gray-600">Complete off-grid power systems for extended adventures</p>
            </Link>
            
            <Link
              to="/shop?category=Lighting"
              className="group bg-gradient-to-br from-yellow-100 to-yellow-200 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Lightbulb className="w-12 h-12 text-yellow-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Solar Lighting</h3>
              <p className="text-gray-600">Reliable solar-powered lighting for camp and emergency use</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from real adventurers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "The Explorer 100W has been incredible on our desert camping trips. 
                Powers everything we need and handles the sand and heat like a champ!"
              </p>
              <p className="font-semibold text-gray-900">- Sarah M., Adventure Guide</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "DuneVolt's power station kept our research equipment running for a full week 
                in the middle of nowhere. Absolutely reliable!"
              </p>
              <p className="font-semibold text-gray-900">- Dr. Ahmed R., Researcher</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Quality is outstanding and customer service is top-notch. 
                These guys really know their solar gear!"
              </p>
              <p className="font-semibold text-gray-900">- Mike K., Photographer</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;