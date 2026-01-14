import type { Metadata } from 'next';
import { Orbitron, Playfair_Display, Bebas_Neue, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
  fallback: ['system-ui', 'arial'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
});

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
  fallback: ['Impact', 'Arial Black', 'sans-serif'],
});

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
  preload: false, // Disable preload to avoid build-time download issues
});

export const metadata: Metadata = {
  title: 'Claude All In',
  description: 'AI-powered gambling and trading assistants',
    generator: 'v0.app'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${playfair.variable} ${bebas.variable} ${cormorant.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
