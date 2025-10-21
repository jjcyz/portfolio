'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode, useState, useEffect } from 'react';
import { MapPin, Calendar, GraduationCap, Heart } from 'lucide-react';
import { education } from '@/lib/data';

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
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

const ModuleContainer = ({ children, className = "", ...props }: ModuleContainerProps) => (
  <motion.div
    className={`bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 backdrop-blur-2xl border-2 border-purple-400/30 shadow-2xl shadow-purple-500/20 rounded-3xl overflow-hidden relative ${className}`}
    {...props}
  >
    <CircuitBoardPattern />
    {children}
  </motion.div>
);

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isHobbiesExpanded, setIsHobbiesExpanded] = useState(false);
  const [isCurrentFavouritesExpanded, setIsCurrentFavouritesExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 767px)').matches);
    };

    // Check on mount
    checkIsMobile();

    // Listen for resize events
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    mediaQuery.addEventListener('change', checkIsMobile);

    return () => mediaQuery.removeEventListener('change', checkIsMobile);
  }, []);

  return (
    <section id="about" className="py-20 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
            >
              <span className="gradient-text">About Me</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-start">
            {/* About Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl shadow-black/15 rounded-3xl p-6 sm:p-8 lg:p-10"
            >
              <div className="space-y-6">
                <p className="text-slate-800 leading-relaxed">
                  I&apos;m a <span className="text-purple-600 font-semibold">Computer Science and Business</span> student
                  at the University of British Columbia (BUCS Program),
                  graduating in April 2026. My
                  interests lie at the <span className="text-purple-600 font-semibold">future of tech and software</span>, especially
                  how systems can be optimized to be more efficient and scalable using <span className="text-purple-600 font-semibold">AI</span>.
                </p>

                <p className="text-slate-800 leading-relaxed">
                  I&apos;ve worked extensively with <span className="text-purple-600 font-semibold">full stack web development</span>, particularly enjoying the
                  <span className="text-purple-600 font-semibold"> JavaScript, React, and Tailwind CSS</span> combination. This stack allows me to build
                  responsive, interactive interfaces while maintaining clean, maintainable code. I&apos;m excited about the possibilities these technologies
                  offer for creating <span className="text-purple-600 font-semibold">innovative user experiences</span>.
                </p>

                <p className="text-slate-800 leading-relaxed">
                  I also had the opportunity to enhance my global perspective of technology and business during my
                  exchange studies at <span className="text-purple-600 font-semibold">Tsinghua University</span> in Beijing, China, which focused on <span className="text-purple-600 font-semibold">machine learning</span>. I got
                  to see how some of the brightest innovators are pioneering the new era of technology at scales unheard of before.
                </p>

                <p className="text-slate-800 leading-relaxed">
                  I&apos;ve started appreciating <span className="text-purple-600 font-semibold">user experience design</span> more deeply.
                  There&apos;s something satisfying about crafting interfaces that feel intuitive and delightful to use,
                  where every interaction serves a purpose and enhances the user&apos;s journey.
                </p>
              </div>
            </motion.div>

            {/* Right Side - Two Modules */}
            <div className="space-y-6 sm:space-y-8">
              {/* Education Module - Top Right */}
              <ModuleContainer
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ delay: 0.8, duration: 0.8 }}
                className="p-4 sm:p-6"
            >

                {/* Education Header */}
                <div className="relative z-10 mb-6">
                  <h3 className="text-xl font-bold text-purple-600 flex items-center gap-2">
                <GraduationCap size={24} />
                    Education Module
              </h3>
                </div>

                {/* Education Grid */}
                <div className="relative z-10 space-y-4">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
                      className="p-4 hover:bg-white/10 transition-all duration-300 rounded-lg"
                >
                      <h4 className="text-base font-semibold text-slate-800 mb-2">
                    {edu.institution}
                  </h4>
                      <p className="text-purple-600 font-medium text-sm mb-2">
                    {edu.degree}
                  </p>
                  {edu.description && (
                        <p className="text-slate-700 text-xs mb-3 leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-slate-700">
                    <div className="flex items-center gap-1">
                          <MapPin size={12} />
                      {edu.location}
                    </div>
                    <div className="flex items-center gap-1">
                          <Calendar size={12} />
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>
                </motion.div>
              ))}
                </div>
              </ModuleContainer>

              {/* Bottom Row - Hobbies and Current Favourites Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Hobbies Module - Left */}
                <ModuleContainer
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ delay: 1.0, duration: 0.8 }}
                  className={`group/hobbies p-3 sm:p-4 ${
                    // Mobile: click to expand, Desktop: hover to expand
                    isMobile
                      ? 'cursor-pointer'
                      : 'cursor-default'
                  }`}
                  onClick={() => {
                    // Only allow click on mobile devices
                    if (isMobile) {
                      setIsHobbiesExpanded(!isHobbiesExpanded);
                    }
                  }}
                >

                  {/* Hobbies Header - Always Visible */}
                  <div className="relative z-10 mb-6 text-center">
                    <h3 className="text-xl font-bold text-purple-600 flex items-center justify-center gap-2">
                      Hobbies
                    </h3>
                  </div>

                  {/* Hobbies Content - Hidden by default, shown on hover (desktop) or click (mobile) */}
                  <div className={`relative z-10 transition-all duration-300 overflow-hidden ${
                    isHobbiesExpanded
                      ? 'opacity-100 max-h-96'
                      : 'opacity-0 max-h-0 group-hover/hobbies:opacity-100 group-hover/hobbies:max-h-96'
                  }`}>
                    <p className="text-slate-800 leading-relaxed mb-4 text-sm">
                      I love exploring the great outdoors and city life that Vancouver offers. From hiking in Squamish to skiing and snowboarding in Whistler,
                      I&apos;m always up for an adventure. I also enjoy discovering new cafes and restaurants around the city.
                    </p>

                    {/* Hobby Tags */}
                    <div className="flex flex-wrap gap-2">
                      {['Skiing ⛷️', 'Snowboarding 🏂', 'Hiking 🥾', 'Cafes ☕'].map((hobby, index) => (
                        <span
                          key={hobby}
                          className="bg-purple-100 text-purple-700 border border-purple-200 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {hobby}
                        </span>
                      ))}
                    </div>
                  </div>
                </ModuleContainer>

                {/* Current Favourites Module - Right */}
                <ModuleContainer
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className={`group/favourites p-3 sm:p-4 ${
                    // Mobile: click to expand, Desktop: hover to expand
                    isMobile
                      ? 'cursor-pointer'
                      : 'cursor-default'
                  }`}
                  onClick={() => {
                    // Only allow click on mobile devices
                    if (isMobile) {
                      setIsCurrentFavouritesExpanded(!isCurrentFavouritesExpanded);
                    }
                  }}
                >

                  {/* Current Favourites Header - Always Visible */}
                  <div className="relative z-10 mb-6 text-center">
                    <h3 className="text-xl font-bold text-purple-600 flex items-center justify-center gap-2">
                      Current Favourites
                    </h3>
                  </div>

                  {/* Current Favourites Content - Hidden by default, shown on hover (desktop) or click (mobile) */}
                  <div className={`relative z-10 transition-all duration-300 overflow-hidden ${
                    isCurrentFavouritesExpanded
                      ? 'opacity-100 max-h-96'
                      : 'opacity-0 max-h-0 group-hover/favourites:opacity-100 group-hover/favourites:max-h-96'
                  }`}>
                    <p className="text-slate-800 leading-relaxed mb-4 text-sm">
                      I have a bias for glassmorphic designs. Perhaps it&apos;s what I though metaverse would deliver, but didn&apos;t end up doing.
                      When it comes to drinks, my current favourite are hojicha oat lattes. If you haven&apos;t tried, you&apos;re missing out.
                    </p>

                    {/* Current Favourites Tags */}
                    <div className="flex flex-wrap gap-2">
                      {['Glassmorphism ✨', 'Hojicha Oat 🍵', 'UX Design 🎨', 'Minimalistic 📱'].map((favourite, index) => (
                        <span
                          key={favourite}
                          className="bg-purple-100 text-purple-700 border border-purple-200 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {favourite}
                        </span>
                      ))}
                    </div>
                  </div>
                </ModuleContainer>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
