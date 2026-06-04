'use client';

import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { Info, Maximize2, Zap, Shield, Sparkles, RefreshCw, Loader, Star } from 'lucide-react';
import ShoeModel from './ShoeModel';
import { SHOES, ShoeData } from '../data/products';

interface ProductShowcaseProps {
  activeShoeId?: string;
}

export default function ProductShowcase({ activeShoeId }: ProductShowcaseProps) {
  const [activeShoe, setActiveShoe] = useState<ShoeData>(SHOES[0]);
  const [zoom, setZoom] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [canvasLoading, setCanvasLoading] = useState(true);
  const [keyOffset, setKeyOffset] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeShoeId) {
      const foundShoe = SHOES.find(s => s.id === activeShoeId);
      if (foundShoe) {
        setCanvasLoading(true);
        setActiveShoe(foundShoe);
        setKeyOffset(prev => prev + 1);
      }
    }
  }, [activeShoeId]);

  const handleShoeChange = (shoe: ShoeData) => {
    setCanvasLoading(true);
    setActiveShoe(shoe);
    setKeyOffset(prev => prev + 1);
  };

  const handleKeyPress = (e: React.KeyboardEvent, shoe: ShoeData) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleShoeChange(shoe);
    }
  };

  // Map each shoe to a sleek luxury color gradient glow
  const glowColors = {
    air: 'rgba(255, 255, 255, 0.05)',
    velocity: 'rgba(245, 158, 11, 0.06)',
    phantom: 'rgba(139, 92, 246, 0.06)',
    elite: 'rgba(212, 175, 55, 0.08)',
    runner: 'rgba(59, 130, 246, 0.08)',
    urban: 'rgba(239, 68, 68, 0.06)'
  };
  const activeGlow = glowColors[activeShoe.id as keyof typeof glowColors] || 'rgba(255, 255, 255, 0.05)';

  return (
    <section id="collection" className="w-full min-h-screen bg-[#070708] py-24 md:py-32 flex flex-col justify-center items-center overflow-hidden relative border-t border-white/5 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full space-y-16 relative z-10">
        
        {/* Header Block */}
        <div className="text-center md:text-left space-y-4">
          <span className="text-[9px] tracking-[0.4em] uppercase text-[#ff6b4a] font-bold">
            Interactive Showroom
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-light tracking-tight text-white">
            The Falcon 7 Collection
          </h2>
          <p className="text-sm md:text-base text-neutral-400 max-w-xl font-light leading-relaxed">
            Select a silhouette to open the high-fidelity 3D inspection module. Rotate, zoom, and inspect material engineering.
          </p>
        </div>

        {/* Dynamic Split Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Block: 3D Interactive Showroom */}
          <div className="lg:col-span-7 bg-[#0b0b0d] border border-white/10 rounded-3xl relative flex flex-col justify-between overflow-hidden shadow-2xl min-h-[500px]">
            
            {/* Dynamic Ambient Blur Backdrop */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full blur-[90px] pointer-events-none opacity-50 transition-all duration-1000 z-0"
              style={{
                background: `radial-gradient(circle, ${activeGlow} 0%, transparent 70%)`
              }}
            />

            {/* Top Toolbar */}
            <div className="p-6 flex justify-between items-center z-10">
              <div>
                <span className="text-[9px] tracking-widest text-neutral-500 uppercase font-semibold">
                  Silhouette Inspector
                </span>
                <h3 className="text-lg font-display font-medium text-white mt-1">
                  {activeShoe.name}
                </h3>
              </div>

              {/* View options */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setZoom(!zoom)}
                  className={`p-2 rounded-full border transition-all duration-350 flex items-center justify-center outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                    zoom 
                      ? 'bg-white border-white text-black' 
                      : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  }`}
                  title="Toggle Zoom"
                  aria-label="Toggle zoom view"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setKeyOffset(prev => prev + 1)}
                  className="p-2 rounded-full border bg-white/5 border-white/10 text-white hover:bg-white/10 transition-all duration-350 flex items-center justify-center outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  title="Reset View"
                  aria-label="Reset 3D camera"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* R3F Interactive Canvas with Skeleton Loader Fallback */}
            <div className="absolute inset-0 top-16 bottom-20 flex items-center justify-center">
              {(!mounted || canvasLoading) && (
                <div className="absolute inset-0 bg-[#0b0b0d]/50 flex flex-col items-center justify-center space-y-4 z-20 animate-pulse">
                  <Loader className="w-6 h-6 text-white animate-spin" />
                  <span className="text-[9px] tracking-widest text-neutral-400 uppercase font-semibold">
                    Initializing 3D Showroom...
                  </span>
                </div>
              )}

              {mounted && (
                <div className="w-full h-full relative">
                  <Canvas
                    key={keyOffset}
                    shadows
                    camera={{ position: [0, 0.1, zoom ? 1.5 : 2.2], fov: 45 }}
                    onCreated={() => setCanvasLoading(false)}
                    className="w-full h-full cursor-grab active:cursor-grabbing"
                  >
                    <ambientLight intensity={1.3} />
                    <directionalLight position={[3, 8, 3]} intensity={1.8} castShadow shadow-bias={-0.0001} />
                    <directionalLight position={[-3, 8, -3]} intensity={0.5} />
                    <pointLight position={[0, -2, 2]} intensity={0.5} />
                    <spotLight position={[0, 4, 0]} intensity={1.2} penumbra={1} castShadow />

                    <group scale={[0.65, 0.65, 0.65]}>
                      <ShoeModel colorway={activeShoe.id} activeSection="showcase" />
                    </group>

                    <ContactShadows
                      position={[0, -0.65, 0]}
                      opacity={0.4}
                      scale={2.6}
                      blur={1.4}
                      far={1.4}
                    />

                    <OrbitControls
                      enableZoom={true}
                      maxDistance={3.5}
                      minDistance={1.2}
                      enablePan={false}
                      autoRotate={!zoom}
                      autoRotateSpeed={0.8}
                    />
                  </Canvas>
                </div>
              )}
            </div>

            {/* Bottom Details Footer inside the Inspector */}
            <div className="p-6 border-t border-white/10 bg-[#0e0e11]/80 backdrop-blur-md z-10 flex flex-wrap gap-x-6 gap-y-2 justify-between items-center">
              <span className="text-[9px] tracking-widest text-neutral-400 uppercase font-semibold flex items-center gap-1.5 select-none">
                <Info className="w-3.5 h-3.5 text-[#ff6b4a]" /> Hold and drag to spin 360°
              </span>

              <div className="flex space-x-6">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-medium">Performance Score</span>
                  <p className="text-sm font-semibold font-display text-white">{activeShoe.perfScore}/10</p>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-medium">Comfort Rating</span>
                  <p className="text-sm font-semibold font-display text-white">{activeShoe.comfortRating}/10</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: Silhouette Selector and Specs */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            {/* Scrollable list of Silhouettes with Scroll Gradient Fade */}
            <div className="relative group/list">
              {/* Fade out top */}
              <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-[#070708] to-transparent pointer-events-none z-10 opacity-80" />
              
              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-2 custom-scroll scroll-smooth pt-2 pb-4 no-scrollbar">
                {SHOES.map((shoe) => {
                  const isActive = activeShoe.id === shoe.id;
                  
                  // Dynamic shoe theme colors
                  const shoeColor = {
                    air: '#ffffff',
                    velocity: '#fbbf24',
                    phantom: '#a78bfa',
                    elite: '#eab308',
                    runner: '#3b82f6',
                    urban: '#ef4444'
                  }[shoe.id] || '#ffffff';

                  return (
                    <div
                      key={shoe.id}
                      onClick={() => handleShoeChange(shoe)}
                      onKeyDown={(e) => handleKeyPress(e, shoe)}
                      role="button"
                      tabIndex={0}
                      className={`w-full p-4 border rounded-2xl flex items-center justify-between text-left cursor-pointer transition-all duration-300 outline-none relative overflow-hidden group/item ${
                        isActive
                          ? 'bg-[#0f0f13] shadow-lg shadow-black/40'
                          : 'bg-[#0b0b0d]/60 border-white/5 text-white hover:border-white/10 hover:bg-[#0c0c10]'
                      }`}
                      style={{
                        borderColor: isActive ? shoeColor : undefined,
                      }}
                      aria-label={`Select ${shoe.name}`}
                    >
                      {/* Active Background Glow Accent */}
                      {isActive && (
                        <div 
                          className="absolute inset-0 opacity-10 pointer-events-none transition-all"
                          style={{
                            background: `radial-gradient(circle at 100% 50%, ${shoeColor} 0%, transparent 60%)`
                          }}
                        />
                      )}

                      <div className="space-y-2 flex-grow pr-4 z-10">
                        <div className="flex items-center gap-2">
                          <span 
                            className="w-1.5 h-1.5 rounded-full transition-all duration-500" 
                            style={{
                              backgroundColor: shoeColor,
                              boxShadow: isActive ? `0 0 8px ${shoeColor}` : 'none',
                              opacity: isActive ? 1 : 0.3
                            }}
                          />
                          <p className="text-[11px] font-bold tracking-wider font-display uppercase text-white">
                            {shoe.name}
                          </p>
                        </div>
                        
                        {/* Sub-details */}
                        <div className="flex items-center justify-between">
                          <p className="text-[9px] text-neutral-400 font-light italic">
                            "{shoe.tagline}"
                          </p>
                          
                          {/* Performance Indicator bar inside card */}
                          <div className="flex items-center gap-1.5">
                            <span className="text-[8px] font-mono text-neutral-500">PERF</span>
                            <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                              <div 
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${shoe.perfScore * 10}%`,
                                  backgroundColor: shoeColor
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between self-stretch pl-4 border-l border-white/5 z-10">
                        <span className="text-[10px] font-bold text-white tracking-widest font-mono">
                          {shoe.price}
                        </span>
                        <span className="text-[8px] tracking-widest text-neutral-500 uppercase font-semibold">
                          {shoe.weight}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Fade out bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#070708] to-transparent pointer-events-none z-10 opacity-80" />
            </div>

            {/* Spec Details Card */}
            <div className="bg-[#0b0b0d] border border-white/10 rounded-3xl p-8 space-y-6 shadow-2xl">
              <div className="space-y-2">
                <span className="text-[9px] tracking-widest text-[#ff6b4a] uppercase font-bold">
                  Technical Specifications
                </span>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  {activeShoe.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-widest text-neutral-500 flex items-center gap-1.5 font-bold">
                    <Zap className="w-3.5 h-3.5 text-white" /> Cushioning
                  </span>
                  <p className="text-xs font-semibold text-white">{activeShoe.cushion}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-widest text-neutral-500 flex items-center gap-1.5 font-bold">
                    <Shield className="w-3.5 h-3.5 text-white" /> Materials
                  </span>
                  <p className="text-xs font-semibold text-white leading-tight">{activeShoe.materials}</p>
                </div>
                <div className="space-y-1 col-span-2 mt-2">
                  <span className="text-[9px] uppercase tracking-widest text-neutral-500 flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-white" /> Available Colorways
                  </span>
                  <p className="text-xs font-semibold text-white">{activeShoe.colorways}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
