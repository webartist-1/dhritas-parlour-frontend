"use client";

import { Clock, Facebook, Heart, Instagram, MapPin, Menu, Phone, Sparkles, Twitter, X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', href: '/home' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/beautysalon', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/beautysalon', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/beautysalon', label: 'Twitter' }
  ];

  return (
    <>
      {/* Top Info Bar */}
      <div className="hidden md:block bg-gradient-to-r from-pink-50 via-pink-100 to-purple-50 border-b border-pink-200/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center text-pink-700">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Mon - Sat: 9AM - 8PM</span>
              </div>
              <div className="flex items-center text-pink-700">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">123 Beauty Street, City, UK</span>
              </div>
              <a
                href="tel:+1234567890"
                className="flex items-center text-pink-700 hover:text-pink-900 transition-colors duration-200"
              >
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">07480233841</span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-pink-600">Follow Us:</span>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-800 transition-colors duration-200 hover:scale-110 transform"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-pink-200/50' 
            : 'bg-white shadow-lg'
        }`}
      >
        {/* Decorative top border */}
        <div className="h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400"></div>
        
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Brand Logo */}
            <a href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-300 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Drita&#39;s Aesthetics
                </h1>
                <p className="text-sm text-pink-500 font-medium">And Spmu Brows</p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative px-6 py-3 text-gray-700 font-semibold hover:text-pink-600 transition-all duration-300 group"
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-8 transition-all duration-300"></div>
                </a>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-pink-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative flex items-center">
                  <Heart className="w-4 h-4 mr-2" />
                  Book Appointment
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-gradient-to-r from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 transition-all duration-300 transform hover:scale-105"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-pink-600" />
              ) : (
                <Menu className="w-6 h-6 text-pink-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50 border-t border-pink-200/50">
            <div className="container mx-auto px-4 py-6">
              {/* Mobile Navigation Items */}
              <div className="space-y-2 mb-6">
                {navigationItems.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-3 rounded-xl text-gray-700 font-semibold hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 hover:text-pink-600 transition-all duration-300 transform hover:translate-x-2"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mr-3 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                      {item.name}
                    </div>
                  </a>
                ))}
              </div>

              {/* Mobile Contact Info */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 mb-4 border border-pink-200/50">
                <h3 className="text-lg font-bold text-pink-700 mb-3 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Contact Info
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-3 text-pink-500" />
                    <span className="text-sm">+1 (234) 567-890</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-3 text-pink-500" />
                    <span className="text-sm">Mon - Sat: 9AM - 8PM</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-3 text-pink-500" />
                    <span className="text-sm">123 Beauty Street, City</span>
                  </div>
                </div>
              </div>

              {/* Mobile Social Links */}
              <div className="flex items-center justify-center space-x-6 mb-4">
                <span className="text-sm text-pink-600 font-medium">Follow Us:</span>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 text-pink-600 hover:from-pink-200 hover:to-purple-200 hover:scale-110 transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              {/* Mobile CTA Button */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative flex items-center justify-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Book Your Appointment
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Add top padding to body to account for fixed navbar */}
      <div className="h-12 md:h-12"></div>
    </>
  );
};

export default Navbar;