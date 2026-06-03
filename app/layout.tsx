import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FALCON 7 — Engineered For Those Who Move Different",
  description: "Premium digital flagship store for Falcon 7 luxury performance sneakers. Experience innovation, speed, and craftsmanship.",
  openGraph: {
    title: "FALCON 7 — Elite Sneaker Experience",
    description: "Experience the next generation of performance footwear. Procedural 3D modeling, premium engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-black font-sans">
        {children}
      </body>
    </html>
  );
}
