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
      links: ['Falcon 7 Air', 'Falcon 7 Velocity', 'Falcon 7 Phantom', 'Falcon 7 Elite', 'Runner Pro', 'Urban X'],
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
    <footer className="w-full bg-white border-t border-luxury-silver pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Brand and Newsletter Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <span className="text-black font-display font-bold tracking-[0.25em] text-lg uppercase">
                FALCON 7
              </span>
              <p className="text-xs text-luxury-support leading-relaxed max-w-sm font-light">
                Engineering responsive interfaces for human acceleration. Fully designed in Munich, Germany, and tested on tracks globally.
              </p>
            </div>

            {/* Newsletter input */}
            <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
              <label htmlFor="newsletter-email" className="block text-[9px] uppercase tracking-widest text-luxury-support font-semibold">
                Subscribe to private releases
              </label>
              <div className="relative flex items-center border border-luxury-silver rounded-xl overflow-hidden focus-within:border-black transition-colors duration-200 bg-neutral-50/50">
                <Mail className="w-4 h-4 text-luxury-support absolute left-4" aria-hidden="true" />
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
                  className="w-full pl-12 pr-12 py-3.5 bg-transparent text-xs text-black outline-none placeholder:text-neutral-400 font-light focus-visible:ring-1 focus-visible:ring-black rounded-xl"
                  required
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="p-3 bg-black text-white hover:bg-luxury-hover disabled:bg-neutral-400 transition-colors absolute right-1.5 rounded-lg flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-black"
                  aria-label="Subscribe to newsletter"
                >
                  {status === 'loading' ? (
                    <Loader className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Status and error feedback */}
              {status === 'success' && (
                <p className="text-[10px] text-black font-semibold flex items-center gap-1.5 animate-fade-in">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" /> Subscription confirmed. Welcome to Falcon 7.
                </p>
              )}
              {status === 'error' && (
                <p className="text-[10px] text-red-600 font-semibold flex items-center gap-1.5 animate-fade-in">
                  <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" /> {errorMessage}
                </p>
              )}
            </form>
          </div>

          {/* Links Column Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {columns.map((col, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-widest text-black font-bold">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="text-xs text-luxury-support hover:text-black transition-colors font-light focus-visible:ring-2 focus-visible:ring-black rounded p-0.5 outline-none"
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
        <div className="border-t border-luxury-silver pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-6 text-[10px] tracking-wider text-luxury-support uppercase font-medium">
            <span>© {new Date().getFullYear()} FALCON 7 STUDIOS</span>
            <span className="hidden sm:inline" aria-hidden="true">|</span>
            <a href="#" className="hover:text-black focus-visible:ring-2 focus-visible:ring-black rounded p-0.5 outline-none">Privacy Policy</a>
            <a href="#" className="hover:text-black focus-visible:ring-2 focus-visible:ring-black rounded p-0.5 outline-none">Terms of Sale</a>
            <a href="#" className="hover:text-black focus-visible:ring-2 focus-visible:ring-black rounded p-0.5 outline-none">Corporate Info</a>
          </div>

          <div className="flex items-center gap-2 text-[9px] text-luxury-support font-semibold uppercase tracking-wider glassmorphism px-4 py-2 rounded-full border border-luxury-silver/40 select-none">
            <Shield className="w-3.5 h-3.5 text-black" aria-hidden="true" /> Fully Secure Luxury Checkout
          </div>
        </div>

      </div>
    </footer>
  );
}
