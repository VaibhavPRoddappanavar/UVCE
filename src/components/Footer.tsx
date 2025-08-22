import React from 'react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Palette } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: 'mailto:hello@folkart.com', label: 'Email' },
  ];

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Artists', href: '#artists' },
    { name: 'Exhibitions', href: '#exhibitions' },
    { name: 'Workshops', href: '#workshops' },
  ];

  const supportLinks = [
    { name: 'Contact', href: '#contact' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Shipping', href: '#shipping' },
    { name: 'Returns', href: '#returns' },
  ];

  return (
    <footer className="bg-gradient-to-br from-stone-800 to-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-orange-400 to-red-500 p-2 rounded-xl">
                <Palette className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold header-indian">FolkArt</span>
            </div>
            <p className="text-stone-300 leading-relaxed">
              Connecting the world with India's rich folk art heritage, 
              one masterpiece at a time.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="bg-stone-700 p-2 rounded-full hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 transition-all duration-300 transform hover:scale-110"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-stone-300 hover:text-orange-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-stone-300 hover:text-orange-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-stone-300">
                <Mail className="h-5 w-5 text-orange-400" />
                <span>hello@folkart.com</span>
              </div>
              <div className="flex items-center space-x-3 text-stone-300">
                <Phone className="h-5 w-5 text-orange-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-start space-x-3 text-stone-300">
                <MapPin className="h-5 w-5 text-orange-400 mt-1" />
                <span>123 Art Street, Cultural District, Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="border-t border-stone-700 pt-8 mb-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2 text-orange-400">Stay Connected</h3>
            <p className="text-stone-300 mb-4">Subscribe to get updates on new exhibitions and artist features</p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full bg-stone-700 text-white placeholder-stone-400 border border-stone-600 focus:outline-none focus:border-orange-400 transition-colors duration-200"
              />
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-stone-700 pt-6 text-center">
          <p className="text-stone-400">
            © {new Date().getFullYear()} FolkArt. All rights reserved. 
            <span className="mx-2">|</span>
            <a href="#privacy" className="hover:text-orange-400 transition-colors duration-200">Privacy Policy</a>
            <span className="mx-2">|</span>
            <a href="#terms" className="hover:text-orange-400 transition-colors duration-200">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;