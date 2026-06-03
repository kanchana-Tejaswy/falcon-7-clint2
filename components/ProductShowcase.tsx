'use client';

import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { Info, Maximize2, Zap, Shield, Sparkles, RefreshCw, Loader } from 'lucide-react';
import ShoeModel from './ShoeModel';

interface ShoeData {
  id: 'air' | 'velocity' | 'phantom' | 'elite' | 'runner' | 'urban';
  name: string;
  tagline: string;
  description: string;
  weight: string;
  cushion: string;
  materials: string;
  colorways: string;
  perfScore: number;
  comfortRating: number;
  bgHex: string;
}

const SHOES: ShoeData[] = [
  {
    id: 'air',
    name: 'Falcon 7 Air',
    tagline: 'Breathing Performance',
    description: 'Designed for maximal thermal management. Our proprietary open-weave mesh regulates internal temperatures even in the most intense sessions.',
    weight: '240g',
    cushion: 'AirFlow Active Foam',
    materials: 'AeroGrid Knit, Micro-Filament TPU',
    colorways: 'Pure White / Ice Silver / Dark Void',
    perfScore: 9.7,
    comfortRating: 9.8,
    bgHex: 'bg-neutral-50',
  },
  {
    id: 'velocity',
    name: 'Falcon 7 Velocity',
    tagline: 'Speed Redefined',
    description: 'Engineered for rapid acceleration. Features a double-stiffened carbon plate to spring you forward with every stride.',
    weight: '235g',
    cushion: 'Energy Return Foam v2',
    materials: 'DynaWeave Poly, Aero Carbon Plate',
    colorways: 'Midnight Onyx / Chrome Gold',
    perfScore: 9.9,
    comfortRating: 9.4,
    bgHex: 'bg-neutral-900 text-white',
  },
  {
    id: 'phantom',
    name: 'Falcon 7 Phantom',
    tagline: 'Silent Momentum',
    description: 'A completely stealthy profile optimized for urban runners. Features vibration dampening nodes inside the chassis.',
    weight: '248g',
    cushion: 'Impact Shield Core',
    materials: 'VibraDamp Synth, Shadow Mesh',
    colorways: 'Grey Shadow / Flat Platinum',
    perfScore: 9.6,
    comfortRating: 9.7,
    bgHex: 'bg-zinc-100',
  },
  {
    id: 'elite',
    name: 'Falcon 7 Elite',
    tagline: 'The Pinnacle of Luxury',
    description: 'Handcrafted gold detailing combined with a premium grade chassis. The ultimate expression of status and supreme comfort.',
    weight: '260g',
    cushion: 'Hybrid Dual-Foam Cush',
    materials: 'Vegan Nubuck, Gilded Carbon Webbing',
    colorways: 'Gilded White / Royal Obsidian',
    perfScore: 9.5,
    comfortRating: 9.9,
    bgHex: 'bg-neutral-50',
  },
  {
    id: 'runner',
    name: 'Falcon 7 Runner Pro',
    tagline: 'Endurance Unleashed',
    description: 'Built for ultra-marathons and high mileage. Multi-density cushioning systems prevent fatigue and stabilize the ankle joints.',
    weight: '255g',
    cushion: 'EnduraGrid Cushioning',
    materials: 'TendonGrip Fabric, Anti-Slip Base',
    colorways: 'Cobalt Blue / Neon Bolt',
    perfScore: 9.8,
    comfortRating: 9.6,
    bgHex: 'bg-blue-50/20',
  },
  {
    id: 'urban',
    name: 'Falcon 7 Urban X',
    tagline: 'All-Terrain Expression',
    description: 'Street-ready styling fused with elite trail traction. Weatherproof coating repels elements while retaining internal breathability.',
    weight: '268g',
    cushion: 'Smart Grip Response Foam',
    materials: 'HydraShield Nylon, Vulcanized Rubber Outsole',
    colorways: 'Crimson Ember / Stealth Ash',
    perfScore: 9.5,
    comfortRating: 9.6,
    bgHex: 'bg-red-50/10',
  },
];

export default function ProductShowcase() {
  const [activeShoe, setActiveShoe] = useState<ShoeData>(SHOES[0]);
  const [zoom, setZoom] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [canvasLoading, setCanvasLoading] = useState(true);
  const [keyOffset, setKeyOffset] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  return (
    <section id="collection" className="w-full min-h-screen bg-[#F8F8F8] py-24 md:py-32 flex flex-col justify-center items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full space-y-16">
        
        {/* Header Block */}
        <div className="text-center md:text-left space-y-4">
          <span className="text-[10px] tracking-[0.4em] uppercase text-luxury-support font-semibold">
            Interactive Showroom
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-light tracking-tight text-black">
            The Falcon 7 Collection
          </h2>
          <p className="text-sm md:text-base text-luxury-support max-w-xl font-light">
            Select a silhouette to open the high-fidelity 3D inspection module. Rotate, zoom, and inspect material engineering.
          </p>
        </div>

        {/* Dynamic Split Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Block: 3D Interactive Showroom */}
          <div className="lg:col-span-7 bg-white border border-luxury-silver rounded-2xl relative flex flex-col justify-between overflow-hidden shadow-sm min-h-[500px]">
            {/* Top Toolbar */}
            <div className="p-6 flex justify-between items-center z-10">
              <div>
                <span className="text-[9px] tracking-widest text-luxury-support uppercase font-semibold">
                  Silhouette Inspector
                </span>
                <h3 className="text-lg font-display font-medium text-black mt-1">
                  {activeShoe.name}
                </h3>
              </div>

              {/* View options */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setZoom(!zoom)}
                  className={`p-2 rounded-full border transition-all duration-300 flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                    zoom 
                      ? 'bg-black border-black text-white' 
                      : 'bg-neutral-50 border-luxury-silver text-black hover:bg-neutral-100'
                  }`}
                  title="Toggle Zoom"
                  aria-label="Toggle zoom view"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setKeyOffset(prev => prev + 1)}
                  className="p-2 rounded-full border bg-neutral-50 border-luxury-silver text-black hover:bg-neutral-100 transition-all duration-300 flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                  title="Reset View"
                  aria-label="Reset 3D camera"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* R3F Interactive Canvas with Skeleton Loader Fallback */}
            <div className="absolute inset-0 top-16 bottom-20 flex items-center justify-center">
              {(!mounted || canvasLoading) && (
                <div className="absolute inset-0 bg-neutral-50/50 flex flex-col items-center justify-center space-y-4 z-20 animate-pulse">
                  <Loader className="w-6 h-6 text-black animate-spin" />
                  <span className="text-[10px] tracking-widest text-luxury-support uppercase font-semibold">
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
                    <ambientLight intensity={1.1} />
                    <directionalLight position={[3, 8, 3]} intensity={1.6} castShadow shadow-bias={-0.0001} />
                    <directionalLight position={[-3, 8, -3]} intensity={0.4} />
                    <pointLight position={[0, -2, 2]} intensity={0.4} />
                    <spotLight position={[0, 4, 0]} intensity={1} penumbra={1} castShadow />

                    <ShoeModel colorway={activeShoe.id} activeSection="showcase" />

                    <ContactShadows
                      position={[0, -0.65, 0]}
                      opacity={0.3}
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
                      autoRotateSpeed={1.0}
                    />
                  </Canvas>
                </div>
              )}
            </div>

            {/* Bottom Details Footer inside the Inspector */}
            <div className="p-6 border-t border-luxury-silver bg-neutral-50/55 backdrop-blur-sm z-10 flex flex-wrap gap-x-6 gap-y-2 justify-between items-center">
              <span className="text-[9px] tracking-widest text-luxury-support uppercase font-semibold flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" /> Hold and drag to spin 360°
              </span>

              <div className="flex space-x-6">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-luxury-support font-medium">Performance Score</span>
                  <p className="text-sm font-semibold font-display text-black">{activeShoe.perfScore}/10</p>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-luxury-support font-medium">Comfort Rating</span>
                  <p className="text-sm font-semibold font-display text-black">{activeShoe.comfortRating}/10</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: Silhouette Selector and Specs */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            {/* Scrollable list of Silhouettes */}
            <div className="space-y-3 max-h-[360px] overflow-y-auto no-scrollbar pr-1">
              {SHOES.map((shoe) => {
                const isActive = activeShoe.id === shoe.id;
                return (
                  <div
                    key={shoe.id}
                    onClick={() => handleShoeChange(shoe)}
                    onKeyDown={(e) => handleKeyPress(e, shoe)}
                    role="button"
                    tabIndex={0}
                    className={`w-full p-4 border rounded-xl flex items-center justify-between text-left cursor-pointer transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                      isActive
                        ? 'bg-black border-black text-white shadow-md'
                        : 'bg-white border-luxury-silver hover:border-neutral-400 text-black'
                    }`}
                    aria-label={`Select ${shoe.name} - ${shoe.tagline}`}
                  >
                    <div className="space-y-1">
                      <p className="text-xs font-semibold tracking-wider font-display uppercase">
                        {shoe.name}
                      </p>
                      <p className={`text-[10px] ${isActive ? 'text-neutral-300' : 'text-luxury-support'}`}>
                        {shoe.tagline}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] tracking-widest uppercase font-medium ${isActive ? 'text-neutral-300' : 'text-luxury-support'}`}>
                        {shoe.weight}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Spec Details Card */}
            <div className="bg-white border border-luxury-silver rounded-2xl p-8 space-y-6 shadow-sm">
              <div className="space-y-2">
                <span className="text-[9px] tracking-widest text-luxury-support uppercase font-semibold">
                  Technical Specifications
                </span>
                <p className="text-xs text-luxury-support leading-relaxed font-light">
                  {activeShoe.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-luxury-silver pt-6">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-widest text-luxury-support flex items-center gap-1 font-semibold">
                    <Zap className="w-3 h-3 text-black" /> Cushioning
                  </span>
                  <p className="text-xs font-medium text-black">{activeShoe.cushion}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-widest text-luxury-support flex items-center gap-1 font-semibold">
                    <Shield className="w-3 h-3 text-black" /> Materials
                  </span>
                  <p className="text-xs font-medium text-black leading-tight">{activeShoe.materials}</p>
                </div>
                <div className="space-y-1 col-span-2 mt-2">
                  <span className="text-[9px] uppercase tracking-widest text-luxury-support flex items-center gap-1 font-semibold">
                    <Sparkles className="w-3 h-3 text-black" /> Available Colorways
                  </span>
                  <p className="text-xs font-medium text-black">{activeShoe.colorways}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
