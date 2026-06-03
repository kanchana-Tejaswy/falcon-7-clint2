# Falcon 7 Flagship Store — Comprehensive Codebase Context

Welcome to the official developer manual and architectural documentation for the **Falcon 7 Elite Digital Flagship Store**. 

This document serves as an exhaustive reference of the technical architecture, design philosophy, 3D math models, custom animation timelines, file directory configurations, and code implementation details. Refer to this manual to prevent loss of context during future feature updates or deployment cycles.

---

## 1. BRAND VISION & DESIGN PHILOSOPHY

Falcon 7 is built not as a commercial shop, but as an immersive flagship flagship experience. The design merges high-performance mechanical engineering aesthetics with premium luxury digital interactions.

### Inspiration & Design Language
- **Apple**: Clean typography, structural whitespace, subtle micro-reflections, interactive scroll declarations, and minimal visual borders.
- **Tesla & Porsche**: Industrial detail grids, aerodynamic lines, metallic chrome details, and technical spec tables.
- **Nike**: Bold focus on performance stats (weight, cushioning, carbon fiber spring plates) and athletic testimonials.
- **ChatGPT / Stripe**: Blur glassmorphism layers, floating lights, smooth hover transitions, and dark/light contrasting card groups.

### Color System System (Light Luxury)
Every color is applied intentionally to create breathing space (whitespace) and draw the user's focus directly to primary action components:
- **Base Backdrop**: `#FFFFFF` (Pure white for extreme clarity)
- **Secondary Backdrop**: `#F8F8F8` (Soft neutral grey to structure cards and secondary rows)
- **Accent Elements**: `#111111` (Near-black for solid titles, primary buttons, and heavy borders)
- **Text Primary**: `#000000` (Pure black for readability)
- **Support Text**: `#666666` (Medium grey for subtitles and descriptions)
- **Hover Accent**: `#222222` (Slightly lighter black for active states)
- **Luxury Silver**: `#E8E8E8` (Light hairline separator borders)
- **Gold Accent (Elite)**: `#D4AF37` (Special accent colorway detailing)

### Spacing Guidelines
All elements strictly adhere to a **4px-grid system** to maintain visual balance and layout consistency:
- `4px` (Tailwind `1` / spacing-1)
- `8px` (Tailwind `2` / spacing-2)
- `12px` (Tailwind `3` / spacing-3)
- `16px` (Tailwind `4` / spacing-4)
- `24px` (Tailwind `6` / spacing-6)
- `32px` (Tailwind `8` / spacing-8)
- `48px` (Tailwind `12` / spacing-12)
- `64px` (Tailwind `16` / spacing-16)
- `96px` (Tailwind `24` / spacing-24)
- `128px` (Tailwind `32` / spacing-32)

---

## 2. PROJECT ARCHITECTURE & DIRECTORY STRUCTURE

The project is built on **Next.js 15 (App Router)** utilizing TypeScript and Tailwind CSS v4. The directory structure is arranged cleanly at the root of the project to allow Next.js to compile pages directly without nesting overhead.

```
falcon-7-clint2/
├── .agents/                 # AI Agent rules files
│   └── rules/               # Design, animation, performance, and testing rules
├── app/                     # Next.js App Router Page layouts
│   ├── favicon.ico          # Browser Tab Icon
│   ├── layout.tsx           # Global HTML shell and SEO descriptors
│   └── page.tsx             # Root page coordinator
├── components/              # Reusable React components
│   ├── About.tsx            # Pillars list grid
│   ├── Comparison.tsx       # Specifications grid table
│   ├── Craftsmanship.tsx   # Cinematic R3F step storytelling
│   ├── Footer.tsx           # Newsletter form and secure checkouts
│   ├── Hero3D.tsx           # Full-screen interactive landing area
│   ├── Navbar.tsx           # Blur glass header
│   ├── ProductShowcase.tsx  # 360° inspector and details
│   ├── ShoeModel.tsx        # Procedural R3F meshes and materials
│   └── Technology.tsx       # Exploded tech diagram
├── public/                  # Static assets and lookbook photos
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   ├── window.svg
│   ├── sneaker_editorial_1.png # White sneaker portrait
│   ├── sneaker_editorial_2.png # Black sneaker on concrete steps
│   └── sneaker_editorial_3.png # Carbon fiber macro mesh
├── styles/                  # Tailwind config imports
│   └── globals.css          # Styling declarations and tokens
├── eslint.config.mjs        # ESLint rules
├── next.config.ts           # Next.js compiler parameters
├── package.json             # NPM dependencies registry
├── postcss.config.mjs       # Tailwind PostCSS compiler plugin
├── tsconfig.json            # TypeScript configuration
└── context.md               # This documentation manual
```

---

## 3. CORE FILE BREAKDOWN

### 3.1 Styling Configuration
- **File**: [globals.css](file:///c:/Users/v/OneDrive/Documents/falcon7%20clint%202/falcon-7-clint2/styles/globals.css)
- **Purpose**: Imports Tailwind CSS v4, overrides defaults, defines custom display font variables, and sets utility classes.
- **Key Definitions**:
  - Theme colors configured via Tailwind `@theme`: `--color-luxury-white`, `--color-luxury-bg-sec`, `--color-luxury-accent`, `--color-luxury-text`, `--color-luxury-support`, etc.
  - Utility `.glassmorphism` and `.glassmorphism-dark` for backdrop blur panels.
  - Utility `.text-stroke-luxury` and `.text-stroke-luxury-white` for custom outline headers.
  - Custom scrollbars configured globally under `::-webkit-scrollbar` with an extra thin width of `6px` and a black active scroll thumb.

### 3.2 Root Layout
- **File**: [layout.tsx](file:///c:/Users/v/OneDrive/Documents/falcon7%20clint%202/falcon-7-clint2/app/layout.tsx)
- **Purpose**: Defines the basic HTML structure, imports variables from Google Fonts, and overrides SEO metadata parameters.
- **Key Details**:
  - Loads **Inter** for default body text.
  - Loads **Plus Jakarta Sans** for headers.
  - Formulates the global title: `FALCON 7 — Engineered For Those Who Move Different` and configures descriptive OG tags for social embeds.

### 3.3 Main Page Coordination
- **File**: [page.tsx](file:///c:/Users/v/OneDrive/Documents/falcon7%20clint%202/falcon-7-clint2/app/page.tsx)
- **Purpose**: Serves as the page assembler. It wraps the entire application sections under a client wrapper to execute smooth scroll navigation correctly.

---

## 4. COMPONENT TECHNICAL SPECIFICATIONS

### 4.1 ShoeModel (3D R3F Engine)
- **File**: [ShoeModel.tsx](file:///c:/Users/v/OneDrive/Documents/falcon7%20clint%202/falcon-7-clint2/components/ShoeModel.tsx)
- **Purpose**: Generates the high-fidelity 3D sneaker mesh procedurally using Three.js primitive geometries.
- **Inputs (Props)**:
  - `colorway`: Maps color palettes for the 6 shoes (Air, Velocity, Phantom, Elite, Runner, Urban).
  - `activeSection`: Updates rotational movement speeds.
  - `isExploded`: Offsets mesh positions to showcase internal parts.
  - `wireframe`: Renders meshes as blueprints.
  - `ghost`: Renders meshes in transparent overlays (opacity `0.2`).
- **Mesh Assembly Details**:
  - *Outsole*: Box primitive (`[1.5, 0.08, 0.6]`) and curved toe/heel boxes with rough grip material.
  - *Midsole*: Nitrogren-infused foam block (`[1.54, 0.12, 0.62]`) and heel curves.
  - *Carbon Plate*: Thin carbon composite plate (`[1.2, 0.02, 0.5]`) with high metalness and low roughness.
  - *Upper Body*: Performance mesh box (`[1.48, 0.26, 0.58]`).
  - *Heel Counter*: Sleek metallic bracket (`[0.18, 0.32, 0.52]`) with chrome reflectance.
  - *Laces*: Group of cylinder primitives crossing over the front collar.
  - *Logo*: Side-mounted custom "7" shape constructed of grouped boxes.

### 4.2 Navbar
- **File**: [Navbar.tsx](file:///c:/Users/v/OneDrive/Documents/falcon7%20clint%202/falcon-7-clint2/components/Navbar.tsx)
- **Purpose**: Transitions header styling from transparent to a blur glassmorphism bar on scroll.
- **Key Details**:
  - Uses `window.scrollY > 48` hook to trigger scrolled state.
  - Implements keyboard focus states and smooth scroll function to scroll pages to custom offsets (`elementPosition - 80px`).

### 4.3 Hero3D
- **File**: [Hero3D.tsx](file:///c:/Users/v/OneDrive/Documents/falcon7%20clint%202/falcon-7-clint2/components/Hero3D.tsx)
- **Purpose**: Renders the landing screen with floating particles and cursor tilt parallax.
- **Key Details**:
  - *Floating Particles*: Custom R3F `<points>` geometry rendering 64 floating buffer vertices.
  - *Cursor Tilt*: Listens to mouse movements, converting page coordinate offsets to radians (`mousePos.x * 0.5`, `mousePos.y * 0.5`) to rotate the sneaker model towards the mouse.
  - Includes full ambient, directional, spot, and point lights to cast clean contact shadows.

### 4.4 ProductShowcase
- **File**: [ProductShowcase.tsx](file:///c:/Users/v/OneDrive/Documents/falcon7%20clint%202/falcon-7-clint2/components/ProductShowcase.tsx)
- **Purpose**: Renders the 360° inspector and maps specifications for the 6 sneaker models.
- **Key Details**:
  - Displays specs (cushion foam types, materials, colorways, performance stats, weight).
  - Includes a fallback animated pulse loading wrapper during 3D Canvas initialization (`onCreated` resets loading state).
  - Handles keyboard selector tabs with `onKeyDown` triggers.

### 4.5 Technology
- **File**: [Technology.tsx](file:///c:/Users/v/OneDrive/Documents/falcon7%20clint%202/falcon-7-clint2/components/Technology.tsx)
- **Purpose**: Illustrates structural details of the 5 core features in an exploded view.
- **Key Details**:
  - Highlights specific shoe parts when hovering or selecting features.
  - Communicates with `ShoeModel` via the `isExploded` prop.

### 4.6 Craftsmanship
- **File**: [Craftsmanship.tsx](file:///c:/Users/v/OneDrive/Documents/falcon7%20clint%202/falcon-7-clint2/components/Craftsmanship.tsx)
- **Purpose**: Steps through the 4-phase build timeline.
- **Key Details**:
  - Modifies the 3D Canvas model dynamically:
    - *Phase 01*: Floating atomic wave particles.
    - *Phase 02*: Technical blue wireframe mesh.
    - *Phase 03*: Transparent ghost components displaying carbon plate insertion.
    - *Phase 04*: Gilded elite sneaker rotating.

### 4.7 Comparison
- **File**: [Comparison.tsx](file:///c:/Users/v/OneDrive/Documents/falcon7%20clint%202/falcon-7-clint2/components/Comparison.tsx)
- **Purpose**: Compares performance stats against competitors in a clean, responsive layout.

### 4.8 Testimonials
- **File**: [Testimonials.tsx](file:///c:/Users/v/OneDrive/Documents/falcon7%20clint%202/falcon-7-clint2/components/Testimonials.tsx)
- **Purpose**: Implements an interactive review slider for athletes, creators, and professionals.

### 4.9 About
- **File**: [About.tsx](file:///c:/Users/v/OneDrive/Documents/falcon7%20clint%202/falcon-7-clint2/components/About.tsx)
- **Purpose**: Displays brand vision, Munich design philosophy, and sustainable production guidelines.

### 4.10 Gallery
- **File**: [Gallery.tsx](file:///c:/Users/v/OneDrive/Documents/falcon7%20clint%202/falcon-7-clint2/components/Gallery.tsx)
- **Purpose**: Displays the lookbook using generated images with aligned heights (Row 1 at `480px`, Row 2 at `360px`).

### 4.11 Footer
- **File**: [Footer.tsx](file:///c:/Users/v/OneDrive/Documents/falcon7%20clint%202/falcon-7-clint2/components/Footer.tsx)
- **Purpose**: Standard multi-column link grid with newsletter subscription validation and loading timers.

---

## 5. RE-COMPILING & DEVELOPER VERIFICATION

Perform the following commands to check, build, and deploy the application:

1. **Local Development**:
   ```bash
   npm run dev
   ```
   Serves the dev server at `http://localhost:3000`.

2. **Production Compilation**:
   ```bash
   npm run build
   ```
   Compiles layouts and assets to a static build. Ensure that no TypeScript compilation errors occur.

3. **Code Auditing & Linting**:
   ```bash
   npm run lint
   ```
   Runs ESLint checks on components.

*Note: All future additions must preserve the 4px-grid spacing system and the keyboard focus-visible standards documented in the design rules.*
