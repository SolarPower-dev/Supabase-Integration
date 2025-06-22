import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Zap, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <Sun className="w-8 h-8 text-sunset-500" />
                <Zap className="w-4 h-4 text-teal-500 absolute -bottom-1 -right-1" />
              </div>
              <span className="text-2xl font-bold">DuneVolt</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Premium off-grid solar gear designed for the modern adventurer. 
              Built tough for desert conditions and engineered for reliability.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-sunset-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-sunset-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-sunset-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-sunset-500 transition-colors">Home</Link></li>
              <li><Link to="/shop" className="text-gray-300 hover:text-sunset-500 transition-colors">Shop</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-sunset-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-sunset-500 transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-sunset-500 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-gray-300 hover:text-sunset-500 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-sunset-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/shipping" className="text-gray-300 hover:text-sunset-500 transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="text-gray-300 hover:text-sunset-500 transition-colors">Returns</Link></li>
              <li><Link to="/warranty" className="text-gray-300 hover:text-sunset-500 transition-colors">Warranty</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">
                  Dubai, UAE<br />
                  Available Worldwide
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-sunset-500 flex-shrink-0" />
                <span className="text-gray-300">+971 50 123 4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-sunset-500 flex-shrink-0" />
                <span className="text-gray-300">info@dunevolt.ae</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 DuneVolt. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 sm:mt-0">
            Proudly serving adventurers worldwide since 2024
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;