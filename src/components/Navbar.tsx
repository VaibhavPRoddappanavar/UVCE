import React, { useState } from 'react';
import { Menu, X, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', to: '/' },
    { name: 'Marketplace', to: '/marketplace' },
    { name: 'Artist Dashboard', to: '/artist' },
    // { name: 'Explore Art', to: '#' },
    // { name: 'Artists', to: '#' },
    // { name: 'Brands', to: '#' },
    // { name: 'About', to: '#' },
    // { name: 'Contact', to: '#' },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-orange-400 to-red-500 p-2 rounded-xl">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold header-indian">FolkArt</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="text-stone-600 hover:text-orange-500 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-orange-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-stone-600 hover:text-orange-500 p-2 rounded-lg transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-stone-200">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="text-stone-600 hover:text-orange-500 block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 hover:bg-orange-50"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;