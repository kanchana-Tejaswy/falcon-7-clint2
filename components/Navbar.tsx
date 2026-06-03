'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onNavClick?: (section: string) => void;
}

export default function Navbar({ onNavClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 48) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Collection', id: 'collection' },
    { name: 'Technology', id: 'technology' },
    { name: 'Craftsmanship', id: 'craftsmanship' },
    { name: 'Comparison', id: 'comparison' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'About', id: 'about' },
    { name: 'Gallery', id: 'gallery' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    if (onNavClick) {
      onNavClick(id);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'glassmorphism shadow-[0_4px_32px_rgba(0,0,0,0.01)] py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center space-x-2 text-black font-display font-bold tracking-[0.25em] text-lg outline-none hover:opacity-80 transition-opacity focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            <span>FALCON 7</span>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="relative text-xs tracking-widest uppercase text-luxury-support hover:text-black font-medium transition-colors duration-200 py-1 group outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Call to Action Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => handleLinkClick('collection')}
              className="px-4 py-3 bg-black text-white hover:bg-luxury-hover text-xs font-semibold tracking-wider uppercase transition-all duration-200 outline-none flex items-center gap-2 group border border-black focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-black hover:opacity-75 transition-opacity outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-transform duration-500 ease-in-out lg:hidden flex flex-col justify-between p-8 pt-24 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col space-y-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="text-left text-2xl font-display font-light tracking-wide text-black hover:translate-x-2 transition-transform duration-200 outline-none focus-visible:ring-2 focus-visible:ring-black rounded p-1"
            >
              {link.name}
            </button>
          ))}
        </nav>
        
        <div className="border-t border-luxury-silver pt-8 flex flex-col space-y-4">
          <p className="text-xs text-luxury-support tracking-widest uppercase font-semibold">
            Falcon 7 Flagship Experience
          </p>
          <button
            onClick={() => handleLinkClick('collection')}
            className="w-full py-4 bg-black text-white hover:bg-luxury-hover text-center text-sm font-semibold tracking-widest uppercase transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            Explore Collection
          </button>
        </div>
      </div>
    </>
  );
}
