// src/components/sections/Experience.tsx
'use client';

import { ExperienceItem } from '@/types';
import { motion } from 'framer-motion';

const experienceData: ExperienceItem[] = [
  {
    company: 'Matter Motor Works',
    title: 'Engineer',
    dates: '07/2024 - Present',
    description: [
      'Developed and maintained responsive web applications using React.js (v16), ensuring cross-browser and cross-device compatibility.',
      'Took complete ownership of the company website, delivering feature enhancements, UI/UX improvements, and production fixes within tight deadlines.',
      'Improved website performance and responsiveness, reducing load times by 20-25% and enhancing customer experience.',
    ],
  },
  // Add more experience items here
  // {
  //   company: 'Previous Company',
  //   title: 'Previous Role',
  //   dates: 'Start Date - End Date',
  //   description: [
  //     'Achieved X by doing Y.',
  //     'Responsible for Z.',
  //   ],
  // },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28 bg-gray-900 text-white relative z-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Work Experience
        </motion.h2>

        <div className="relative pl-8 md:pl-16">
          <div className="absolute left-3 md:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>

          {experienceData.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="mb-12 relative flex items-start"
            >
              <div className="absolute -left-2 md:-left-6 w-5 h-5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg z-10 mt-1"></div>
              <div className="ml-8 md:ml-12 bg-gray-800 p-6 rounded-lg shadow-xl w-full">
                <h3 className="text-2xl font-semibold text-cyan-400">{item.title}</h3>
                <p className="text-lg text-purple-300 mt-1">{item.company}</p>
                <p className="text-sm text-gray-400 mb-4">{item.dates}</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  {item.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}