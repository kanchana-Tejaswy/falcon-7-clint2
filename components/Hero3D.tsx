'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { ArrowRight, Play } from 'lucide-react';
import ShoeModel from './ShoeModel';
import * as THREE from 'three';

// Custom floating particles/geometry for the background
function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.04;
    pointsRef.current.rotation.x = time * 0.02;
  });

  const particleCount = 64;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8; // x
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8; // z
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#888888"
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.3}
      />
    </points>
  );
}

export default function Hero3D() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 0.4,
        y: -(e.clientY / window.innerHeight - 0.5) * 0.4,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleExploreClick = () => {
    const element = document.getElementById('collection');
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

  return (
    <section id="home" className="relative w-full min-h-screen bg-white flex flex-col justify-center items-center overflow-hidden pt-24">
      {/* Immersive Background Blur Shapes */}
      <div className="absolute top-[20%] left-[10%] w-[32rem] h-[32rem] rounded-full bg-neutral-100 blur-[128px] opacity-70 -z-10" />
      <div className="absolute bottom-[10%] right-[10%] w-[48rem] h-[48rem] rounded-full bg-neutral-50 blur-[160px] opacity-80 -z-10" />

      {/* Grid Overlay for Premium Apple-Style Aesthetics */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[calc(100vh-96px)] z-10">
        
        {/* Left Column: Premium Text Content */}
        <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left space-y-8 select-none order-2 lg:order-1 pt-6 lg:pt-0">
          <div className="space-y-4">
            <span className="inline-block text-[10px] tracking-[0.4em] uppercase text-luxury-support font-semibold">
              FALCON 7 / D107 PERFORMANCE
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-light tracking-tight leading-[0.9] text-black">
              FALCON 7
            </h1>
            <p className="text-xl md:text-2xl font-light text-luxury-support font-display tracking-tight leading-relaxed max-w-xl mx-auto lg:mx-0">
              Engineered For Those Who Move Different.
            </p>
          </div>

          <p className="text-sm md:text-base font-light text-luxury-support leading-relaxed max-w-lg mx-auto lg:mx-0">
            Premium luxury athletic footwear designed at the intersection of aerospace aerodynamics and performance engineering. Fully custom responsive chassis, impact-absorbing carbon architecture, and custom micro-weave mesh.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <button
              onClick={handleExploreClick}
              className="w-full sm:w-auto px-8 py-4 bg-black text-white hover:bg-luxury-hover text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-sm border border-black focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 outline-none"
            >
              Explore Collection
            </button>
            <button
              onClick={() => document.getElementById('technology')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-black hover:bg-neutral-50 text-xs font-semibold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 border border-luxury-silver focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 outline-none"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>Watch Technology</span>
            </button>
          </div>

          {/* Dynamic spec indicators */}
          <div className="grid grid-cols-3 gap-6 border-t border-luxury-silver pt-8 max-w-md mx-auto lg:mx-0">
            <div>
              <p className="text-2xl font-display font-extralight text-black">240g</p>
              <p className="text-[10px] tracking-wider text-luxury-support uppercase font-semibold mt-1">Ultra Light</p>
            </div>
            <div>
              <p className="text-2xl font-display font-extralight text-black">88%</p>
              <p className="text-[10px] tracking-wider text-luxury-support uppercase font-semibold mt-1">Energy Return</p>
            </div>
            <div>
              <p className="text-2xl font-display font-extralight text-black">100%</p>
              <p className="text-[10px] tracking-wider text-luxury-support uppercase font-semibold mt-1">Carbon Plate</p>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Shoe Interactive Model */}
        <div className="lg:col-span-6 h-[400px] md:h-[480px] lg:h-[576px] w-full relative flex items-center justify-center order-1 lg:order-2">
          {/* Subtle instructions */}
          <div className="absolute top-4 right-4 text-[9px] tracking-widest text-luxury-support uppercase pointer-events-none select-none glassmorphism px-4 py-2 rounded-full">
            360° Drag & Track Interactive
          </div>

          {mounted && (
            <div className="w-full h-full relative">
              <Canvas
                shadows
                camera={{ position: [0, 0.2, 2.4], fov: 45 }}
                className="w-full h-full cursor-grab active:cursor-grabbing"
              >
                {/* Clean Luxury Studio Lighting */}
                <ambientLight intensity={0.9} />
                <directionalLight
                  position={[5, 10, 5]}
                  intensity={1.5}
                  castShadow
                  shadow-mapSize={[1024, 1024]}
                  shadow-bias={-0.0001}
                />
                <pointLight position={[-5, 5, -5]} intensity={0.5} />
                <spotLight
                  position={[0, 5, 0]}
                  intensity={1.2}
                  angle={0.6}
                  penumbra={0.8}
                  castShadow
                />

                {/* Sneaker Model Group with Mouse Tilt Parallax */}
                <group
                  rotation={[
                    mousePos.y * 0.5, 
                    mousePos.x * 0.5, 
                    0
                  ]}
                  position={[0, 0.1, 0]}
                >
                  <ShoeModel colorway="air" activeSection="hero" />
                </group>

                {/* Floating particles */}
                <FloatingParticles />

                {/* Dynamic Shadow plane beneath shoe */}
                <ContactShadows
                  position={[0, -0.65, 0]}
                  opacity={0.35}
                  scale={3}
                  blur={1.5}
                  far={1.5}
                />
                
                {/* Enable users to manually drag */}
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
      </div>
    </section>
  );
}
