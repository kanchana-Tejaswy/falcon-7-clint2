'use client';

import React from 'react';
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
  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased">
      {/* Premium Navigation Header */}
      <Navbar />

      {/* Main Flagship Content Scroll */}
      <main className="w-full flex flex-col">
        {/* Hero Section */}
        <Hero3D />

        {/* Product Showcase */}
        <ProductShowcase />

        {/* Technology & Exploded view */}
        <Technology />

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
