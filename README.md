# Falcon 7 (Clint 2.0) - Premium Design System

> **Note:** This project uses **Vercel** for deployment and **Framer Motion** for animations. It requires **Node.js** and **npm**.

## 🚀 Getting Started

### Prerequisites

- **Node.js** (18+ recommended)
- **npm** (usually comes with Node.js)
- **Git** (for version control)

### Installation

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd falcon-7-clint2
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

### Development

1. **Start the development server:**

    ```bash
    npm run dev
    ```

    The site will be accessible at `http://localhost:3000`.

2. **Build for production:**

    ```bash
    npm run build
    ```

## 🚀 Deployment (Vercel)

This project is configured for one-click deployment to Vercel.

1. **Import to Vercel:**
    Click the button below to import the project directly to your Vercel dashboard:

    [![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/falcon-7-clint2)

    *(Note: Replace the link with the actual GitHub repo URL if you fork this project)*

2. **Alternative:**
    - Sign in to Vercel.
    - Click "Add New" -> "Project".
    - Import the repository.
    - Vercel will automatically detect the framework (Next.js) and build settings.
    - Click "Deploy".

### Environment Variables

No environment variables are required for this project.

### Production Build

Vercel will automatically run `npm run build` and serve the static output.

## 🛠️ Technologies Used

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## 📂 Project Structure

```
falcon-7-clint2/
├── app/                     # Next.js App Router
│   ├── layout.tsx           # Root layout with global styles
│   ├── page.tsx             # Home page
│   ├── favicon.ico          # Favicon
│   └── ...                  # Other pages
├── components/              # Reusable React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── FeatureSection.tsx
│   └── ...
├── public/                  # Static assets
├── styles/                  # Global styles and Tailwind config
│   └── globals.css
├── utils/                   # Utility functions
├── package.json             # Project dependencies
└── next.config.ts           # Next.js configuration
```

## 🎨 Design System

This project implements a premium design system with:

- **Typography**: Inter font with a modular scale
- **Color Palette**: Custom dark theme with glassmorphism effects
- **Spacing**: 4px-based spacing system
- **Layout**: Responsive grid system
- **Animations**: Physics-based animations with Framer Motion

## 🤝 Contributing

1. Create a feature branch:

    ```bash
    git checkout -b feature/add-new-section
    ```

2. Make your changes

3. Test thoroughly

4. Submit a pull request

## 📝 License

This project is licensed under the MIT License.
