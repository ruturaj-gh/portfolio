// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { FiMenu, FiX } from 'react-icons/fi'; // Importing icons for hamburger and close

interface NavLink {
  id: string;
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { id: 'hero', name: 'Home', href: '#hero' },
  { id: 'experience', name: 'Experience', href: '#experience' },
  { id: 'projects', name: 'Projects', href: '#projects' },
  { id: 'resume', name: 'Resume', href: '#resume' },
  { id: 'contact', name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const pathname = usePathname();
  const activeSection = useScrollSpy(navLinks.map(link => link.id), { offset: 100 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when a link is clicked or route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname, activeSection]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-gradient-to-r from-purple-900 to-indigo-900 bg-opacity-80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="#hero" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-600 hover:from-cyan-300 hover:to-fuchsia-500 transition-colors duration-300">
          RG
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                className={`relative text-lg font-medium transition-colors duration-300
                  ${activeSection === link.id || (pathname === '/' && link.id === 'hero' && !activeSection)
                    ? 'text-cyan-400 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-cyan-400 after:w-full'
                    : 'text-gray-300 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300'
                  }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white text-3xl focus:outline-none">
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden absolute top-full h-[100vh] left-0 right-0 bg-gradient-to-b from-purple-900 to-indigo-900 shadow-lg pb-4`}
          >
            <ul className="h-[70%] justify-around flex flex-col items-center space-y-4 pt-4">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    onClick={toggleMenu} // Close menu on link click
                    className={`relative text-xl font-medium transition-colors duration-300 py-2
                      ${activeSection === link.id || (pathname === '/' && link.id === 'hero' && !activeSection)
                        ? 'text-cyan-400'
                        : 'text-gray-300 hover:text-white'
                      }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}