// src/components/sections/Projects.tsx
'use client';

import { ProjectItem } from '@/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const projectData: ProjectItem[] = [
  {
    id: 'brain-tumor-detection',
    title: 'Transformer-Based Brain Tumor Detection',
    description: 'Designed and trained a SegFormer-based deep learning model for accurate brain tumor segmentation and classification from MRI scans. Built an interactive Streamlit web app with real-time predictions, user authentication, and automated PDF report generation.',
    techStack: ['Python', 'PyTorch', 'TensorFlow', 'Streamlit', 'SegFormer'],
    githubUrl: 'https://github.com/ruturaj-gh/API2',
    liveUrl: '#', // No live demo available for this example
  },
  {
    id: 'blog-app',
    title: 'Modern Blog Application',
    description: 'Developed a blogging platform enabling users to write, edit, and publish posts with support for images and rich text formatting. Implemented role-based authentication and structured content organization (categories & tags) to enhance usability.',
    techStack: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Firebase'],
    githubUrl: 'https://github.com/ruturaj-gh/blog-app',
    liveUrl: '#', // No live demo available for this example
  },
  {
    id: 'chatting-app',
    title: 'Real-time Chatting Application',
    description: 'Created a real-time chat app in Kotlin using MVVM architecture for scalability and maintainability. Integrated Firebase Authentication and Realtime Database to handle secure user login and instant message syncing.',
    techStack: ['Kotlin', 'Android', 'MVVM', 'Firebase'],
    githubUrl: 'https://github.com/ruturaj-gh/chatting-app',
    liveUrl: '#', // No live demo available for this example
  },
  // Add more projects here
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28 bg-gray-950 text-white relative z-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400"
        >
          My Projects
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            pagination={{ clickable: true }}
            navigation={true}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper !pb-12" // !pb-12 to make space for pagination dots
          >
            {projectData.map((project, index) => (
              <SwiperSlide key={project.id}>
                <motion.div
                  variants={cardVariants}
                  className="bg-gray-800 rounded-lg shadow-xl overflow-hidden h-full flex flex-col hover:shadow-2xl transition-shadow duration-330"
                >
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold mb-3 text-cyan-300">{project.title}</h3>
                    <p className="text-gray-300 mb-4 flex-grow">{project.description}</p>
                    // src/components/sections/Projects.tsx (continued)
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-purple-700 text-purple-100 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto flex justify-start space-x-4">
                      {project.githubUrl && (
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 bg-gray-700 px-4 py-2 rounded-lg"
                          >
                            <FaGithub size={20} />
                            <span>GitHub</span>
                          </motion.button>
                        </Link>
                      )}
                      {project.liveUrl && project.liveUrl !== '#' && (
                        <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 bg-gray-700 px-4 py-2 rounded-lg"
                          >
                            <FaExternalLinkAlt size={18} />
                            <span>Live Demo</span>
                          </motion.button>
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}