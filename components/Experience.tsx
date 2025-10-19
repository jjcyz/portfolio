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

  // Group experiences by year
  const experiencesByYear = experiences.reduce((acc, experience) => {
    const year = experience.startDate.split('-')[0]; // Extract year from YYYY-MM format
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(experience);
    return acc;
  }, {} as Record<string, typeof experiences>);

  // Function to format date without month
  const formatDateWithoutMonth = (dateString: string) => {
    return dateString.split('-')[0]; // Return just the year from YYYY-MM format
  };

  const sortedYears = Object.keys(experiencesByYear).sort((a, b) => b.localeCompare(a));

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
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
            >
              <span className="gradient-text">Experience</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-400 mx-auto rounded-full"
            />
          </div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-purple-600 to-pink-400 rounded-full" />

            <div className="space-y-16">
              {sortedYears.map((year, yearIndex) => (
                <div key={year} className="relative">
                  {/* Year Label - Positioned beside the node */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.6 + yearIndex * 0.3, duration: 0.6 }}
                    className="absolute left-1/2 transform translate-x-4 -translate-y-1/2 z-20"
                  >
                    <div className="text-purple-600 font-bold text-xl whitespace-nowrap">
                      {year}
                    </div>
                  </motion.div>

                  {/* Year Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full border-4 border-white shadow-lg z-10" />

                  {/* Experience Cards for this Year */}
                  <div className="pt-8 space-y-8">
                    {experiencesByYear[year].map((experience, expIndex) => {
                      const isLeft = expIndex % 2 === 0;
                      const structuredData = generateExperienceStructuredData(experience);

                      return (
                        <motion.div
                          key={experience.id}
                          initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -100 : 100 }}
                          transition={{
                            delay: 0.8 + yearIndex * 0.3 + expIndex * 0.2,
                            duration: 0.6
                          }}
                          className={`relative ${isLeft ? 'pr-1/2 pl-4' : 'pl-1/2 pr-4'}`}
                        >
                          {/* Structured Data */}
                          <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{
                              __html: JSON.stringify(structuredData),
                            }}
                          />

                          {/* Experience Card */}
                          <motion.div
                            whileHover={{
                              scale: 1.02,
                              y: -5,
                              boxShadow: "0 20px 40px rgba(139, 155, 214, 0.3)"
                            }}
                            className={`liquid-glass-card p-6 transition-all duration-300 hover:liquid-glass-card-hover group max-w-sm text-left ${
                              isLeft ? 'ml-auto' : 'mr-auto'
                            }`}
                          >
                            {/* Header */}
                            <div className="flex flex-col items-start mb-4">
                              <h3 className="text-lg font-bold text-purple-600 mb-1">
                                {experience.title}
                              </h3>
                              <h4 className="text-base font-semibold text-slate-800 mb-2">
                                {experience.company}
                              </h4>
                              <div className="flex items-center gap-4 text-sm text-slate-700">
                                <div className="flex items-center gap-1">
                                  <MapPin size={16} />
                                  {experience.location}
                                </div>
                              </div>
                            </div>

                            {/* Date */}
                            <div className="flex items-center gap-1 text-sm text-slate-700 mb-4 justify-start">
                              <Calendar size={16} />
                              {formatDateWithoutMonth(experience.startDate)} - {formatDateWithoutMonth(experience.endDate)}
                            </div>

                            {/* Hover Content */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {/* Description */}
                              <ul className="space-y-2 mb-4 text-left">
                                {experience.description.map((item, itemIndex) => (
                                  <motion.li
                                    key={itemIndex}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{
                                      delay: itemIndex * 0.1,
                                      duration: 0.4
                                    }}
                                    className="text-slate-700 leading-relaxed flex items-start gap-2"
                                  >
                                    <span className="text-purple-500 mt-2 flex-shrink-0">•</span>
                                    <span>{item}</span>
                                  </motion.li>
                                ))}
                              </ul>

                              {/* Technologies */}
                              <div className="flex flex-wrap gap-2 justify-start">
                                {experience.technologies.map((tech, techIndex) => (
                                  <motion.span
                                    key={tech}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{
                                      delay: techIndex * 0.1,
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
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
