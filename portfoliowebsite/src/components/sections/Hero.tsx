// src/components/sections/Hero.tsx
'use client';

import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Images from '@/lib/images';
export default function Hero() {
  const profileImageUrl = process.env.NEXT_PUBLIC_PROFILE_IMAGE_URL ;
  const resumePdfUrl = process.env.NEXT_PUBLIC_RESUME_PDF_URL || '/your_resume.pdf';
  const name = "Ruturaj Ghumkar";
  const summary = "I'm a software engineer passionate about building practical, user-friendly solutions. Most of my work has been in frontend and full-stack development, where I enjoy turning ideas into working products. I'm curious, quick to learn, and motivated by solving real problems, not just writing code.";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center text-center text-white p-4"
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-cyan-400 shadow-xl">
            <img
              src={Images.profile}
              alt={name}
              style={{ objectFit: 'cover' }}
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600"
        >
          {name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-300"
        >
          {summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center space-x-4"
        >
          <Button variant="primary" size="lg" onClick={() => window.location.href = '#contact'}>
            Get in Touch
          </Button>
          <a href={resumePdfUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg">
              Download Resume
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}