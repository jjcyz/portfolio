'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, Briefcase } from 'lucide-react';
import { experiences } from '@/lib/data';
import { generateExperienceStructuredData } from '@/lib/structured-data';

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="section-padding">
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
              <span className="gradient-text">Experience</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-600 mx-auto rounded-full"
            />
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-primary-600 to-primary-500" />

            <div className="space-y-12">
              {experiences.map((experience, index) => {
                const structuredData = generateExperienceStructuredData(experience);

                return (
                  <motion.div
                    key={experience.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    transition={{ delay: 0.6 + index * 0.2, duration: 0.6 }}
                    className="relative"
                  >
                    {/* Structured Data */}
                    <script
                      type="application/ld+json"
                      dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData),
                      }}
                    />

                    {/* Timeline Dot */}
                    <div className="absolute left-6 top-6 w-4 h-4 bg-primary-500 rounded-full border-4 border-gray-950 z-10" />

                    {/* Experience Card */}
                    <div className="ml-16 glass-effect p-6 rounded-xl hover:bg-white/10 transition-all duration-300">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-primary-400 mb-1">
                            {experience.title}
                          </h3>
                          <h4 className="text-lg font-semibold text-gray-100 mb-2">
                            {experience.company}
                          </h4>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            {experience.location}
                          </div>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-1 text-sm text-gray-400 mb-4">
                        <Calendar size={16} />
                        {experience.startDate} - {experience.endDate}
                      </div>

                      {/* Description */}
                      <ul className="space-y-2 mb-4">
                        {experience.description.map((item, itemIndex) => (
                          <motion.li
                            key={itemIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{
                              delay: 0.8 + index * 0.2 + itemIndex * 0.1,
                              duration: 0.4
                            }}
                            className="text-gray-300 leading-relaxed flex items-start gap-2"
                          >
                            <span className="text-primary-500 mt-2 flex-shrink-0">•</span>
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{
                              delay: 1 + index * 0.2 + techIndex * 0.1,
                              duration: 0.4
                            }}
                            className="tag text-xs"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-center mt-16"
          >
            <div className="glass-effect p-8 rounded-xl max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-100 mb-4 flex items-center justify-center gap-2">
                <Briefcase size={24} className="text-primary-400" />
                Looking for Opportunities
              </h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                I'm actively seeking internship and full-time opportunities in software engineering,
                AI/ML research, and technology consulting. Let's connect and discuss how I can contribute to your team.
              </p>
              <a
                href="#contact"
                className="btn-primary inline-flex items-center gap-2"
                onClick={(e) => {
                  e.preventDefault();
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Get In Touch
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
