import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, ShoppingCart, User, Menu, X, Zap, Package } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartItemCount } = useCart();
  const { user, logout, displayName } = useAuth();
  const location = useLocation();
  const cartItemCount = getCartItemCount();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/faq', label: 'FAQ' }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Sun className="w-8 h-8 text-sunset-500 group-hover:text-sunset-600 transition-colors" />
              <Zap className="w-4 h-4 text-teal-500 absolute -bottom-1 -right-1" />
            </div>
            <span className="text-2xl font-bold text-gray-900 group-hover:text-sunset-600 transition-colors">
              DuneVolt
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-sunset-600 bg-sunset-50'
                    : 'text-gray-700 hover:text-sunset-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* User Menu */}
            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/orders"
                  className="flex items-center space-x-1 text-gray-700 hover:text-sunset-600 transition-colors"
                >
                  <Package className="w-5 h-5" />
                  <span className="text-sm font-medium">Orders</span>
                </Link>
                <span className="text-sm text-gray-700">Hello, {displayName}!</span>
                <button
                  onClick={logout}
                  className="text-sm text-gray-600 hover:text-sunset-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center space-x-1 text-gray-700 hover:text-sunset-600 transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">Login</span>
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-sunset-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-sunset-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce-subtle">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-sunset-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t animate-slide-up">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-sunset-600 bg-sunset-50'
                      : 'text-gray-700 hover:text-sunset-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <div className="px-3 py-2 border-t mt-2 pt-4 space-y-2">
                  <Link
                    to="/orders"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-sunset-600 transition-colors"
                  >
                    <Package className="w-5 h-5" />
                    <span>My Orders</span>
                  </Link>
                  <p className="text-sm text-gray-700">Hello, {displayName}!</p>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-sm text-gray-600 hover:text-sunset-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-2 text-base font-medium text-gray-700 hover:text-sunset-600 hover:bg-gray-50 rounded-md transition-colors border-t mt-2 pt-4"
                >
                  Login / Register
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;