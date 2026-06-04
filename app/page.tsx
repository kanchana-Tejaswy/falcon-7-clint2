'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero3D from '../components/Hero3D';
import ProductShowcase from '../components/ProductShowcase';
import Technology from '../components/Technology';
import Craftsmanship from '../components/Craftsmanship';
import Comparison from '../components/Comparison';
import Testimonials from '../components/Testimonials';
import About from '../components/About';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';

export default function Home() {
  const [selectedShoeId, setSelectedShoeId] = useState<string>('air');

  const handleExploreShoe = (shoeId: string) => {
    if (shoeId === 'air') {
      window.open('https://openai.com', '_blank');
      return;
    }
    if (shoeId === 'velocity') {
      window.open('https://vector.dev', '_blank');
      return;
    }

    setSelectedShoeId(shoeId);
    
    // Scroll to collection showcase
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

  const handleWatchTech = (shoeId: string) => {
    if (shoeId === 'air') {
      window.open('https://openai.com', '_blank');
      return;
    }
    if (shoeId === 'velocity') {
      window.open('https://vector.dev', '_blank');
      return;
    }

    setSelectedShoeId(shoeId);

    // Scroll to technology showcase
    const element = document.getElementById('technology');
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
    <div className="min-h-screen bg-[#030303] text-[#f5f5f7] font-sans antialiased">
      {/* Premium Navigation Header */}
      <Navbar />

      {/* Main Flagship Content Scroll */}
      <main className="w-full flex flex-col">
        {/* Hero Section */}
        <Hero3D onExploreClick={handleExploreShoe} onWatchTechClick={handleWatchTech} />

        {/* Product Showcase */}
        <ProductShowcase activeShoeId={selectedShoeId} />

        {/* Technology & Exploded view */}
        <Technology activeShoeId={selectedShoeId} />

        {/* Manufacturing Craftsmanship */}
        <Craftsmanship />

        {/* Spec Comparison Matrix */}
        <Comparison />

        {/* Testimonials */}
        <Testimonials />

        {/* Brand Vision & About */}
        <About />

        {/* Editorial Media Gallery */}
        <Gallery />
      </main>

      {/* Flagship Footer */}
      <Footer />
    </div>
  );
}
