// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ThreeDCanvas from '@/components/layout/ThreeDCanvas';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ruturaj Ghumkar - Software Engineer Portfolio',
  description: 'Ruturaj Ghumkar is a software engineer passionate about building practical, user-friendly solutions. Explore my work experience, projects, and connect with me.',
  keywords: ['Ruturaj Ghumkar', 'Software Engineer', 'Portfolio', 'Next.js', 'React', 'Three.js', 'Frontend', 'Fullstack'],
  openGraph: {
    title: 'Ruturaj Ghumkar - Software Engineer Portfolio',
    description: 'Ruturaj Ghumkar is a software engineer passionate about building practical, user-friendly solutions. Explore my work experience, projects, and connect with me.',
    url: 'https://yourportfolio.com', // Replace with your actual URL
    siteName: 'Ruturaj Ghumkar Portfolio',
    images: [
      {
        url: 'https://drive.google.com/file/d/1MZ_D_4idBZBUspiUw41et2XzFu_EtCjY/view?usp=sharing', // Replace with a more appealing image
        width: 1200,
        height: 630,
        alt: 'Ruturaj Ghumkar Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ruturaj Ghumkar - Software Engineer Portfolio',
    description: 'Ruturaj Ghumkar is a software engineer passionate about building practical, user-friendly solutions. Explore my work experience, projects, and connect with me.',
    images: ['https://via.placeholder.com/1200x675/8a2be2/ffffff?text=Ruturaj+Ghumkar+Portfolio+Twitter'], // Replace with a more appealing image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <Suspense fallback={null}>
          <ThreeDCanvas />
        </Suspense>
        <Header />
        <main className="relative z-10"> {/* Ensure main content is above 3D background */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}