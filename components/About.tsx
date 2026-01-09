'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { education } from '@/lib/data';
import SectionHeader from '@/components/ui/SectionHeader';

// Shared components
const CircuitBoardPattern = () => (
  <div className="absolute inset-0 opacity-20">
    <div className="absolute top-4 left-4 w-2 h-2 bg-purple-400 rounded-full"></div>
    <div className="absolute top-4 right-4 w-2 h-2 bg-pink-400 rounded-full"></div>
    <div className="absolute bottom-4 left-4 w-2 h-2 bg-purple-400 rounded-full"></div>
    <div className="absolute bottom-4 right-4 w-2 h-2 bg-pink-400 rounded-full"></div>
    <div className="absolute top-1/2 left-8 w-1 h-1 bg-purple-300 rounded-full"></div>
    <div className="absolute top-1/2 right-8 w-1 h-1 bg-pink-300 rounded-full"></div>
  </div>
);

interface ModuleContainerProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

const ModuleContainer = ({ children, className = "", ...props }: ModuleContainerProps) => (
  <motion.div
    className={`bg-[#ffffff] rounded-3xl overflow-hidden relative ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

const PinkGradientContainer = ({ children, className = "", ...props }: ModuleContainerProps) => (
  <motion.div
    className={`bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 backdrop-blur-2xl border-2 border-purple-400/30 shadow-2xl shadow-purple-500/20 rounded-3xl overflow-hidden relative ${className}`}
    {...props}
  >
    <CircuitBoardPattern />
    {children}
  </motion.div>
);

// Apple-style carousel component
const TAGS = ['Skiing ⛷️', 'Snowboarding 🏂', 'Hiking 🥾', 'Cafe Hopping ☕', 'Glassmorphism ✨', 'Hojicha Oat Lattes 🍵', 'Simplicity ', 'Minimalism 📱', 'User-Centered Designs'];

const CarouselTags = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TAGS.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-10 flex items-center justify-center min-h-[60px]">
      <div className="text-lg sm:text-xl font-medium text-slate-800 flex items-center gap-2">
        <span>I Like</span>
        <div className="relative inline-block min-w-[200px] sm:min-w-[240px] h-[1.5em] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="absolute left-0 top-0 text-purple-600 font-semibold"
            >
              {TAGS[currentIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-20 sm:py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <SectionHeader title="About Me" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
            {/* About Text */}
            <PinkGradientContainer
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="p-6 sm:p-8 lg:p-10"
            >
              <div className="space-y-4">
                <p className="text-slate-800 leading-relaxed">
                  Software engineer who likes to <span className="text-purple-600 font-semibold">automate</span> tasks and systems that reduce load for humans. I create work with the <span className="text-purple-600 font-semibold">user experience</span> in mind.
                </p>

                <p className="text-slate-800 leading-relaxed">
                  Senior student at <span className="text-purple-600 font-semibold">The University of British Columbia</span> graduating April 2026. I studied abroad for one year at <span className="text-purple-600 font-semibold">Tsinghua University</span>, where I took computer science courses in <span className="text-purple-600 font-semibold">AI</span>, <span className="text-purple-600 font-semibold">ML</span>, and others. An opportunity that gave me a unique global perspective of technology beyond borders.
                </p>

                <p className="text-slate-800 leading-relaxed">
                  I&apos;m quite involved in my community as a lead in the <span className="text-purple-600 font-semibold">Google Developer Student Club</span> and the <span className="text-purple-600 font-semibold">Data Analytics Club</span>, where I contribute to tech initiatives. I also like to compete in <span className="text-purple-600 font-semibold">hackathons</span> and build fun weekend projects.
                </p>
              </div>
            </PinkGradientContainer>

            {/* Right Side - Two Modules */}
            <div className="space-y-6 sm:space-y-8">
              {/* Education Module */}
              <ModuleContainer
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="p-6 sm:p-8"
              >
                <div className="relative z-10 space-y-8">
                  {education.map((edu, index) => {
                    const logoPath = edu.id === 'ubc-bucs' ? '/images/ubc-logo.jpg' : '/images/tsinghua-logo.svg';

                    return (
                      <motion.div
                        key={edu.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.9 + index * 0.15, duration: 0.6 }}
                        className="flex items-center gap-4"
                      >
                        <Image
                          src={logoPath}
                          alt={edu.institution}
                          width={64}
                          height={64}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-contain flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-semibold text-slate-800 mb-1">
                            {edu.institution}
                          </h4>
                          <p className="text-purple-600 font-medium text-sm">
                            {edu.degree}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </ModuleContainer>

              {/* Hobbies & Favourites Combined Module */}
              <ModuleContainer
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="p-6 sm:p-8"
              >
                <CarouselTags />
              </ModuleContainer>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
