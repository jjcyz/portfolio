'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { experiences } from '@/lib/data';

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  // Group experiences by year
  const experiencesByYear = experiences.reduce((acc, experience) => {
    const year = experience.startDate.split('-')[0]; // Extract year from YYYY-MM format
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(experience);
    return acc;
  }, {} as Record<string, typeof experiences>);

  // Function to format date with month
  const formatDateWithMonth = (dateString: string) => {
    const [year, month] = dateString.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  // Function to toggle card expansion (for mobile)
  const toggleCard = (cardId: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const sortedYears = Object.keys(experiencesByYear).sort((a, b) => b.localeCompare(a));

  return (
    <section id="experience" className="py-20 sm:py-24 lg:py-32">
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
              {sortedYears.map((year, yearIndex) => {
                // Calculate the starting global index for this year
                let globalExpIndex = 0;
                for (let i = 0; i < yearIndex; i++) {
                  globalExpIndex += experiencesByYear[sortedYears[i]].length;
                }

                return (
                  <div key={year} className="relative">
                    {/* Year Label - Alternating left and right */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: 0.6 + yearIndex * 0.3, duration: 0.6 }}
                      className="absolute -translate-y-1/2 z-20"
                      style={{
                        left: yearIndex % 2 === 0 ? 'calc(50% - 80px)' : 'calc(50% + 20px)'
                      }}
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
                        // Use global experience index for proper alternating
                        const isLeft = (globalExpIndex + expIndex) % 2 === 0;

                return (
                  <motion.div
                    key={experience.id}
                          initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -100 : 100 }}
                          transition={{
                            delay: 0.8 + yearIndex * 0.3 + expIndex * 0.2,
                            duration: 0.6
                          }}
                          className={`relative ${isLeft ? 'pr-1/2 pl-4' : 'pl-1/2 pr-4'} flex ${
                            expandedCards.has(experience.id)
                              ? 'justify-center'
                              : isLeft ? 'justify-start' : 'justify-end'
                          } w-full group-hover:justify-center`}
                  >

                    {/* Experience Card */}
                          <motion.div
                            whileHover={{
                              scale: 1.02,
                              y: -5,
                              boxShadow: "0 20px 40px rgba(139, 155, 214, 0.3)"
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              // Only allow click on mobile devices
                              if (window.innerWidth < 768) {
                                toggleCard(experience.id);
                              }
                            }}
                            className={`bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl shadow-black/15 rounded-xl transition-all duration-300 hover:bg-white/30 hover:backdrop-blur-3xl hover:border-white/40 hover:shadow-2xl hover:shadow-black/20 group text-left cursor-pointer md:cursor-default ${
                              expandedCards.has(experience.id)
                                ? 'p-4 w-[600px] max-w-[600px]'
                                : 'p-3 w-[400px] max-w-md'
                            } md:group-hover:w-[600px] md:group-hover:max-w-[600px] md:group-hover:p-4`}
                          >
                            {/* Always Visible Content - Role, Company, Location */}
                            <div className="flex flex-col items-start space-y-1">
                              <h3 className="text-sm font-bold text-purple-600 leading-tight">
                            {experience.title}
                          </h3>
                              <h4 className="text-xs font-semibold text-slate-800 leading-tight">
                            {experience.company}
                          </h4>
                              <div className="flex items-center gap-1 text-xs text-slate-700 leading-tight">
                                <MapPin size={10} />
                            {experience.location}
                          </div>
                      </div>

                            {/* Expandable Content - Date, Description, Technologies */}
                            <div className={`overflow-hidden transition-all duration-300 ${
                              expandedCards.has(experience.id)
                                ? 'max-h-[600px] opacity-100 mt-3'
                                : 'max-h-0 opacity-0 mt-0'
                            } md:max-h-0 md:opacity-0 md:mt-0 md:group-hover:opacity-100 md:group-hover:max-h-[600px] md:group-hover:mt-3`}>
                              {/* Date */}
                              <div className="flex items-center gap-1 text-sm text-slate-700 mb-3">
                                <Calendar size={14} />
                                {formatDateWithMonth(experience.startDate)} - {experience.endDate === 'present' ? 'Present' : formatDateWithMonth(experience.endDate)}
                              </div>

                      {/* Description */}
                              <ul className="space-y-1.5 mb-3">
                        {experience.description.map((item, itemIndex) => (
                                  <li
                            key={itemIndex}
                                    className="text-sm text-slate-700 leading-relaxed flex items-start gap-2"
                                  >
                                    <span className="text-purple-500 mt-1.5 flex-shrink-0">•</span>
                            <span>{item}</span>
                                  </li>
                        ))}
                      </ul>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                                {experience.technologies.map((tech) => (
                                  <span
                            key={tech}
                                    className="bg-purple-100 text-purple-700 border border-purple-200 px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {tech}
                                  </span>
                        ))}
                      </div>
                    </div>
                          </motion.div>
                  </motion.div>
                );
              })}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
