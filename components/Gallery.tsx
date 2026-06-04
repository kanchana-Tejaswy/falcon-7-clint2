'use client';

import React from 'react';
import Image from 'next/image';

interface GalleryItem {
  id: number;
  src: string;
  category: string;
  title: string;
  description: string;
  layoutClass: string;
}

const ITEMS: GalleryItem[] = [
  {
    id: 1,
    src: '/sneaker_editorial_1.png',
    category: 'Studio Portrait',
    title: 'Pure White Silhouette',
    description: 'Precision engineered contours floating under multi-angled soft diffusion rigs.',
    layoutClass: 'h-[360px] md:h-[480px] lg:col-span-4',
  },
  {
    id: 2,
    src: '/sneaker_editorial_2.png',
    category: 'Urban Environment',
    title: 'Concrete Vector',
    description: 'Stiff carbon chassis tested on raw architectural concrete structures.',
    layoutClass: 'h-[360px] md:h-[480px] lg:col-span-8',
  },
  {
    id: 3,
    src: '/sneaker_editorial_3.png',
    category: 'Macro Engineering',
    title: 'AeroGrid Matrix Detail',
    description: 'Extreme close-up of woven recycled synthetic fibers and heat-bonded thermoplastic overlays.',
    layoutClass: 'h-[240px] md:h-[360px] lg:col-span-12',
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="w-full bg-[#070708] py-24 md:py-32 flex flex-col justify-center items-center overflow-hidden relative border-t border-white/5 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center md:text-left space-y-4">
          <span className="text-[9px] tracking-[0.4em] uppercase text-[#ff6b4a] font-bold">
            Editorial Lookbook
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-light tracking-tight text-white animate-fade-in">
            Falcon 7 in the Wild
          </h2>
          <p className="text-sm md:text-base text-neutral-400 max-w-xl font-light leading-relaxed">
            An editorial inspection of material chemistry, form composition, and architectural movement.
          </p>
        </div>

        {/* Masonry-style Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {ITEMS.map((item) => (
            <div 
              key={item.id} 
              className={`relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0d] group shadow-2xl transition-all duration-500 hover:border-white/20 ${item.layoutClass}`}
            >
              {/* Image Container taking 100% height of parent */}
              <div className="relative w-full h-full">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-w-1024px) 100vw, 50vw"
                  priority={item.id === 1}
                />
                
                {/* Clean luxury gradient cover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Details layout */}
                <div className="absolute bottom-0 left-0 w-full p-8 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex flex-col space-y-2 pointer-events-none z-10">
                  <span className="text-[9px] tracking-widest uppercase font-mono font-bold text-[#ff6b4a]">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-display font-light tracking-wide text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs font-light text-neutral-300 max-w-md">
                    {item.description}
                  </p>
                </div>

                {/* Subtle static label (disappears on hover) */}
                <div className="absolute top-6 right-6 bg-[#0e0e11]/85 border border-white/10 px-4 py-2 rounded-full text-[8px] tracking-widest text-[#ff6b4a] uppercase font-bold group-hover:opacity-0 transition-opacity duration-300 select-none pointer-events-none z-10">
                  {item.category}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
