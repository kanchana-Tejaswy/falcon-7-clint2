'use client';

import React from 'react';
import { Check, X, Shield, Star, Award } from 'lucide-react';

interface CompareMetric {
  name: string;
  falcon: string | React.ReactNode;
  competitor: string | React.ReactNode;
  standard: string | React.ReactNode;
  highlighted?: boolean;
}

export default function Comparison() {
  const metrics: CompareMetric[] = [
    {
      name: 'Weight',
      falcon: <span className="font-semibold text-black">240g (Ultra-Lightweight)</span>,
      competitor: '310g (Average)',
      standard: '360g (Heavy)',
    },
    {
      name: 'Energy Return',
      falcon: <span className="font-semibold text-black">88% (Nitrogen Foam)</span>,
      competitor: '72% (Standard EVA)',
      standard: '55% (Basic Poly)',
    },
    {
      name: 'Chassis System',
      falcon: <span className="font-semibold text-black">Full 3D Carbon Plate</span>,
      competitor: 'Shank Plate (TPU Only)',
      standard: 'No Plate Support',
    },
    {
      name: 'Cushioning Tech',
      falcon: <span className="font-semibold text-black">Aero-Channels & AirFlow</span>,
      competitor: 'Gel/Gel-pads',
      standard: 'Standard Foam Padding',
    },
    {
      name: 'Durability Rating',
      falcon: <span className="font-semibold text-black">1000+ Miles (AeroGrid Tech)</span>,
      competitor: '450 Miles',
      standard: '300 Miles',
    },
    {
      name: 'Comfort Level',
      falcon: (
        <span className="flex items-center justify-center gap-1 font-semibold text-black">
          <Star className="w-3.5 h-3.5 fill-black text-black" /> 9.9/10
        </span>
      ),
      competitor: '8.4/10',
      standard: '7.0/10',
    },
    {
      name: 'Support & Stability',
      falcon: <Check className="w-4 h-4 text-black mx-auto stroke-[2.5]" />,
      competitor: <Check className="w-4 h-4 text-neutral-400 mx-auto" />,
      standard: <X className="w-4 h-4 text-neutral-300 mx-auto" />,
    },
    {
      name: 'Adaptive Grip',
      falcon: <Check className="w-4 h-4 text-black mx-auto stroke-[2.5]" />,
      competitor: <Check className="w-4 h-4 text-neutral-400 mx-auto" />,
      standard: <X className="w-4 h-4 text-neutral-300 mx-auto" />,
    },
  ];

  return (
    <section id="comparison" className="w-full bg-white py-24 md:py-32 flex flex-col justify-center items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <span className="text-[10px] tracking-[0.4em] uppercase text-luxury-support font-semibold">
            Comparative Analysis
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-light tracking-tight text-black">
            The Competitive Edge
          </h2>
          <p className="text-sm md:text-base text-luxury-support max-w-xl mx-auto font-light">
            We put Falcon 7 to the test against leading premium models and standard athletic footwear. The performance metrics speak for themselves.
          </p>
        </div>

        {/* Spec Matrix Table */}
        <div className="w-full border border-luxury-silver rounded-2xl overflow-hidden shadow-sm bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="border-b border-luxury-silver bg-neutral-50/50">
                  <th className="p-6 text-left text-[10px] tracking-widest text-luxury-support uppercase font-semibold w-1/4">
                    Performance Specs
                  </th>
                  <th className="p-6 text-[10px] tracking-widest text-black uppercase font-bold w-1/4 bg-white relative">
                    <div className="absolute -top-[1px] left-0 right-0 h-[2px] bg-black" />
                    <span className="flex items-center justify-center gap-1.5">
                      <Award className="w-4 h-4" /> FALCON 7
                    </span>
                  </th>
                  <th className="p-6 text-[10px] tracking-widest text-luxury-support uppercase font-semibold w-1/4">
                    Premium Competitor
                  </th>
                  <th className="p-6 text-[10px] tracking-widest text-luxury-support uppercase font-semibold w-1/4">
                    Standard Shoe
                  </th>
                </tr>
              </thead>
              <tbody>
                {metrics.map((metric, idx) => (
                  <tr 
                    key={idx} 
                    className={`border-b border-luxury-silver transition-colors duration-150 hover:bg-neutral-50/30 ${
                      idx === metrics.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="p-6 text-left text-xs font-semibold uppercase tracking-wider text-black">
                      {metric.name}
                    </td>
                    <td className="p-6 text-xs bg-neutral-50/20 font-medium border-l border-r border-luxury-silver/60">
                      {metric.falcon}
                    </td>
                    <td className="p-6 text-xs text-luxury-support font-light">
                      {metric.competitor}
                    </td>
                    <td className="p-6 text-xs text-luxury-support font-light">
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
          <div className="border border-luxury-silver p-8 rounded-2xl flex items-start gap-4 shadow-sm bg-neutral-50/20">
            <div className="p-3 bg-black text-white rounded-xl">
              <Shield className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-black">
                AeroGrid Lifetime Guarantee
              </h4>
              <p className="text-xs text-luxury-support leading-relaxed font-light">
                Falcon 7 materials are engineered to maintain mechanical spring properties twice as long as traditional foam compounds, backed by a 2-year performance replacement guarantee.
              </p>
            </div>
          </div>

          <div className="border border-luxury-silver p-8 rounded-2xl flex items-start gap-4 shadow-sm bg-neutral-50/20">
            <div className="p-3 bg-black text-white rounded-xl">
              <Star className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-black">
                Biomechanically Validated
              </h4>
              <p className="text-xs text-luxury-support leading-relaxed font-light">
                Independently tested by human performance research institutes, Falcon 7 reduces heel fatigue by up to 28% compared to standard polyurethane cushion cores.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
