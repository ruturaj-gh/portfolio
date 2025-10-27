// src/components/layout/Footer.tsx
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black text-gray-400 py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <Link href="https://github.com/ruturaj-gh" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
            <FaGithub size={28} />
          </Link>
          <Link href="https://linkedin.com/in/ruturajghumkar" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
            <FaLinkedin size={28} />
          </Link>
        </div>
        <p>&copy; {currentYear} Ruturaj Ghumkar. All rights reserved.</p>
        <p className="text-sm mt-2">Built with Next.js, Three.js, and Tailwind CSS.</p>
      </div>
    </footer>
  );
}