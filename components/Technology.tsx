'use client';

import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { Wind, Zap, Flame, Shield, Grid, Loader } from 'lucide-react';
import ShoeModel from './ShoeModel';

interface TechItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  part: string;
}

const TECH_ITEMS: TechItem[] = [
  {
    id: 1,
    title: 'AirFlow Technology',
    subtitle: 'Integrated micro-climate ventilation',
    description: 'Thermo-regulating channels woven directly into the upper matrix force hot air out and pull cool air in during every flex cycle, keeping feet dry and comfortable.',
    icon: <Wind className="w-4 h-4" />,
    part: 'BREATHABLE COLLAR & MESH UPPER',
  },
  {
    id: 2,
    title: 'Energy Return Foam',
    subtitle: 'High-rebound nitrogen-infused foam',
    description: 'A multi-density responsive foam structure that returns up to 88% of impact energy, converting vertical force into horizontal momentum to prevent fatigue.',
    icon: <Zap className="w-4 h-4" />,
    part: 'INFUSED MIDSOLE FOAM LAYER',
  },
  {
    id: 3,
    title: 'Carbon Performance Plate',
    subtitle: 'Aerospace-grade composite chassis',
    description: 'A full-length 3D carbon fiber plate tuned for biomechanical stiffness. It acts as an active spring, stabilizing transitions and accelerating stride release.',
    icon: <Flame className="w-4 h-4" />,
    part: 'STIFF CARBON FIBER CHASSIS PLATE',
  },
  {
    id: 4,
    title: 'Impact Shield Cushioning',
    subtitle: 'Dynamic heel impact absorption',
    description: 'A high-impact density pad embedded at the rear heel assembly, dispersing forces from heel-strikes and reducing shock loading on knee and ankle joints.',
    icon: <Shield className="w-4 h-4" />,
    part: 'HEEL SHOCK DISPERSION CHASSIS',
  },
  {
    id: 5,
    title: 'Smart Grip Outsole',
    subtitle: 'Adaptive multi-directional traction',
    description: 'Vulcanized luxury rubber compound with micro-grooves designed to lock onto dry, wet, or uneven pavements, ensuring traction in all high-speed turns.',
    icon: <Grid className="w-4 h-4" />,
    part: 'VULCANIZED RUBBER GRIP OUTSOLE',
  },
];

interface TechnologyProps {
  activeShoeId?: string;
}

export default function Technology({ activeShoeId = 'air' }: TechnologyProps) {
  const [activeTech, setActiveTech] = useState<TechItem>(TECH_ITEMS[0]);
  const [mounted, setMounted] = useState(false);
  const [isExploded, setIsExploded] = useState(true);
  const [canvasLoading, setCanvasLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTechChange = (tech: TechItem) => {
    setActiveTech(tech);
    setIsExploded(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent, tech: TechItem) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTechChange(tech);
    }
  };

  return (
    <section id="technology" className="w-full min-h-screen bg-[#030303] py-24 md:py-32 flex flex-col justify-center items-center overflow-hidden relative border-t border-white/5 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <span className="text-[9px] tracking-[0.4em] uppercase text-[#ff6b4a] font-bold">
            Engineering & Innovation
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-light tracking-tight text-white">
            The Science of Falcon 7
          </h2>
          <p className="text-sm md:text-base text-neutral-400 max-w-xl mx-auto font-light leading-relaxed">
            We don&apos;t just build sneakers. We assemble responsive systems designed to maximize comfort, stability, and speed.
          </p>
        </div>

        {/* Exploded interactive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Tech items selector */}
          <div className="lg:col-span-6 space-y-4 order-2 lg:order-1">
            <div className="flex justify-between items-center mb-6 pb-2 border-b border-white/10">
              <span className="text-[9px] tracking-wider text-neutral-500 uppercase font-semibold">
                Select Core Component
              </span>
              <button 
                onClick={() => setIsExploded(!isExploded)}
                className="text-xs font-semibold text-white hover:opacity-75 transition-opacity underline decoration-1 underline-offset-4 outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded px-1"
                aria-label={isExploded ? "Reset 3D view to assembled mode" : "Explode 3D model architecture"}
              >
                {isExploded ? "Reset View" : "Explode 3D View"}
              </button>
            </div>

            <div className="space-y-3">
              {TECH_ITEMS.map((tech) => {
                const isActive = activeTech.id === tech.id;
                return (
                  <div
                    key={tech.id}
                    onMouseEnter={() => handleTechChange(tech)}
                    onKeyDown={(e) => handleKeyPress(e, tech)}
                    role="button"
                    tabIndex={0}
                    className={`p-5 border rounded-2xl cursor-pointer transition-all duration-350 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                      isActive
                        ? 'bg-[#0e0e12] border-white/20 shadow-lg shadow-white/5 translate-x-2'
                        : 'bg-[#070709]/50 border-white/5 hover:border-white/10 hover:bg-[#070709]'
                    }`}
                    aria-label={`Inspect ${tech.title}: ${tech.subtitle}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl transition-all duration-300 ${
                        isActive ? 'bg-white text-black' : 'bg-white/5 text-neutral-400'
                      }`}>
                        {tech.icon}
                      </div>
                      
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xs font-bold tracking-wider font-display uppercase text-white">
                            {tech.title}
                          </h3>
                          {isActive && (
                            <span className="text-[8px] tracking-widest text-[#ff6b4a] bg-[#ff6b4a]/10 border border-[#ff6b4a]/25 px-2 py-0.5 rounded font-mono font-bold">
                              {tech.part}
                            </span>
                          )}
                        </div>
                        <p className={`text-[11px] font-medium transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-neutral-500'
                        }`}>
                          {tech.subtitle}
                        </p>
                        {isActive && (
                          <p className="text-xs font-light text-neutral-400 leading-relaxed pt-2 transition-opacity duration-300">
                            {tech.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Block: Exploded 3D Canvas */}
          <div className="lg:col-span-6 h-[450px] md:h-[550px] bg-[#0b0b0d] border border-white/10 rounded-3xl relative flex items-center justify-center order-1 lg:order-2 overflow-hidden shadow-2xl">
            
            {/* Technical Blueprint Graphics (Crosshair and Corners) */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 rounded-br-lg" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,74,0.03)_0%,transparent_70%)] pointer-events-none" />

            <div className="absolute top-6 left-6 text-left z-10">
              <span className="text-[9px] tracking-widest text-neutral-500 uppercase font-semibold">
                Chassis Configuration
              </span>
              <p className="text-xs font-medium text-white mt-1">
                {isExploded ? "Exploded Architecture Mode" : "Assembled Performance Mode"}
              </p>
            </div>

            <div className="absolute bottom-6 right-6 flex items-center gap-1.5 bg-[#0e0e11]/85 border border-white/10 px-4 py-2 rounded-full select-none text-[8px] tracking-wider text-neutral-400 uppercase font-semibold pointer-events-none z-10">
              Drag to spin chassis
            </div>

            {(!mounted || canvasLoading) && (
              <div className="absolute inset-0 bg-[#0b0b0d] flex flex-col items-center justify-center space-y-4 z-20 animate-pulse">
                <Loader className="w-6 h-6 text-white animate-spin" />
                <span className="text-[9px] tracking-widest text-neutral-400 uppercase font-semibold">
                  Loading Chassis...
                </span>
              </div>
            )}

            {mounted && (
              <div className="w-full h-full relative">
                <Canvas
                  shadows
                  camera={{ position: [0.8, 0.4, 2.2], fov: 45 }}
                  onCreated={() => setCanvasLoading(false)}
                  className="w-full h-full cursor-grab active:cursor-grabbing"
                >
                  <ambientLight intensity={1.1} />
                  <directionalLight position={[5, 10, 5]} intensity={1.8} castShadow shadow-bias={-0.0001} />
                  <directionalLight position={[-5, 5, -5]} intensity={0.4} />
                  <spotLight position={[0, 6, 0]} intensity={1.2} castShadow />

                  <group scale={[0.7, 0.7, 0.7]}>
                    <ShoeModel 
                      key={activeShoeId}
                      colorway={activeShoeId as any} 
                      activeSection="showcase" 
                      isExploded={isExploded} 
                    />
                  </group>

                  <ContactShadows
                    position={[0, -0.65, 0]}
                    opacity={isExploded ? 0.15 : 0.3}
                    scale={2.6}
                    blur={1.6}
                    far={1.6}
                  />

                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    maxPolarAngle={Math.PI / 1.7}
                    minPolarAngle={Math.PI / 2.3}
                    autoRotate={!isExploded}
                    autoRotateSpeed={0.5}
                  />
                </Canvas>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
