import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, ShoppingCart } from 'lucide-react';
import { slugify } from '../utils/slugify';
import { Category } from '../types/Category';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  categories: Category[];
}

const Header: React.FC<HeaderProps> = ({ categories }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isKitsDropdownOpen, setIsKitsDropdownOpen] = useState(false);
  const { cart } = useCart();

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">म</span>
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-800">Maa Vratam Kit</h1>
                <p className="text-xs text-gray-600 hidden sm:block">Sacred Pooja Collections</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Home</Link>
            
            {/* Our Kits Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsKitsDropdownOpen(true)}
              onMouseLeave={() => setIsKitsDropdownOpen(false)}
            >
              <button
                className="flex items-center text-gray-700 hover:text-orange-600 font-medium transition-colors"
              >
                Our Kits
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              
              {isKitsDropdownOpen && (
                <div className="absolute top-full left-0 w-96 bg-white rounded-lg shadow-xl border p-4 grid grid-cols-1 gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${slugify(category.title)}`}
                      className="block p-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-colors"
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link to="/about" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">About Us</Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cart.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.itemCount > 99 ? '99+' : cart.itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-orange-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              <Link to="/" className="block px-2 py-2 text-gray-700 hover:text-orange-600 font-medium">Home</Link>
              
              {/* Mobile Our Kits */}
              <div>
                <button
                  onClick={() => setIsKitsDropdownOpen(!isKitsDropdownOpen)}
                  className="flex items-center justify-between w-full px-2 py-2 text-gray-700 hover:text-orange-600 font-medium"
                >
                  Our Kits
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isKitsDropdownOpen && (
                  <div className="pl-4 space-y-2 mt-2">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/category/${slugify(category.title)}`}
                        className="block py-2 text-sm text-gray-600 hover:text-orange-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              <Link to="/about" className="block px-2 py-2 text-gray-700 hover:text-orange-600 font-medium">About Us</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;