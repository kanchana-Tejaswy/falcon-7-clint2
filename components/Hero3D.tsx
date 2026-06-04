'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import ShoeModel from './ShoeModel';
import { SHOES } from '../data/products';
import { ArrowRight, Play, ChevronLeft, ChevronRight } from 'lucide-react';

const DISPLAY_SHOES = SHOES.slice(0, 6);

function MagneticButton({ 
  children, 
  className, 
  primary = false,
  onClick
}: { 
  children: React.ReactNode, 
  className?: string, 
  primary?: boolean,
  onClick?: () => void
}) {
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
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={`
        relative px-6 py-3 md:px-8 md:py-4 rounded-full font-sans text-xs md:text-sm font-semibold tracking-widest uppercase transition-all duration-300 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer
        ${primary 
          ? 'bg-white text-black hover:bg-neutral-200 shadow-white/5' 
          : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 shadow-black/20'}
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
  const numericVal = parseFloat(value);
  let percentage = 75;
  if (!isNaN(numericVal)) {
    if (label.toLowerCase().includes('weight')) {
      // 240g is very light (high score), 360g is heavy (low score)
      percentage = Math.max(10, Math.min(100, Math.round(((360 - numericVal) / 120) * 100)));
    } else if (label.toLowerCase().includes('return')) {
      percentage = numericVal;
    } else if (label.toLowerCase().includes('plate')) {
      percentage = numericVal;
    }
  }

  return (
    <div className={`flex flex-col gap-1.5 ${align === 'right' ? 'items-end text-right' : 'items-start text-left'}`}>
      <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-500 font-bold">{label}</span>
      <div className={`flex items-baseline gap-1 ${align === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>
        <motion.span 
          key={value}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl lg:text-3xl font-display font-light text-white tracking-tight"
        >
          {value}
        </motion.span>
        {unit && <span className="text-xs font-mono text-neutral-500">{unit}</span>}
      </div>
      
      {/* Sleek Technical Progress Bar */}
      <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden mt-0.5">
        <motion.div
          key={value + "-progress"}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-white/80 rounded-full"
        />
      </div>
    </div>
  );
}

interface Hero3DProps {
  onExploreClick?: (shoeId: string) => void;
  onWatchTechClick?: (shoeId: string) => void;
}

export default function Hero3D({ onExploreClick, onWatchTechClick }: Hero3DProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DISPLAY_SHOES.length);
    }, 8500);
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

  // Map each shoe to a sleek luxury color gradient glow
  const glowColors = {
    air: 'rgba(255, 255, 255, 0.08)',
    velocity: 'rgba(245, 158, 11, 0.1)',
    phantom: 'rgba(139, 92, 246, 0.1)',
    elite: 'rgba(212, 175, 55, 0.12)',
    runner: 'rgba(59, 130, 246, 0.12)',
    urban: 'rgba(239, 68, 68, 0.1)'
  };
  const ambientColor = glowColors[activeShoe.id as keyof typeof glowColors] || 'rgba(255, 255, 255, 0.08)';

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden flex flex-col pt-28 pb-8 bg-[#030303] bg-grid-pattern">
      
      {/* Dynamic Ambient Blur Backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] rounded-full blur-[140px] pointer-events-none opacity-60 transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, ${ambientColor} 0%, transparent 70%)`
          }}
        />
        <AnimatePresence mode="popLayout">
          <motion.h1 
            key={activeShoe.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 0.04, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] md:text-[25vw] font-display font-black tracking-tighter text-stroke-luxury text-white whitespace-nowrap"
          >
            FALCON
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* TOP: Brand Name */}
      <header className="relative flex-shrink-0 w-full z-30 flex flex-col items-center justify-center pointer-events-none mb-2 lg:mb-6">
        <span className="text-[9px] tracking-[0.4em] uppercase text-[#ff6b4a] font-bold mb-1">Series 07</span>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-[0.25em] text-white uppercase select-none">
          FALCON 7
        </h1>
      </header>

      {/* MIDDLE: 3D Shoe (Center) & Info (Sides) */}
      <div className="relative flex-grow w-full max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 items-center z-30">
        
        {/* Left Side Info */}
        <div className="hidden lg:flex flex-col justify-center items-start gap-10 z-35 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeShoe.id + "-left"}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl xl:text-4xl font-display font-light text-white mb-3 tracking-wide">{activeShoe.name.replace('Falcon 7 ', '')}</h2>
                <p className="text-xs xl:text-sm text-neutral-400 font-sans leading-relaxed max-w-[320px]">
                  {activeShoe.description.split('.')[0]}.
                </p>
              </div>

              <div className="flex flex-col gap-3.5">
                <MagneticButton primary className="shadow-lg shadow-white/5" onClick={() => onExploreClick ? onExploreClick(activeShoe.id) : handleScrollTo('collection')}>
                  Explore Collection <ArrowRight className="w-4 h-4" />
                </MagneticButton>
                <MagneticButton onClick={() => onWatchTechClick ? onWatchTechClick(activeShoe.id) : handleScrollTo('technology')}>
                  Watch Technology <Play className="w-4 h-4 fill-current text-white" />
                </MagneticButton>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center 3D Shoe */}
        <div className="relative w-full h-full min-h-[350px] lg:min-h-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="absolute inset-0 pointer-events-auto cursor-grab active:cursor-grabbing">
            <Canvas shadows={{ type: THREE.PCFShadowMap }} camera={{ position: [0, 0.15, 2.3], fov: 45 }}>
              <ambientLight intensity={1.4} />
              <spotLight position={[0, 8, 4]} angle={0.25} penumbra={1} intensity={2.5} castShadow />
              <directionalLight position={[-5, 5, -5]} intensity={0.6} />
              
              <AnimatePresence mode="wait">
                {DISPLAY_SHOES.map((shoe, i) => (
                  i === activeIndex && (
                    <Float key={shoe.id} speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
                      <group 
                        rotation={[mousePos.y * 0.08, mousePos.x * 0.15, 0]}
                        position={[0, 0, 0]}
                        scale={[0.48, 0.48, 0.48]}
                      >
                        <ShoeModel colorway={shoe.id as any} />
                      </group>
                    </Float>
                  )
                ))}
              </AnimatePresence>

              <ContactShadows position={[0, -0.6, 0]} opacity={0.5} scale={4.5} blur={2.2} far={2} />
              <Environment preset="studio" />
              
              <OrbitControls 
                enableZoom={false} 
                enablePan={false}
                autoRotate={true}
                autoRotateSpeed={0.4}
                minPolarAngle={Math.PI / 2.6}
                maxPolarAngle={Math.PI / 2.6}
              />
            </Canvas>
          </div>
        </div>

        {/* Right Side Info */}
        <div className="hidden lg:flex flex-col justify-center items-end text-right gap-10 z-35 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeShoe.id + "-right"}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-8"
            >
              <div>
                <p className="text-[9px] tracking-[0.25em] uppercase text-[#ff6b4a] font-bold mb-2">Performance Focus</p>
                <p className="text-xl xl:text-2xl font-display text-white font-light italic max-w-[280px] leading-relaxed">
                  "{activeShoe.tagline}"
                </p>
              </div>
              
              <div className="space-y-6 border-r border-white/10 pr-6 items-end">
                <StatBlock label="Net Weight" value={activeShoe.weight.replace('g', '')} unit="g" align="right" />
                <StatBlock label="Energy Return" value={activeShoe.technicalSpecs.energyReturn.split('%')[0]} unit="%" align="right" />
                <StatBlock label="Carbon Plate" value="100" unit="%" align="right" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Info Overlay (Visible only on small screens) */}
      <div className="lg:hidden relative z-35 px-6 flex flex-col items-center text-center mt-auto pb-6 pointer-events-none">
        <h2 className="text-xl font-display font-medium text-white mb-1">{activeShoe.name}</h2>
        <p className="text-xs text-neutral-400 font-sans mb-5">"{activeShoe.tagline}"</p>
        <div className="flex gap-3 pointer-events-auto">
          <MagneticButton primary className="py-2.5 px-5 text-xs" onClick={() => onExploreClick ? onExploreClick(activeShoe.id) : handleScrollTo('collection')}>Explore</MagneticButton>
          <MagneticButton className="py-2.5 px-4" onClick={() => onWatchTechClick ? onWatchTechClick(activeShoe.id) : handleScrollTo('technology')}><Play className="w-3.5 h-3.5 fill-current text-white" /></MagneticButton>
        </div>
      </div>

      {/* BOTTOM: Slider Controls & Navigation */}
      <footer className="relative flex-shrink-0 w-full z-50 flex flex-col items-center justify-end pb-2 md:pb-6 pointer-events-none">
        
        {/* Thumbnail Dots/Names */}
        <div className="flex items-center gap-4 md:gap-8 pointer-events-auto overflow-x-auto max-w-full px-6 no-scrollbar pb-1">
          {DISPLAY_SHOES.map((shoe, i) => {
            const isActive = i === activeIndex;
            const activeColorClass = {
              air: 'bg-white shadow-[0_0_8px_#ffffff]',
              velocity: 'bg-amber-400 shadow-[0_0_8px_#fbbf24]',
              phantom: 'bg-violet-400 shadow-[0_0_8px_#a78bfa]',
              elite: 'bg-yellow-500 shadow-[0_0_8px_#eab308]',
              runner: 'bg-blue-500 shadow-[0_0_8px_#3b82f6]',
              urban: 'bg-red-500 shadow-[0_0_8px_#ef4444]'
            }[shoe.id] || 'bg-white';

            return (
              <button
                key={shoe.id}
                onClick={() => setActiveIndex(i)}
                className={`flex flex-col items-center justify-center px-4 py-2 border rounded-xl transition-all duration-300 min-w-[90px] cursor-pointer outline-none ${
                  isActive
                    ? 'bg-white/10 border-white/20 shadow-lg shadow-white/5'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'
                }`}
              >
                <span className={`text-[9px] uppercase tracking-widest font-bold transition-colors duration-300 whitespace-nowrap ${isActive ? 'text-white' : 'text-neutral-500'}`}>
                  {shoe.name.replace('Falcon 7 ', '')}
                </span>
                <div className={`w-1 h-1 rounded-full mt-1.5 transition-all duration-300 ${isActive ? activeColorClass : 'bg-transparent scale-0'}`} />
              </button>
            );
          })}
        </div>

        {/* Floating Navigation Arrows (Side of thumbnails) */}
        <div className="absolute left-6 md:left-12 bottom-2 pointer-events-auto hidden md:block">
          <button onClick={handlePrev} className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all shadow-lg outline-none cursor-pointer text-white">
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute right-6 md:right-12 bottom-2 pointer-events-auto hidden md:block">
          <button onClick={handleNext} className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all shadow-lg outline-none cursor-pointer text-white">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>

    </section>
  );
}