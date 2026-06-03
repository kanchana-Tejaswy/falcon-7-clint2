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
    icon: <Wind className="w-5 h-5" />,
    part: 'BREATHABLE COLLAR & MESH UPPER',
  },
  {
    id: 2,
    title: 'Energy Return Foam',
    subtitle: 'High-rebound nitrogen-infused foam',
    description: 'A multi-density responsive foam structure that returns up to 88% of impact energy, converting vertical force into horizontal momentum to prevent fatigue.',
    icon: <Zap className="w-5 h-5" />,
    part: 'INFUSED MIDSOLE FOAM LAYER',
  },
  {
    id: 3,
    title: 'Carbon Performance Plate',
    subtitle: 'Aerospace-grade composite chassis',
    description: 'A full-length 3D carbon fiber plate tuned for biomechanical stiffness. It acts as an active spring, stabilizing transitions and accelerating stride release.',
    icon: <Flame className="w-5 h-5" />,
    part: 'STIFF CARBON FIBER CHASSIS PLATE',
  },
  {
    id: 4,
    title: 'Impact Shield Cushioning',
    subtitle: 'Dynamic heel impact absorption',
    description: 'A high-impact density pad embedded at the rear heel assembly, dispersing forces from heel-strikes and reducing shock loading on knee and ankle joints.',
    icon: <Shield className="w-5 h-5" />,
    part: 'HEEL SHOCK DISPERSION CHASSIS',
  },
  {
    id: 5,
    title: 'Smart Grip Outsole',
    subtitle: 'Adaptive multi-directional traction',
    description: 'Vulcanized luxury rubber compound with micro-grooves designed to lock onto dry, wet, or uneven pavements, ensuring traction in all high-speed turns.',
    icon: <Grid className="w-5 h-5" />,
    part: 'VULCANIZED RUBBER GRIP OUTSOLE',
  },
];

export default function Technology() {
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
    <section id="technology" className="w-full min-h-screen bg-white py-24 md:py-32 flex flex-col justify-center items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <span className="text-[10px] tracking-[0.4em] uppercase text-luxury-support font-semibold">
            Engineering & Innovation
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-light tracking-tight text-black">
            The Science of Falcon 7
          </h2>
          <p className="text-sm md:text-base text-luxury-support max-w-xl mx-auto font-light">
            We don&apos;t just build sneakers. We assemble responsive systems designed to maximize comfort, stability, and speed.
          </p>
        </div>

        {/* Exploded interactive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Tech items selector */}
          <div className="lg:col-span-6 space-y-4 order-2 lg:order-1">
            <div className="flex justify-between items-center mb-6 pb-2 border-b border-luxury-silver">
              <span className="text-[10px] tracking-wider text-luxury-support uppercase font-semibold">
                Select Core Component
              </span>
              <button 
                onClick={() => setIsExploded(!isExploded)}
                className="text-xs font-semibold text-black hover:opacity-75 transition-opacity underline decoration-1 underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded px-1"
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
                    className={`p-6 border rounded-2xl cursor-pointer transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                      isActive
                        ? 'bg-neutral-50 border-black shadow-sm translate-x-2'
                        : 'bg-white border-luxury-silver hover:border-neutral-300'
                    }`}
                    aria-label={`Inspect ${tech.title}: ${tech.subtitle}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl transition-all duration-300 ${
                        isActive ? 'bg-black text-white' : 'bg-neutral-50 text-luxury-support'
                      }`}>
                        {tech.icon}
                      </div>
                      
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold tracking-wider font-display uppercase text-black">
                            {tech.title}
                          </h3>
                          {isActive && (
                            <span className="text-[8px] tracking-widest text-black bg-luxury-silver px-2 py-0.5 rounded font-mono font-bold">
                              {tech.part}
                            </span>
                          )}
                        </div>
                        <p className={`text-[11px] font-medium transition-colors duration-300 ${
                          isActive ? 'text-black' : 'text-luxury-support'
                        }`}>
                          {tech.subtitle}
                        </p>
                        {isActive && (
                          <p className="text-xs font-light text-luxury-support leading-relaxed pt-2 transition-opacity duration-300">
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
          <div className="lg:col-span-6 h-[450px] md:h-[550px] bg-neutral-50 border border-luxury-silver rounded-2xl relative flex items-center justify-center order-1 lg:order-2 overflow-hidden">
            <div className="absolute top-6 left-6 text-left z-10">
              <span className="text-[9px] tracking-widest text-luxury-support uppercase font-semibold">
                Chassis Configuration
              </span>
              <p className="text-xs font-medium text-black mt-1">
                {isExploded ? "Exploded Architecture Mode" : "Assembled Performance Mode"}
              </p>
            </div>

            <div className="absolute bottom-6 right-6 flex items-center gap-1.5 glassmorphism px-4 py-2 rounded-full select-none text-[8px] tracking-wider text-luxury-support uppercase font-semibold pointer-events-none z-10">
              Drag to spin chassis
            </div>

            {(!mounted || canvasLoading) && (
              <div className="absolute inset-0 bg-neutral-50 flex flex-col items-center justify-center space-y-4 z-20 animate-pulse">
                <Loader className="w-6 h-6 text-black animate-spin" />
                <span className="text-[10px] tracking-widest text-luxury-support uppercase font-semibold">
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
                  <ambientLight intensity={1.0} />
                  <directionalLight position={[5, 10, 5]} intensity={1.8} castShadow shadow-bias={-0.0001} />
                  <directionalLight position={[-5, 5, -5]} intensity={0.4} />
                  <spotLight position={[0, 6, 0]} intensity={1} castShadow />

                  <ShoeModel 
                    colorway="air" 
                    activeSection="showcase" 
                    isExploded={isExploded} 
                  />

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
