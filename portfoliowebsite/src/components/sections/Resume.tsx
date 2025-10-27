// src/components/sections/Resume.tsx
'use client';

import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { FaDownload } from 'react-icons/fa';

export default function Resume() {
  const resumePdfUrl = process.env.NEXT_PUBLIC_RESUME_PDF_URL || '/your_resume.pdf';

  return (
    <section id="resume" className="py-20 md:py-28 bg-gray-900 text-white relative z-10">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-green-400"
        >
          My Resume
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto"
        >
          Feel free to download my full resume to learn more about my skills, experience, and education.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a href={resumePdfUrl} target="_blank" rel="noopener noreferrer" download="Ruturaj_Ghumkar_Resume.pdf">
            <Button variant="primary" size="lg" className="flex items-center justify-center mx-auto space-x-3">
              <FaDownload size={24} />
              <span>Download Resume (PDF)</span>
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}