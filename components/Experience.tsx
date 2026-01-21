'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { experiences } from '@/lib/data';
import SectionHeader from '@/components/ui/SectionHeader';
import type { Experience as ExperienceType } from '@/types';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

const formatDateWithMonth = (dateString: string) => {
  const [year, month] = dateString.split('-');
  return `${MONTH_NAMES[parseInt(month) - 1]} ${year}`;
};

// Individual card component - expands when in center of viewport, collapses when scrolled away
function ExperienceCard({ experience, isLeft }: { experience: ExperienceType; isLeft: boolean }) {
  const cardRef = useRef(null);
  // once: false means it will toggle based on scroll position
  // margin creates a smaller "active zone" in the center of the viewport
  const isExpanded = useInView(cardRef, { once: false, margin: '-35% 0px -35% 0px' });
  const isVisible = useInView(cardRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -30 : 30 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`relative flex w-full ${
        isLeft ? 'justify-center md:justify-start' : 'justify-center md:justify-end'
      }`}
    >
      <motion.div
        animate={{
          scale: isExpanded ? 1 : 0.98,
          backgroundColor: isExpanded ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.15)',
        }}
        transition={{ duration: 0.3 }}
        className="backdrop-blur-2xl shadow-xl rounded-xl p-4 w-full max-w-full md:max-w-[45%] text-left"
      >
        {/* Header - Always visible */}
        <div className="flex flex-col items-start space-y-1">
          <h3 className="text-base font-bold text-purple-600 leading-tight">
            {experience.title}
          </h3>
          <h4 className="text-sm font-semibold text-slate-800 leading-tight">
            {experience.company}
          </h4>
          <div className="flex items-center gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-1">
              <MapPin size={12} />
              {experience.location}
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              {formatDateWithMonth(experience.startDate)} - {experience.endDate === 'present' ? 'Present' : formatDateWithMonth(experience.endDate)}
            </div>
          </div>
        </div>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-3">
                <ul className="space-y-1.5 mb-3">
                  {experience.description.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-sm text-slate-700 leading-relaxed flex items-start gap-2"
                    >
                      <span className="text-purple-500 mt-1 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5">
                  {experience.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Group experiences by year - memoized
  const experiencesByYear = useMemo(() => {
    return experiences.reduce((acc, experience) => {
      const year = experience.startDate.split('-')[0];
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(experience);
      return acc;
    }, {} as Record<string, typeof experiences>);
  }, []);

  const sortedYears = useMemo(() => {
    return Object.keys(experiencesByYear).sort((a, b) => b.localeCompare(a));
  }, [experiencesByYear]);

  return (
    <section id="experience" className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader title="Experience" />

          {/* Timeline */}
          <div className="relative max-w-full mx-auto">
            {/* Central Timeline Line - Only visible on desktop */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#8B9BD6] via-[#C4A5D6] to-[#E6B8E6] rounded-full" />

            <div className="space-y-6 md:space-y-10">
              {sortedYears.map((year, yearIndex) => {
                // Calculate the starting global index for this year
                let globalExpIndex = 0;
                for (let i = 0; i < yearIndex; i++) {
                  globalExpIndex += experiencesByYear[sortedYears[i]].length;
                }

                return (
                  <div key={year} className="relative">
                    {/* Year Label - Only visible on desktop */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: 0.3 + yearIndex * 0.2, duration: 0.5 }}
                      className="hidden md:block absolute -translate-y-1/2 z-20"
                      style={{
                        left: yearIndex % 2 === 0 ? 'calc(50% - 80px)' : 'calc(50% + 20px)'
                      }}
                    >
                      <div className="text-purple-600 font-bold text-xl whitespace-nowrap">
                        {year}
                      </div>
                    </motion.div>

                    {/* Year Dot - Only visible on desktop */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-[#8B9BD6] to-[#E6B8E6] rounded-full shadow-lg z-10" />

                    {/* Purple Glow Effect for current year - Only visible on desktop */}
                    {year === '2025' && (
                      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full shadow-purple-500/80 shadow-[0_0_20px_rgba(147,51,234,0.8)] animate-pulse z-5" />
                    )}

                    {/* Mobile: Year Header */}
                    <div className="md:hidden mb-3">
                      <h3 className="text-purple-600 font-bold text-lg">{year}</h3>
                    </div>

                    {/* Experience Cards for this Year */}
                    <div className="pt-0 md:pt-6 space-y-6 md:space-y-8">
                      {experiencesByYear[year].map((experience, expIndex) => {
                        const isLeft = (globalExpIndex + expIndex) % 2 === 0;

                        return (
                          <ExperienceCard
                            key={experience.id}
                            experience={experience}
                            isLeft={isLeft}
                          />
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
