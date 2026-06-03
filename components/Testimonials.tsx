'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
  type: 'Athlete' | 'Creator' | 'Entrepreneur' | 'Medical';
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Marcus Vance',
    role: 'Champion Ultra-Marathoner',
    quote: 'The Falcon 7 Runner Pro completely changed my recovery times. The energy return foam is noticeable at mile 20. It feels like you are being propelled forward.',
    rating: 5,
    type: 'Athlete',
  },
  {
    id: 2,
    name: 'Serena Thorne',
    role: 'Creative Director & Fashion Critic',
    quote: 'Sneakers rarely combine elite engineering with structural elegance. The Falcon 7 Elite matches my high-fashion silhouettes while offering incredible daily comfort.',
    rating: 5,
    type: 'Creator',
  },
  {
    id: 3,
    name: 'Leo Zhang',
    role: 'Venture Capitalist & Tech Founder',
    quote: 'In tech and business, focus is everything. The Urban X shoe gives me that clean, premium Porsche aesthetic for investor meetings and all-day city walks alike.',
    rating: 5,
    type: 'Entrepreneur',
  },
  {
    id: 4,
    name: 'Dr. Elena Rostova',
    role: 'Professor of Biomechanics & Podiatrist',
    quote: 'From a clinical standpoint, the structural carbon fiber plate distributes foot pressures beautifully, minimizing strain on the plantar fascia. Highly recommended.',
    rating: 5,
    type: 'Medical',
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  return (
    <section id="testimonials" className="w-full bg-[#F8F8F8] py-24 md:py-32 flex flex-col justify-center items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 text-left">
            <span className="text-[10px] tracking-[0.4em] uppercase text-luxury-support font-semibold">
              Global Perspectives
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-light tracking-tight text-black">
              Trusted by the Elite
            </h2>
            <p className="text-sm md:text-base text-luxury-support max-w-xl font-light">
              Athletes, designers, and medical professionals explain why Falcon 7 is their footwear of choice.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex space-x-2">
            <button
              onClick={handlePrev}
              className="p-3.5 border border-luxury-silver rounded-full bg-white text-black hover:bg-neutral-50 transition-all duration-300 outline-none flex items-center justify-center"
              aria-label="Previous Review"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-3.5 border border-luxury-silver rounded-full bg-white text-black hover:bg-neutral-50 transition-all duration-300 outline-none flex items-center justify-center"
              aria-label="Next Review"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Slider Card */}
        <div className="relative w-full">
          <div className="overflow-hidden rounded-3xl border border-luxury-silver bg-white shadow-sm">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {TESTIMONIALS.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full shrink-0 p-8 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  {/* Left Column: Big visual details */}
                  <div className="lg:col-span-4 space-y-4">
                    <span className="inline-block text-[9px] tracking-widest text-black bg-luxury-silver px-3 py-1.5 rounded-full uppercase font-mono font-bold">
                      {testimonial.type} Review
                    </span>

                    <div className="flex text-black space-x-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-black" />
                      ))}
                    </div>

                    <div>
                      <h4 className="text-xl font-display font-medium text-black">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-luxury-support font-light mt-1">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Quote */}
                  <div className="lg:col-span-8 flex items-start">
                    <span className="text-6xl font-serif text-neutral-200 select-none mr-4 leading-[0.5] -mt-2">
                      &ldquo;
                    </span>
                    <p className="text-base md:text-xl font-display font-light text-black leading-relaxed">
                      {testimonial.quote}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-[3px] rounded-full transition-all duration-300 outline-none ${
                  activeIndex === idx ? 'w-8 bg-black' : 'w-2 bg-neutral-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
