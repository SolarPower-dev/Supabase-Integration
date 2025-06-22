import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, Loader } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoading, categories } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'All Products'
  );
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All Products') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...filtered].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...filtered].sort((a, b) => b.rating - a.rating);
      case 'name':
      default:
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [products, selectedCategory, sortBy, priceRange]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All Products') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-sunset-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop Solar Gear</h1>
          <p className="text-xl text-gray-600">
            Discover our complete range of premium off-grid solar equipment
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 mb-8 lg:mb-0">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <Filter className="w-5 h-5 text-gray-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-sunset-500 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>$0</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedCategory('All Products');
                  setPriceRange([0, 1000]);
                  setSearchParams({});
                }}
                className="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-gray-600">
                  Showing {filteredAndSortedProducts.length} products
                </p>
                
                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sunset-500"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>

                  {/* View Mode */}
                  <div className="flex border border-gray-300 rounded-md">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${
                        viewMode === 'grid'
                          ? 'bg-sunset-500 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${
                        viewMode === 'list'
                          ? 'bg-sunset-500 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredAndSortedProducts.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-6'
                }
              >
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-lg shadow-md text-center">
                <p className="text-gray-600 text-lg mb-4">No products found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All Products');
                    setPriceRange([0, 1000]);
                    setSearchParams({});
                  }}
                  className="px-6 py-2 bg-sunset-500 text-white rounded-md hover:bg-sunset-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;