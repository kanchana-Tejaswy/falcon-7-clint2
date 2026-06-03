'use client';

import React from 'react';
import { Compass, Flame, ShieldAlert, Heart } from 'lucide-react';

interface Pillar {
  number: string;
  title: string;
  tagline: string;
  description: string;
}

const PILLARS: Pillar[] = [
  {
    number: '01',
    title: 'Precision Engineering',
    tagline: 'Form follows speed',
    description: 'We approach sneaker design like aerospace architecture. Every curve, knit pattern, and sole density is simulated in wind tunnels and computational models to minimize weight and eliminate drag.',
  },
  {
    number: '02',
    title: 'Sustainably Synthesized',
    tagline: '100% Recycled AeroGrid weaves',
    description: 'Performance does not require sacrifice. The signature Falcon upper is composed entirely of synthetic fibers reclaimed from ocean plastics, offering superior strength and flexibility while shrinking our carbon footprint.',
  },
  {
    number: '03',
    title: 'Individual Customization',
    tagline: 'Tuned carbon plates',
    description: 'We believe athletes move differently. Every series of Falcon sneakers features carbon plates optimized for specific torque ratings, balancing foot support with forward-spring velocity depending on usage.',
  },
];

export default function About() {
  return (
    <section id="about" className="w-full bg-white py-24 md:py-32 flex flex-col justify-center items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full space-y-20">
        
        {/* Story Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] tracking-[0.4em] uppercase text-luxury-support font-semibold">
              The Brand Manifesto
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-light tracking-tight text-black leading-tight">
              Crafting the Future of Movement
            </h2>
          </div>
          <div className="lg:col-span-7 pt-2 lg:pt-8">
            <p className="text-base md:text-lg font-light text-luxury-support leading-relaxed max-w-2xl">
              Falcon 7 was founded with a singular, uncompromising vision: to build performance footwear that feels like a luxury supercar. By discarding template layouts and standard manufacturing foam, we engineer responsive interfaces for the human body. Every pair represents hours of wind tunnel tests, robotic precision, and artisanal hand-trimming.
            </p>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 border-t border-luxury-silver pt-16">
          {PILLARS.map((pillar, idx) => (
            <div key={idx} className="space-y-6 group">
              <span className="block text-5xl md:text-6xl font-display font-extralight text-neutral-200 group-hover:text-black transition-colors duration-350">
                {pillar.number}
              </span>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold tracking-wider uppercase font-display text-black">
                  {pillar.title}
                </h3>
                <p className="text-[10px] uppercase tracking-wider text-luxury-support font-medium">
                  {pillar.tagline}
                </p>
              </div>
              <p className="text-xs font-light text-luxury-support leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Brand Quote Card */}
        <div className="w-full border border-luxury-silver rounded-3xl p-8 md:p-16 flex flex-col justify-center items-center text-center space-y-6 bg-neutral-50/20 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-luxury-support font-semibold">
            Our Core Mission
          </p>
          <p className="text-2xl md:text-3xl font-display font-light text-black max-w-3xl leading-snug">
            &ldquo;Falcon 7 is not just selling footwear. We sell confidence, momentum, and identity. We build for those who move differently.&rdquo;
          </p>
          <div className="w-8 h-[1px] bg-black" />
          <p className="text-[10px] uppercase tracking-widest text-black font-semibold">
            The Falcon Design Studio, Munich
          </p>
        </div>

      </div>
    </section>
  );
}
