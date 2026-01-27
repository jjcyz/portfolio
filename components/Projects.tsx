'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useMemo, useCallback } from 'react';
import { projects } from '@/lib/data';
import SectionHeader from '@/components/ui/SectionHeader';
import DesktopFrame from './projects/DesktopFrame';
import ProjectInfo from './projects/ProjectInfo';
import ProjectNavigation from './projects/ProjectNavigation';
import MobileFrameSection from './projects/MobileFrameSection';
import { useMobile } from '@/hooks/useMobile';

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobileDevice = useMobile(1024);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < projects.length - 1 ? prev + 1 : prev));
  }, []);

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < projects.length - 1;

  const currentProject = useMemo(() => projects[currentIndex], [currentIndex]);

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader title="Featured Projects" className="mb-2 sm:mb-4 lg:mb-6" />

          {/* Projects Container */}
          <div className="relative overflow-visible">
            {currentProject && (
              <div className="relative group w-full max-w-7xl mx-auto">
                {/* Layout: Desktop Frame on left, text information on right */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 sm:gap-4 lg:gap-12">
                  {/* Desktop Frame Container - Left Side - Only render on desktop */}
                  {!isMobileDevice ? (
                    <DesktopFrame key={currentProject.id} project={currentProject} />
                  ) : (
                    /* Mobile message - Desktop preview available on desktop */
                    <div className="w-full lg:w-2/3 flex items-center justify-center py-8 lg:hidden">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-center px-4"
                      >
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                          View the desktop browser version on a desktop or tablet device for the full experience.
                        </p>
                      </motion.div>
                    </div>
                  )}

                  {/* Project Info - Right Side */}
                  <div className={`w-full ${!isMobileDevice ? 'lg:w-1/3' : ''} flex flex-col justify-center lg:pl-8 lg:self-center`}>
                    <ProjectInfo project={currentProject} />

                    {/* Navigation Arrows */}
                    <ProjectNavigation
                      canGoPrevious={canGoPrevious}
                      canGoNext={canGoNext}
                      onPrevious={goToPrevious}
                      onNext={goToNext}
                    />
                  </div>
                </div>

                {/* Mobile Frame Section - Below Desktop Frame */}
                <MobileFrameSection 
                  project={currentProject} 
                  isInView={isInView}
                  canGoPrevious={canGoPrevious}
                  canGoNext={canGoNext}
                  onPrevious={goToPrevious}
                  onNext={goToNext}
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
