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
        className={`fixed z-50 transition-all duration-500 ease-out ${
          scrolled
            ? 'top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl glassmorphism py-3 px-6 rounded-full border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]'
            : 'top-0 left-0 w-full bg-transparent py-6 px-6 md:px-12'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
          {/* Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center space-x-2 text-white font-display font-bold tracking-[0.3em] text-sm md:text-base outline-none hover:opacity-80 transition-opacity focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
          >
            <span>FALCON 7</span>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="relative text-[10px] tracking-[0.2em] uppercase text-neutral-400 hover:text-white font-semibold transition-colors duration-200 py-1 group outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 rounded"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#ff6b4a] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Call to Action Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => handleLinkClick('collection')}
              className="px-5 py-2.5 bg-white text-black hover:bg-neutral-200 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 outline-none flex items-center gap-2 group border border-white rounded-full focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 shadow-lg shadow-white/5"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white hover:opacity-75 transition-opacity outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 rounded"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-45 bg-[#030303]/98 backdrop-blur-2xl transition-transform duration-500 ease-in-out lg:hidden flex flex-col justify-between p-8 pt-28 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col space-y-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="text-left text-2xl font-display font-light tracking-wide text-white hover:translate-x-2 transition-transform duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white rounded p-1"
            >
              {link.name}
            </button>
          ))}
        </nav>
        
        <div className="border-t border-white/10 pt-8 flex flex-col space-y-4">
          <p className="text-[10px] text-neutral-400 tracking-[0.25em] uppercase font-bold">
            Falcon 7 Flagship Experience
          </p>
          <button
            onClick={() => handleLinkClick('collection')}
            className="w-full py-3.5 bg-white text-black hover:bg-neutral-200 rounded-full text-center text-xs font-bold tracking-widest uppercase transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white shadow-lg shadow-white/5"
          >
            Explore Collection
          </button>
        </div>
      </div>
    </>
  );
}
