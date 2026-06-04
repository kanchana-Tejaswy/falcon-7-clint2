'use client';

import React from 'react';
import { Check, X, Shield, Star, Award } from 'lucide-react';

interface CompareMetric {
  name: string;
  falcon: string | React.ReactNode;
  competitor: string | React.ReactNode;
  standard: string | React.ReactNode;
}

export default function Comparison() {
  const metrics: CompareMetric[] = [
    {
      name: 'Weight',
      falcon: <span className="font-bold text-white">240g (Ultra-Lightweight)</span>,
      competitor: '310g (Average)',
      standard: '360g (Heavy)',
    },
    {
      name: 'Energy Return',
      falcon: <span className="font-bold text-white">88% (Nitrogen Foam)</span>,
      competitor: '72% (Standard EVA)',
      standard: '55% (Basic Poly)',
    },
    {
      name: 'Chassis System',
      falcon: <span className="font-bold text-white">Full 3D Carbon Plate</span>,
      competitor: 'Shank Plate (TPU Only)',
      standard: 'No Plate Support',
    },
    {
      name: 'Cushioning Tech',
      falcon: <span className="font-bold text-white">Aero-Channels & AirFlow</span>,
      competitor: 'Gel/Gel-pads',
      standard: 'Standard Foam Padding',
    },
    {
      name: 'Durability Rating',
      falcon: <span className="font-bold text-white">1000+ Miles (AeroGrid Tech)</span>,
      competitor: '450 Miles',
      standard: '300 Miles',
    },
    {
      name: 'Comfort Level',
      falcon: (
        <span className="flex items-center justify-center gap-1.5 font-bold text-[#ff6b4a]">
          <Star className="w-3.5 h-3.5 fill-[#ff6b4a] text-[#ff6b4a]" /> 9.9/10
        </span>
      ),
      competitor: '8.4/10',
      standard: '7.0/10',
    },
    {
      name: 'Support & Stability',
      falcon: <Check className="w-4 h-4 text-[#ff6b4a] mx-auto stroke-[2.5]" />,
      competitor: <Check className="w-4 h-4 text-neutral-500 mx-auto" />,
      standard: <X className="w-4 h-4 text-neutral-700 mx-auto" />,
    },
    {
      name: 'Adaptive Grip',
      falcon: <Check className="w-4 h-4 text-[#ff6b4a] mx-auto stroke-[2.5]" />,
      competitor: <Check className="w-4 h-4 text-neutral-500 mx-auto" />,
      standard: <X className="w-4 h-4 text-neutral-700 mx-auto" />,
    },
  ];

  return (
    <section id="comparison" className="w-full bg-[#030303] py-24 md:py-32 flex flex-col justify-center items-center overflow-hidden relative border-t border-white/5 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <span className="text-[9px] tracking-[0.4em] uppercase text-[#ff6b4a] font-bold">
            Comparative Analysis
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-light tracking-tight text-white">
            The Competitive Edge
          </h2>
          <p className="text-sm md:text-base text-neutral-400 max-w-xl mx-auto font-light leading-relaxed">
            We put Falcon 7 to the test against leading premium models and standard athletic footwear. The performance metrics speak for themselves.
          </p>
        </div>

        {/* Spec Matrix Table */}
        <div className="w-full border border-white/10 rounded-3xl overflow-hidden shadow-2xl bg-[#0b0b0d]">
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-[#0e0e11]/80 backdrop-blur-md">
                  <th className="p-6 text-left text-[9px] tracking-widest text-neutral-500 uppercase font-bold w-1/4">
                    Performance Specs
                  </th>
                  <th className="p-6 text-[10px] tracking-widest text-[#ff6b4a] uppercase font-bold w-1/4 bg-[#ff6b4a]/5 relative">
                    <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#ff6b4a]" />
                    <span className="flex items-center justify-center gap-2">
                      <Award className="w-4 h-4 text-[#ff6b4a]" /> FALCON 7
                    </span>
                  </th>
                  <th className="p-6 text-[9px] tracking-widest text-neutral-400 uppercase font-bold w-1/4">
                    Premium Competitor
                  </th>
                  <th className="p-6 text-[9px] tracking-widest text-neutral-500 uppercase font-bold w-1/4">
                    Standard Shoe
                  </th>
                </tr>
              </thead>
              <tbody>
                {metrics.map((metric, idx) => (
                  <tr 
                    key={idx} 
                    className={`border-b border-white/5 transition-colors duration-150 hover:bg-white/[0.015] ${
                      idx === metrics.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="p-6 text-left text-xs font-bold uppercase tracking-wider text-white">
                      {metric.name}
                    </td>
                    <td className="p-6 text-xs bg-[#ff6b4a]/[0.02] border-l border-r border-white/10">
                      {metric.falcon}
                    </td>
                    <td className="p-6 text-xs text-neutral-400 font-light">
                      {metric.competitor}
                    </td>
                    <td className="p-6 text-xs text-neutral-500 font-light">
                      {metric.standard}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          <div className="border border-white/10 p-8 rounded-3xl flex items-start gap-4 shadow-2xl bg-[#0b0b0d]">
            <div className="p-3 bg-white text-black rounded-2xl flex-shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                AeroGrid Lifetime Guarantee
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Falcon 7 materials are engineered to maintain mechanical spring properties twice as long as traditional foam compounds, backed by a 2-year performance replacement guarantee.
              </p>
            </div>
          </div>

          <div className="border border-white/10 p-8 rounded-3xl flex items-start gap-4 shadow-2xl bg-[#0b0b0d]">
            <div className="p-3 bg-white text-black rounded-2xl flex-shrink-0">
              <Star className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Biomechanically Validated
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Independently tested by human performance research institutes, Falcon 7 reduces heel fatigue by up to 28% compared to standard polyurethane cushion cores.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
