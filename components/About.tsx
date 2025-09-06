'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Calendar, GraduationCap } from 'lucide-react';
import { education } from '@/lib/data';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding bg-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            >
              <span className="gradient-text">About Me</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-600 mx-auto rounded-full"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* About Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="space-y-6"
            >
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed">
                  Hello! I'm Jessica, a Computer Science and Business student at the University of British Columbia (BUCS program), graduating in April 2026. My passion lies at the intersection of technology and business.
                </p>

                <p className="text-gray-300 leading-relaxed">
                  I also had the opportunity to enhance my global perspective of technology and business during my exchange studies at Tsinghua University, which focused on ML/AI and Financial Technologies.
                </p>

                <p className="text-gray-300 leading-relaxed">
                  When I'm not coding, I enjoy exploring new coffee shops and trying out new (Japanese) restaurants in the city. Occasionally, I also like to go hiking, skiing, and snowboarding.
                </p>
              </div>

              {/* Personal Interests */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                {['Coffee ☕', 'Japanese Cuisine 🍣', 'Hiking 🥾', 'Skiing ⛷️', 'Snowboarding 🏂'].map((interest, index) => (
                  <motion.span
                    key={interest}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                    className="tag"
                  >
                    {interest}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-primary-400 mb-6 flex items-center gap-2">
                <GraduationCap size={24} />
                Education
              </h3>

              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
                  className="glass-effect p-6 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  <h4 className="text-lg font-semibold text-gray-100 mb-2">
                    {edu.institution}
                  </h4>
                  <p className="text-primary-400 font-medium mb-3">
                    {edu.degree}
                  </p>
                  {edu.description && (
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      {edu.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
