'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className={`font-bold text-xl transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              BYC
            </span>
          </Link>

          {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`transition-colors hover:text-primary-600 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`transition-colors hover:text-primary-600 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              About
            </Link>
            <Link
              href="/services"
              className={`transition-colors hover:text-primary-600 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="btn btn-primary btn-sm"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/"
              className="block py-2 text-gray-700 hover:text-primary-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block py-2 text-gray-700 hover:text-primary-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/services"
              className="block py-2 text-gray-700 hover:text-primary-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="block bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
