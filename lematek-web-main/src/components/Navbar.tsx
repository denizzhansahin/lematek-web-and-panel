import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, Grid } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useCart();

  const cartItemsCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-600 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-2xl hover:text-pink-200 transition-colors transform hover:scale-105">
            LEMATEK
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-pink-200 transition-colors">Ana Sayfa</Link>
            <Link to="/categories" className="hover:text-pink-200 transition-colors flex items-center">
              <Grid className="w-4 h-4 mr-1" />
              Kategoriler
            </Link>
            <Link to="/products" className="hover:text-pink-200 transition-colors">Ürünler</Link>
            <Link to="/contact" className="hover:text-pink-200 transition-colors">İletişim</Link>
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="relative hover:text-pink-200 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fadeIn">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="hover:text-pink-200 transition-colors">Ana Sayfa</Link>
              <Link to="/categories" className="hover:text-pink-200 transition-colors flex items-center">
                <Grid className="w-4 h-4 mr-1" />
                Kategoriler
              </Link>
              <Link to="/products" className="hover:text-pink-200 transition-colors">Ürünler</Link>
              <Link to="/contact" className="hover:text-pink-200 transition-colors">İletişim</Link>
              <Link to="/cart" className="hover:text-pink-200 transition-colors flex items-center">
                <ShoppingCart className="w-5 h-5 mr-1" />
                Sepet {cartItemsCount > 0 && `(${cartItemsCount})`}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;