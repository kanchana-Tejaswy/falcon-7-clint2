'use client';

import React, { useState } from 'react';
import { ArrowRight, Mail, Shield, Check, Loader, AlertCircle } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Simple validation check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    // Simulate luxury API subscription call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  const columns = [
    {
      title: 'Company',
      links: ['About Falcon 7', 'Innovation Labs', 'Sustainability Manifesto', 'Munich Design Studio', 'Press Kit'],
    },
    {
      title: 'Products',
      links: ['Falcon 7 Air', 'Falcon 7 Vector', 'Falcon 7 Phantom', 'Falcon 7 Elite', 'Runner Pro', 'Urban X'],
    },
    {
      title: 'Technology',
      links: ['AirFlow Knit Mesh', 'Nitrogen Foam Cushioning', 'Carbon Stability Plate', 'Impact Shield Dispersion', 'Custom Torque Tuning'],
    },
    {
      title: 'Support',
      links: ['Find a Flagship Store', 'Performance Guarantee', 'Product Care & Wash', 'Order Track & Returns', 'Contact Specialist'],
    },
  ];

  return (
    <footer className="w-full bg-[#030303] border-t border-white/5 pt-24 pb-12 overflow-hidden relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16 relative z-10">
        
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Brand and Newsletter Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <span className="text-white font-display font-bold tracking-[0.25em] text-lg uppercase select-none">
                FALCON 7
              </span>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-sm font-light">
                Engineering responsive interfaces for human acceleration. Fully designed in Munich, Germany, and tested on tracks globally.
              </p>
            </div>

            {/* Newsletter input */}
            <form onSubmit={handleSubmit} className="space-y-3.5 max-w-md">
              <label htmlFor="newsletter-email" className="block text-[9px] uppercase tracking-widest text-[#ff6b4a] font-bold">
                Subscribe to private releases
              </label>
              <div className="relative flex items-center border border-white/10 rounded-2xl overflow-hidden focus-within:border-white/30 transition-all duration-300 bg-[#0b0b0d] shadow-lg">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-4" aria-hidden="true" />
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  disabled={status === 'loading'}
                  placeholder="Enter email address"
                  className="w-full pl-12 pr-12 py-3.5 bg-transparent text-xs text-white outline-none placeholder:text-neutral-500 font-light focus-visible:ring-1 focus-visible:ring-white rounded-xl"
                  required
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="p-2.5 bg-white text-black hover:bg-neutral-200 disabled:bg-neutral-800 transition-all absolute right-1.5 rounded-xl flex items-center justify-center outline-none cursor-pointer"
                  aria-label="Subscribe to newsletter"
                >
                  {status === 'loading' ? (
                    <Loader className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-black" />
                  )}
                </button>
              </div>

              {/* Status and error feedback */}
              {status === 'success' && (
                <p className="text-[10px] text-[#ff6b4a] font-bold flex items-center gap-1.5 animate-fade-in">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" /> Subscription confirmed. Welcome to Falcon 7.
                </p>
              )}
              {status === 'error' && (
                <p className="text-[10px] text-red-500 font-bold flex items-center gap-1.5 animate-fade-in">
                  <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" /> {errorMessage}
                </p>
              )}
            </form>
          </div>

          {/* Links Column Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {columns.map((col, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="text-[9px] uppercase tracking-widest text-white font-bold">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="text-xs text-neutral-400 hover:text-white transition-colors font-light focus-visible:ring-2 focus-visible:ring-white rounded p-0.5 outline-none"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Lower footer branding */}
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-[9px] tracking-wider text-neutral-400 uppercase font-medium">
            <span>© {new Date().getFullYear()} FALCON 7 STUDIOS</span>
            <span className="hidden sm:inline" aria-hidden="true">|</span>
            <a href="#" className="hover:text-white focus-visible:ring-2 focus-visible:ring-white rounded p-0.5 outline-none">Privacy Policy</a>
            <a href="#" className="hover:text-white focus-visible:ring-2 focus-visible:ring-white rounded p-0.5 outline-none">Terms of Sale</a>
            <a href="#" className="hover:text-white focus-visible:ring-2 focus-visible:ring-white rounded p-0.5 outline-none">Corporate Info</a>
          </div>

          <div className="flex items-center gap-2 text-[9px] text-neutral-400 font-semibold uppercase tracking-wider bg-[#0b0b0d] border border-white/10 px-4 py-2 rounded-full select-none shadow-lg">
            <Shield className="w-3.5 h-3.5 text-[#ff6b4a]" aria-hidden="true" /> Fully Secure Luxury Checkout
          </div>
        </div>

      </div>
    </footer>
  );
}
