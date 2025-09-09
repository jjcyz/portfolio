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
              <div className="prose prose-lg prose-invert max-w-none space-y-6">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-gray-300 leading-relaxed"
                >
                  I&apos;m a <span className="text-primary-400 font-semibold">Computer Science and Business</span> student
                  at the University of British Columbia (BUCS Program),
                  graduating in April 2026. My
                  interests lie at the <span className="text-primary-400 font-semibold">future of tech and software</span>, especially
                  how systems can be optimized to be more efficient and scalable using <span className="text-primary-400 font-semibold">AI</span>.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="text-gray-300 leading-relaxed"
                >
                  I&apos;ve worked on projects that range from <span className="text-primary-400 font-semibold">full stack web development</span> to building new applications with the latest
                  AI technologies. I&apos;m excited for what is possible with these technologies and how they can be applied in <span className="text-primary-400 font-semibold">innovative scenarios</span>.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
                  className="text-gray-300 leading-relaxed"
                >
                  I also had the opportunity to enhance my global perspective of technology and business during my
                  exchange studies at <span className="text-primary-400 font-semibold">Tsinghua University</span> in Beijing, China, which focused on <span className="text-primary-400 font-semibold">machine learning</span>. I got
                  to see how some of the brightest innovators are pioneering the new era of technology at scales unheard of before.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="text-gray-300 leading-relaxed"
                >
                  Asides from all the tech stuff, I enjoy exploring a mash of the great outdoors and city life that Vancouver
                  blesses me with. From going on hikes in Squamish to beaches in 30 mins to skiing and snowboarding in Whistler.
                  I also love to visit the variety of cafes and restaurants in the city. (need new recommendations)
                </motion.p>
              </div>

              {/* Personal Interests */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                {['Coffee ☕', 'Omakase 🍣', 'Hiking 🥾', 'Skiing ⛷️', 'Snowboarding 🏂'].map((interest, index) => (
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
