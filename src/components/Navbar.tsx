import React, { useState, useEffect } from 'react';
import { Menu, X, Palette, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { authUtils, User as UserType } from '../utils/auth';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  // Check authentication status on component mount
  useEffect(() => {
    const currentUser = authUtils.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    authUtils.logout();
    setUser(null);
  };

  const navItems = [
    { name: 'Home', to: '/' },
    { name: 'Marketplace', to: '/marketplace' },
    ...(user?.userType === 'artist' ? [{ name: 'Artist Dashboard', to: '/artist' }] : []),
    ...(user?.userType === 'business' ? [{ name: 'Brand Dashboard', to: '/brand' }] : []),
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
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-8">
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

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-1 bg-orange-50 rounded-full">
                  <User className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-stone-800">
                    {user.profile.name}
                  </span>
                  <span className="text-xs px-2 py-1 bg-orange-200 text-orange-800 rounded-full capitalize">
                    {user.userType}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 text-stone-600 hover:text-red-600 rounded-full transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-stone-600 hover:text-orange-500 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn-indian px-4 py-2 text-white text-sm font-medium rounded-full transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
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
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
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
          
          {/* Mobile Auth Section */}
          <div className="pt-4 border-t border-stone-200 space-y-2">
            {user ? (
              <>
                <div className="px-3 py-2 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium text-stone-800">
                      {user.profile.name}
                    </span>
                    <span className="text-xs px-2 py-1 bg-orange-200 text-orange-800 rounded-full capitalize">
                      {user.userType}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-stone-600 hover:text-red-600 rounded-lg transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block w-full text-center px-3 py-2 text-stone-600 hover:text-orange-500 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-center btn-indian px-3 py-2 text-white rounded-lg transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;