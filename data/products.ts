export interface ShoeData {
  id: 'air' | 'velocity' | 'phantom' | 'elite' | 'runner' | 'urban';
  name: string;
  tagline: string;
  description: string;
  weight: string;
  cushion: string;
  materials: string;
  colorways: string;
  price: string;
  perfScore: number;
  comfortRating: number;
  bgHex: string;
  technicalSpecs: {
    energyReturn: string;
    chassis: string;
    durability: string;
    stability: string;
    breathability: string;
    traction: string;
  };
}

export const SHOES: ShoeData[] = [
  {
    id: 'air',
    name: 'Falcon 7 Air',
    tagline: 'Breathing Performance',
    description: 'Designed for maximal thermal management and lightweight efficiency. The Air silhouette utilizes a proprietary open-weave mesh matrix that regulates internal temperatures during high-intensity training. Every fiber is engineered for airflow.',
    weight: '240g',
    cushion: 'AirFlow Active Foam',
    materials: 'AeroGrid Knit, Micro-Filament TPU, Recycled Polymer',
    colorways: 'Pure White / Ice Silver / Dark Void',
    price: '$180.00',
    perfScore: 9.7,
    comfortRating: 9.8,
    bgHex: 'bg-neutral-50',
    technicalSpecs: {
      energyReturn: '88% (Nitrogen-Infused)',
      chassis: 'Aero-Integrated 3D Carbon Plate',
      durability: '1000+ Miles (AeroGrid Tech)',
      stability: 'Adaptive High-Speed Support',
      breathability: 'Extreme (9.9/10)',
      traction: 'Precision Dry-Surface Grip',
    },
  },
  {
    id: 'velocity',
    name: 'Falcon 7 Vector',
    tagline: 'Speed Redefined',
    description: 'Engineered for explosive acceleration and linear power. Features a double-stiffened carbon plate with a forward-bias geometry to spring the athlete into their next stride with minimal energy loss.',
    weight: '235g',
    cushion: 'Energy Return Foam v2',
    materials: 'DynaWeave Poly, Aero Carbon Plate, Synthetic Overlays',
    colorways: 'Midnight Onyx / Chrome Gold / Stealth Grey',
    price: '$220.00',
    perfScore: 9.9,
    comfortRating: 9.4,
    bgHex: 'bg-neutral-900 text-white',
    technicalSpecs: {
      energyReturn: '92% (Propulsion V2 Logic)',
      chassis: 'Double-Stiffened Linear Carbon',
      durability: '850 Miles (Performance Bias)',
      stability: 'Linear Forward Bias Geometry',
      breathability: 'High (8.8/10)',
      traction: 'Track-Inspired Compound',
    },
  },
  {
    id: 'phantom',
    name: 'Falcon 7 Phantom',
    tagline: 'Silent Momentum',
    description: 'A stealth-profile silhouette optimized for night runs and urban environments. Features vibration dampening nodes inside the chassis and 360° reflective micro-threads for visibility and acoustic suppression.',
    weight: '248g',
    cushion: 'Impact Shield Core',
    materials: 'VibraDamp Synth, Shadow Mesh, Reflective Carbon',
    colorways: 'Grey Shadow / Flat Platinum / Neon Ghost',
    price: '$195.00',
    perfScore: 9.6,
    comfortRating: 9.7,
    bgHex: 'bg-zinc-100',
    technicalSpecs: {
      energyReturn: '84% (Acoustic Dampening)',
      chassis: 'Stealth-Core Carbon Matrix',
      durability: '900 Miles (Urban Surface)',
      stability: 'Omni-Directional Urban Agility',
      breathability: 'Medium-High (8.5/10)',
      traction: 'Wet-Pavement Specialized',
    },
  },
  {
    id: 'elite',
    name: 'Falcon 7 Elite',
    tagline: 'The Pinnacle of Luxury',
    description: 'Handcrafted gold detailing combined with a premium grade chassis. The ultimate expression of status and supreme comfort, utilizing rare material blends and gilded carbon webbing for unparalleled refinement.',
    weight: '260g',
    cushion: 'Hybrid Dual-Foam Cush',
    materials: 'Vegan Nubuck, Gilded Carbon Webbing, Premium Mesh',
    colorways: 'Gilded White / Royal Obsidian / Champagne Gold',
    price: '$350.00',
    perfScore: 9.5,
    comfortRating: 9.9,
    bgHex: 'bg-neutral-50',
    technicalSpecs: {
      energyReturn: '86% (Dual-Density Luxury)',
      chassis: 'Gilded Carbon Composite Plate',
      durability: '1200+ Miles (Reinforced)',
      stability: 'Maximum Luxury Support Frame',
      breathability: 'Optimized (9.0/10)',
      traction: 'Multi-Surface Hybrid Grip',
    },
  },
  {
    id: 'runner',
    name: 'Runner Pro',
    tagline: 'Endurance Unleashed',
    description: 'Built for ultra-marathons and high-mileage training. Multi-density cushioning systems prevent biomechanical fatigue and stabilize the ankle joints through extended gait cycles.',
    weight: '255g',
    cushion: 'EnduraGrid Cushioning',
    materials: 'TendonGrip Fabric, Anti-Slip Base, High-Density Foam',
    colorways: 'Cobalt Blue / Neon Bolt / Racing Red',
    price: '$210.00',
    perfScore: 9.8,
    comfortRating: 9.6,
    bgHex: 'bg-blue-50/20',
    technicalSpecs: {
      energyReturn: '82% (Endurance-Tuned)',
      chassis: 'Stabilizer Arch Carbon Frame',
      durability: '1500+ Miles (Maximum)',
      stability: 'Ankle-Lock Lateral Stability',
      breathability: 'Zonal Ventilation (9.2/10)',
      traction: 'Long-Wear Rubber Compound',
    },
  },
  {
    id: 'urban',
    name: 'Urban X',
    tagline: 'All-Terrain Expression',
    description: 'Street-ready styling fused with elite trail traction. Weatherproof HydraShield coating repels elements while retaining internal breathability for versatile all-weather performance.',
    weight: '268g',
    cushion: 'Smart Grip Response Foam',
    materials: 'HydraShield Nylon, Vulcanized Rubber, Reinforced Toe',
    colorways: 'Crimson Ember / Stealth Ash / Forest Moss',
    price: '$185.00',
    perfScore: 9.5,
    comfortRating: 9.6,
    bgHex: 'bg-red-50/10',
    technicalSpecs: {
      energyReturn: '80% (Response-Bias)',
      chassis: 'Flexible All-Terrain Carbon Plate',
      durability: '1100 Miles (Ruggedized)',
      stability: 'Rugged Surface Control Nodes',
      breathability: 'Weatherproofed (8.0/10)',
      traction: 'Multi-Terrain Aggressive Lugs',
    },
  },
];
