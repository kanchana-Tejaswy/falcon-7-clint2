'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ShoeModelProps {
  colorway?: 'air' | 'velocity' | 'phantom' | 'elite' | 'runner' | 'urban';
  hovered?: boolean;
  activeSection?: string;
  isExploded?: boolean;
  wireframe?: boolean;
  ghost?: boolean;
}

export default function ShoeModel({
  colorway = 'air',
  hovered = false,
  activeSection = 'hero',
  isExploded = false,
  wireframe = false,
  ghost = false,
}: ShoeModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Define colors based on the colorway
  const colors = {
    air: {
      primary: '#FFFFFF',
      mesh: '#E5E5E5',
      accent: '#000000',
      sole: '#F3F3F3',
      cushion: '#D1D5DB',
      logo: '#111111',
      plate: '#9CA3AF',
    },
    velocity: {
      primary: '#111111',
      mesh: '#262626',
      accent: '#FFFFFF',
      sole: '#1A1A1A',
      cushion: '#374151',
      logo: '#FFFFFF',
      plate: '#4B5563',
    },
    phantom: {
      primary: '#E5E7EB',
      mesh: '#D1D5DB',
      accent: '#9CA3AF',
      sole: '#F9FAFB',
      cushion: '#E5E7EB',
      logo: '#111111',
      plate: '#111111',
    },
    elite: {
      primary: '#FFFFFF',
      mesh: '#E5E7EB',
      accent: '#D4AF37', // Gold accent
      sole: '#FAFAFA',
      cushion: '#ECECEC',
      logo: '#D4AF37',
      plate: '#D4AF37',
    },
    runner: {
      primary: '#F9FAFB',
      mesh: '#E5E7EB',
      accent: '#3B82F6', // Blue performance
      sole: '#F3F4F6',
      cushion: '#E5E7EB',
      logo: '#3B82F6',
      plate: '#2563EB',
    },
    urban: {
      primary: '#1F2937',
      mesh: '#374151',
      accent: '#EF4444', // Red urban accent
      sole: '#111827',
      cushion: '#1F2937',
      logo: '#EF4444',
      plate: '#EF4444',
    },
  }[colorway];

  // Animation loop for shoe floating & slight rotate
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Slow float in space
    if (activeSection === 'hero') {
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.12 - 0.2;
      groupRef.current.rotation.y = time * 0.15;
      groupRef.current.rotation.x = Math.sin(time * 0.4) * 0.05 + 0.1;
      groupRef.current.rotation.z = Math.cos(time * 0.4) * 0.03;
    } else if (activeSection === 'showcase' || activeSection === 'craftsmanship') {
      groupRef.current.position.y = Math.sin(time * 1.2) * 0.05;
      groupRef.current.rotation.y = time * 0.25;
    }
  });

  // Exploded view spacing offset
  const expOffset = isExploded ? 0.35 : 0;

  // Render materials helper to keep styling DRY and flexible for wireframe & ghost modes
  const getMaterial = (color: string, roughness: number = 0.5, metalness: number = 0.1) => {
    return (
      <meshStandardMaterial
        color={color}
        roughness={ghost ? 0.9 : roughness}
        metalness={ghost ? 0.0 : metalness}
        wireframe={wireframe}
        transparent={ghost}
        opacity={ghost ? 0.2 : 1.0}
      />
    );
  };

  return (
    <group ref={groupRef} dispose={null} scale={[1.7, 1.7, 1.7]}>
      {/* 1. OUTSOLE (Bottom Grid Grip) */}
      <mesh position={[0, -0.35 - expOffset * 1.5, 0]}>
        <boxGeometry args={[1.5, 0.08, 0.6]} />
        {getMaterial(colors.sole, 0.9, 0.1)}
      </mesh>

      {/* Outsole curves at the front */}
      <mesh position={[0.7, -0.32 - expOffset * 1.5, 0]} rotation={[0, 0, 0.15]}>
        <boxGeometry args={[0.3, 0.08, 0.6]} />
        {getMaterial(colors.sole, 0.9, 0.1)}
      </mesh>
      
      {/* Outsole curves at the back */}
      <mesh position={[-0.7, -0.31 - expOffset * 1.5, 0]} rotation={[0, 0, -0.08]}>
        <boxGeometry args={[0.2, 0.08, 0.58]} />
        {getMaterial(colors.sole, 0.9, 0.1)}
      </mesh>

      {/* 2. MIDSOLE (Energy Return Foam Layer) */}
      <mesh position={[0, -0.26 - expOffset, 0]}>
        <boxGeometry args={[1.54, 0.12, 0.62]} />
        {getMaterial(colors.cushion, 0.7, 0.05)}
      </mesh>
      <mesh position={[0.7, -0.22 - expOffset, 0]} rotation={[0, 0, 0.18]}>
        <boxGeometry args={[0.3, 0.12, 0.62]} />
        {getMaterial(colors.cushion, 0.7, 0.05)}
      </mesh>
      <mesh position={[-0.72, -0.22 - expOffset, 0]} rotation={[0, 0, -0.1]}>
        <boxGeometry args={[0.22, 0.14, 0.6]} />
        {getMaterial(colors.cushion, 0.7, 0.05)}
      </mesh>

      {/* 3. CARBON FIBER PLATE (Luxury Stability Layer) */}
      <mesh position={[0.05, -0.19 - expOffset * 0.5, 0]}>
        <boxGeometry args={[1.2, 0.02, 0.5]} />
        {getMaterial(colors.plate, 0.2, 0.95)}
      </mesh>

      {/* 4. MAIN SHOE UPPER (Performance Mesh & Body) */}
      <mesh position={[0, -0.06, 0]}>
        <boxGeometry args={[1.48, 0.26, 0.58]} />
        {getMaterial(colors.mesh, 0.8, 0.1)}
      </mesh>

      {/* Toe Cap Curve */}
      <mesh position={[0.62, -0.12, 0]} rotation={[0, 0, 0.35]}>
        <boxGeometry args={[0.35, 0.22, 0.52]} />
        {getMaterial(colors.primary, 0.5, 0.1)}
      </mesh>

      {/* Ankle Collar & Tongue Area */}
      <mesh position={[-0.32, 0.15 + expOffset * 0.5, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.65, 0.38, 0.5]} />
        {getMaterial(colors.primary, 0.6, 0.1)}
      </mesh>
      
      {/* Back Heel Counter (Luxury Porsche-style Chrome Trim) */}
      <mesh position={[-0.72, -0.02 + expOffset * 0.8, 0]} rotation={[0, 0, -0.15]}>
        <boxGeometry args={[0.18, 0.32, 0.52]} />
        {getMaterial(colors.accent, 0.15, 0.8)}
      </mesh>

      {/* 5. LACES (Woven Details) */}
      <group position={[0.18, 0.16 + expOffset, 0]} rotation={[0, 0, -0.28]}>
        <mesh position={[0, 0, 0.12]}>
          <cylinderGeometry args={[0.015, 0.015, 0.3]} />
          {getMaterial(colors.accent, 0.5, 0.1)}
        </mesh>
        <mesh position={[0, 0, -0.12]}>
          <cylinderGeometry args={[0.015, 0.015, 0.3]} />
          {getMaterial(colors.accent, 0.5, 0.1)}
        </mesh>
        
        <mesh position={[0.15, -0.08, 0.08]} rotation={[0.4, 0.4, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.25]} />
          {getMaterial(colors.accent, 0.5, 0.1)}
        </mesh>
        <mesh position={[0.15, -0.08, -0.08]} rotation={[-0.4, -0.4, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.25]} />
          {getMaterial(colors.accent, 0.5, 0.1)}
        </mesh>

        <mesh position={[-0.15, 0.08, 0.08]} rotation={[-0.3, 0.3, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.25]} />
          {getMaterial(colors.accent, 0.5, 0.1)}
        </mesh>
        <mesh position={[-0.15, 0.08, -0.08]} rotation={[0.3, -0.3, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.25]} />
          {getMaterial(colors.accent, 0.5, 0.1)}
        </mesh>
      </group>

      {/* 6. FALCON 7 SIGNATURE WING LOGO (Chrome Side Accent) */}
      <group position={[0.1, -0.02, 0.292]} rotation={[0, 0, -0.05]}>
        <mesh position={[0, 0.05, 0]} rotation={[0, 0, -0.1]}>
          <boxGeometry args={[0.4, 0.025, 0.01]} />
          {getMaterial(colors.logo, 0.1, 0.9)}
        </mesh>
        <mesh position={[-0.1, -0.02, 0]} rotation={[0, 0, 0.9]}>
          <boxGeometry args={[0.18, 0.022, 0.01]} />
          {getMaterial(colors.logo, 0.1, 0.9)}
        </mesh>
      </group>

      {/* Inner Logo (Opposite Side) */}
      <group position={[0.1, -0.02, -0.292]} rotation={[0, 0, -0.05]}>
        <mesh position={[0, 0.05, 0]} rotation={[0, 0, -0.1]}>
          <boxGeometry args={[0.4, 0.025, 0.01]} />
          {getMaterial(colors.logo, 0.1, 0.9)}
        </mesh>
        <mesh position={[-0.1, -0.02, 0]} rotation={[0, 0, 0.9]}>
          <boxGeometry args={[0.18, 0.022, 0.01]} />
          {getMaterial(colors.logo, 0.1, 0.9)}
        </mesh>
      </group>
    </group>
  );
}
