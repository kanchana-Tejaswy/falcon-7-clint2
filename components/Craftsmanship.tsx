'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { Layers, Compass, Hammer, Trophy, Loader } from 'lucide-react';
import ShoeModel from './ShoeModel';
import * as THREE from 'three';

interface ProcessStep {
  id: number;
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  canvasMode: 'particles' | 'wireframe' | 'ghost' | 'final';
}

const STEPS: ProcessStep[] = [
  {
    id: 0,
    phase: 'PHASE 01',
    title: 'AeroGrid Material Synth',
    subtitle: 'Woven carbon fibers and polymer compounds',
    description: 'We begin by synthesizing the structural materials: weaving ultra-light AeroGrid micro-fibers alongside high-tensile TPU threads. This forms a flexible, breathing sock upper that resists stretching under load.',
    icon: <Layers className="w-4 h-4" />,
    canvasMode: 'particles',
  },
  {
    id: 1,
    phase: 'PHASE 02',
    title: 'Computational Design',
    subtitle: 'Predictive biomechanical stress blueprints',
    description: 'Using finite element analysis (FEA), our design algorithms compute stress points and aerodynamic drag. The result is a digital mesh blueprint that maximizes ventilation while reinforcing high-pressure support zones.',
    icon: <Compass className="w-4 h-4" />,
    canvasMode: 'wireframe',
  },
  {
    id: 2,
    phase: 'PHASE 03',
    title: 'Robotic Carbon Bonding',
    subtitle: 'Inserting the active carbon plate',
    description: 'During assembly, high-precision robotic arms insert the custom-tuned carbon fiber plate between the outsole and midsole. Thermoplastic adhesives bond the layers at high heat to ensure zero energy loss.',
    icon: <Hammer className="w-4 h-4" />,
    canvasMode: 'ghost',
  },
  {
    id: 3,
    phase: 'PHASE 04',
    title: 'Gilded Finish & Inspect',
    subtitle: 'Hand-trimming and serialization',
    description: 'The completed silhouette emerges. Craftspeople hand-inspect the seam margins, stitch lines, and material transitions. A custom-branded gold trim is added before stamping the shoe with its unique series coordinate.',
    icon: <Trophy className="w-4 h-4" />,
    canvasMode: 'final',
  },
];

function RawMaterialParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.15;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length / 3; i++) {
      const x = positions[i * 3];
      const z = positions[i * 3 + 2];
      positions[i * 3 + 1] = Math.sin(time + x * 2 + z * 2) * 0.15;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const particleCount = 180;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 2.5;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2.5;
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      {/* Glowing technical coral particles */}
      <pointsMaterial
        color="#ff6b4a"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
}

export default function Craftsmanship() {
  const [activeStep, setActiveStep] = useState<ProcessStep>(STEPS[0]);
  const [mounted, setMounted] = useState(false);
  const [canvasLoading, setCanvasLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStepChange = (step: ProcessStep) => {
    setCanvasLoading(true);
    setActiveStep(step);
  };

  const handleKeyPress = (e: React.KeyboardEvent, step: ProcessStep) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleStepChange(step);
    }
  };

  return (
    <section id="craftsmanship" className="w-full min-h-screen bg-[#070708] py-24 md:py-32 flex flex-col justify-center items-center overflow-hidden relative border-t border-white/5 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center md:text-left space-y-4">
          <span className="text-[9px] tracking-[0.4em] uppercase text-[#ff6b4a] font-bold">
            Premium Craftsmanship
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-light tracking-tight text-white">
            The Assembly Process
          </h2>
          <p className="text-sm md:text-base text-neutral-400 max-w-xl font-light leading-relaxed">
            Every pair of Falcon 7 sneakers goes through a rigorous four-phase manufacturing pipeline, merging robotic accuracy with hand-finished luxury.
          </p>
        </div>

        {/* Split screen content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Block: Sticky 3D Canvas visualizer */}
          <div className="lg:col-span-6 bg-[#0b0b0d] border border-white/10 rounded-3xl min-h-[400px] md:min-h-[500px] relative overflow-hidden shadow-2xl flex items-center justify-center">
            
            {/* Technical Blueprint Graphics (Crosshair and Corners) */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 rounded-br-lg" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015)_0%,transparent_70%)] pointer-events-none" />

            {/* Overlay indicators */}
            <div className="absolute top-6 left-6 text-left z-10">
              <span className="text-[8px] tracking-[0.3em] text-[#ff6b4a] uppercase font-mono font-bold">
                {activeStep.phase}
              </span>
              <p className="text-xs font-semibold text-white mt-1 uppercase tracking-wider">
                {activeStep.canvasMode === 'particles' && "Sensing Material Atoms"}
                {activeStep.canvasMode === 'wireframe' && "Compiling Stress Blueprint"}
                {activeStep.canvasMode === 'ghost' && "Carbon Plate Interlocking"}
                {activeStep.canvasMode === 'final' && "Serialized Masterpiece"}
              </p>
            </div>

            <div className="absolute bottom-6 left-6 z-10 bg-[#0e0e11]/85 border border-white/10 px-4 py-2 rounded-full pointer-events-none text-[8px] tracking-wider text-neutral-400 uppercase font-semibold">
              Drag to orbit preview
            </div>

            {(!mounted || canvasLoading) && (
              <div className="absolute inset-0 bg-[#0b0b0d] flex flex-col items-center justify-center space-y-4 z-20 animate-pulse">
                <Loader className="w-6 h-6 text-white animate-spin" />
                <span className="text-[9px] tracking-widest text-neutral-400 uppercase font-semibold">
                  Preparing Visualization...
                </span>
              </div>
            )}

            {/* R3F Dynamic Viewer */}
            {mounted && (
              <div className="absolute inset-0">
                <Canvas
                  key={activeStep.id}
                  shadows
                  camera={{ position: [0.9, 0.3, 2.0], fov: 45 }}
                  onCreated={() => setCanvasLoading(false)}
                  className="w-full h-full cursor-grab active:cursor-grabbing"
                >
                  <ambientLight intensity={1.2} />
                  <directionalLight position={[4, 10, 4]} intensity={1.8} castShadow shadow-bias={-0.0001} />
                  <directionalLight position={[-4, 8, -4]} intensity={0.4} />

                  {activeStep.canvasMode === 'particles' && <RawMaterialParticles />}

                  {activeStep.canvasMode === 'wireframe' && (
                    <group scale={[0.7, 0.7, 0.7]}>
                      <ShoeModel 
                        colorway="air" 
                        activeSection="craftsmanship" 
                        wireframe={true} 
                      />
                    </group>
                  )}

                  {activeStep.canvasMode === 'ghost' && (
                    <group scale={[0.7, 0.7, 0.7]}>
                      <ShoeModel 
                        colorway="air" 
                        activeSection="craftsmanship" 
                        ghost={true}
                        isExploded={true}
                      />
                    </group>
                  )}

                  {activeStep.canvasMode === 'final' && (
                    <group scale={[0.7, 0.7, 0.7]}>
                      <ShoeModel 
                        colorway="elite" 
                        activeSection="craftsmanship" 
                      />
                    </group>
                  )}

                  {activeStep.canvasMode !== 'particles' && (
                    <ContactShadows
                      position={[0, -0.65, 0]}
                      opacity={activeStep.canvasMode === 'ghost' ? 0.15 : 0.3}
                      scale={2.6}
                      blur={1.4}
                      far={1.4}
                    />
                  )}

                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    maxPolarAngle={Math.PI / 1.7}
                    minPolarAngle={Math.PI / 2.3}
                  />
                </Canvas>
              </div>
            )}
          </div>

          {/* Right Block: Scrolling Steps description */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              {STEPS.map((step) => {
                const isActive = activeStep.id === step.id;
                return (
                  <div
                    key={step.id}
                    onClick={() => handleStepChange(step)}
                    onKeyDown={(e) => handleKeyPress(e, step)}
                    role="button"
                    tabIndex={0}
                    className={`w-full p-5 border rounded-2xl flex items-start text-left gap-4 cursor-pointer transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                      isActive
                        ? 'bg-white border-white text-black shadow-lg shadow-white/5'
                        : 'bg-[#0b0b0d] border-white/5 text-white hover:border-white/20 hover:bg-white/[0.02]'
                    }`}
                    aria-label={`Step ${step.id + 1}: ${step.title}`}
                  >
                    <div className={`p-2.5 rounded-xl ${
                      isActive ? 'bg-black text-white' : 'bg-white/5 text-neutral-400'
                    }`}>
                      {step.icon}
                    </div>
                    
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-[8px] tracking-[0.25em] font-mono font-bold ${isActive ? 'text-neutral-700' : 'text-neutral-500'}`}>
                          {step.phase}
                        </span>
                      </div>
                      <h3 className="text-xs font-bold tracking-wider uppercase font-display">
                        {step.title}
                      </h3>
                      <p className={`text-[10px] ${isActive ? 'text-neutral-700 font-medium' : 'text-neutral-400'}`}>
                        {step.subtitle}
                      </p>
                      
                      {isActive && (
                        <p className="text-xs font-light text-neutral-800 leading-relaxed pt-2 transition-all duration-300">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
