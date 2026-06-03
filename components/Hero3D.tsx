'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import ShoeModel from './ShoeModel';
import { SHOES } from '../data/products';
import { ArrowRight, Play, ChevronLeft, ChevronRight } from 'lucide-react';

const DISPLAY_SHOES = SHOES.slice(0, 5);

function MagneticButton({ children, className, primary = false }: { children: React.ReactNode, className?: string, primary?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={`
        relative px-6 py-3 md:px-8 md:py-4 rounded-full font-sans text-xs md:text-sm font-semibold tracking-widest uppercase transition-all duration-300 shadow-sm
        ${primary 
          ? 'bg-black text-white hover:bg-neutral-800 shadow-black/10' 
          : 'bg-white text-black border border-neutral-200 hover:border-black shadow-black/5'}
        ${className}
      `}
    >
      <span className="relative z-10 flex items-center justify-center gap-3">
        {children}
      </span>
    </motion.button>
  );
}

function StatBlock({ label, value, unit, align = 'left' }: { label: string, value: string, unit?: string, align?: 'left' | 'right' }) {
  return (
    <div className={`flex flex-col gap-1 ${align === 'right' ? 'items-end text-right' : 'items-start text-left'}`}>
      <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">{label}</span>
      <div className={`flex items-baseline gap-1 ${align === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>
        <motion.span 
          key={value}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl lg:text-4xl font-display font-light text-black tracking-tight"
        >
          {value}
        </motion.span>
        {unit && <span className="text-xs font-mono text-neutral-400">{unit}</span>}
      </div>
    </div>
  );
}

export default function Hero3D() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DISPLAY_SHOES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % DISPLAY_SHOES.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + DISPLAY_SHOES.length) % DISPLAY_SHOES.length);

  const activeShoe = DISPLAY_SHOES[activeIndex];

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col pt-24 pb-8" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8f8f8 40%, #f3f3f3 100%)' }}>
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-paper-2)_0%,#ffffff_100%)]" />
        <AnimatePresence mode="popLayout">
          <motion.h1 
            key={activeShoe.id}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 0.03, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] md:text-[25vw] font-display font-black tracking-tighter text-black whitespace-nowrap"
          >
            FALCON
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* TOP: Brand Name */}
      <header className="relative flex-shrink-0 w-full z-40 flex flex-col items-center justify-center pointer-events-none mb-4 lg:mb-8">
        <span className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 font-bold mb-2">Series 07</span>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-widest text-black uppercase">
          FALCON 7
        </h1>
      </header>

      {/* MIDDLE: 3D Shoe (Center) & Info (Sides) */}
      <div className="relative flex-grow w-full max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 items-center z-30">
        
        {/* Left Side Info */}
        <div className="hidden lg:flex flex-col justify-center items-start gap-10 z-40 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeShoe.id + "-left"}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-10"
            >
              <div>
                <h2 className="text-3xl xl:text-4xl font-display font-light text-black mb-3">{activeShoe.name.replace('Falcon 7 ', '')}</h2>
                <p className="text-sm xl:text-base text-neutral-500 font-sans leading-relaxed max-w-[320px]">
                  {activeShoe.description.split('.')[0]}.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <MagneticButton primary>
                  Explore Collection <ArrowRight className="w-4 h-4" />
                </MagneticButton>
                <MagneticButton>
                  Watch Technology <Play className="w-4 h-4 fill-current" />
                </MagneticButton>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center 3D Shoe */}
        <div className="relative w-full h-full min-h-[400px] lg:min-h-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="absolute inset-[-20%] md:inset-[-50%] pointer-events-auto cursor-grab active:cursor-grabbing">
            <Canvas shadows={{ type: THREE.PCFShadowMap }} camera={{ position: [0, 0.2, 2.5], fov: 45 }}>
              <ambientLight intensity={1.2} />
              <spotLight position={[0, 10, 5]} angle={0.3} penumbra={1} intensity={2} castShadow />
              <directionalLight position={[-5, 5, -5]} intensity={0.5} />
              
              <AnimatePresence mode="wait">
                {DISPLAY_SHOES.map((shoe, i) => (
                  i === activeIndex && (
                    <Float key={shoe.id} speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                      <group 
                        rotation={[mousePos.y * 0.1, mousePos.x * 0.2, 0]}
                        position={[0, 0, 0]}
                      >
                        <ShoeModel colorway={shoe.id as any} active={true} mousePos={{x: 0, y: 0}} />
                      </group>
                    </Float>
                  )
                ))}
              </AnimatePresence>

              <ContactShadows position={[0, -0.6, 0]} opacity={0.4} scale={5} blur={2.5} far={2} />
              <Environment preset="studio" />
              
              <OrbitControls 
                enableZoom={false} 
                enablePan={false}
                autoRotate={true}
                autoRotateSpeed={0.5}
                minPolarAngle={Math.PI / 2.5}
                maxPolarAngle={Math.PI / 2.5}
              />
            </Canvas>
          </div>
        </div>

        {/* Right Side Info */}
        <div className="hidden lg:flex flex-col justify-center items-end text-right gap-10 z-40 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeShoe.id + "-right"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-10"
            >
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 font-bold mb-3">Performance Focus</p>
                <p className="text-xl xl:text-2xl font-display text-black italic max-w-[280px]">
                  "{activeShoe.tagline}"
                </p>
              </div>
              
              <div className="space-y-8 border-r-2 border-neutral-200 pr-6 items-end">
                <StatBlock label="Net Weight" value={activeShoe.weight.replace('g', '')} unit="g" align="right" />
                <StatBlock label="Energy Return" value={activeShoe.technicalSpecs.energyReturn.split('%')[0]} unit="%" align="right" />
                <StatBlock label="Carbon Plate" value="100" unit="%" align="right" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Info Overlay (Visible only on small screens) */}
      <div className="lg:hidden relative z-40 px-6 flex flex-col items-center text-center mt-auto pb-4 pointer-events-none">
        <h2 className="text-2xl font-display font-bold text-black mb-1">{activeShoe.name}</h2>
        <p className="text-sm text-neutral-500 font-sans mb-6">"{activeShoe.tagline}"</p>
        <div className="flex gap-4 pointer-events-auto">
          <MagneticButton primary>Explore</MagneticButton>
          <MagneticButton><Play className="w-4 h-4" /></MagneticButton>
        </div>
      </div>

      {/* BOTTOM: Slider Controls & Navigation */}
      <footer className="relative flex-shrink-0 w-full z-50 flex flex-col items-center justify-end pb-4 md:pb-8 pointer-events-none">
        
        {/* Thumbnail Dots/Names */}
        <div className="flex items-center gap-4 md:gap-8 pointer-events-auto overflow-x-auto max-w-full px-6 no-scrollbar">
          {DISPLAY_SHOES.map((shoe, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={shoe.id}
                onClick={() => setActiveIndex(i)}
                className="flex flex-col items-center gap-2 group outline-none min-w-[60px]"
              >
                <span className={`text-[9px] md:text-[10px] uppercase tracking-widest font-bold transition-colors duration-300 whitespace-nowrap ${isActive ? 'text-black' : 'text-neutral-300 group-hover:text-neutral-500'}`}>
                  {shoe.name.replace('Falcon 7 ', '')}
                </span>
                <div className={`h-[2px] transition-all duration-500 rounded-full ${isActive ? 'w-full bg-black' : 'w-0 bg-transparent group-hover:w-1/2 group-hover:bg-neutral-300'}`} />
              </button>
            );
          })}
        </div>

        {/* Floating Navigation Arrows (Side of thumbnails) */}
        <div className="absolute left-6 md:left-12 bottom-4 md:bottom-8 pointer-events-auto hidden md:block">
          <button onClick={handlePrev} className="p-3 rounded-full bg-white/50 backdrop-blur-md border border-neutral-200 hover:bg-black hover:text-white transition-all shadow-sm outline-none">
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute right-6 md:right-12 bottom-4 md:bottom-8 pointer-events-auto hidden md:block">
          <button onClick={handleNext} className="p-3 rounded-full bg-white/50 backdrop-blur-md border border-neutral-200 hover:bg-black hover:text-white transition-all shadow-sm outline-none">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </footer>

    </section>
  );
}