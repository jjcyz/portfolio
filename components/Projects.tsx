'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { projects } from '@/lib/data';
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
          <div className="text-center mb-4 sm:mb-6 lg:mb-8 relative z-20">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 inline-flex items-baseline gap-2 sm:gap-3"
            >
              <span className="gradient-text">Featured Projects</span>
              <a
                href="/projects"
                className="gradient-text text-xs sm:text-sm font-medium hover:opacity-70 transition-opacity duration-200"
              >
                View All
              </a>
            </motion.h2>
          </div>

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
                    /* Mobile: MacBook frame with message inside screen */
                    <div className="relative w-full lg:w-2/3 shrink-0 overflow-hidden lg:hidden">
                      <div className="relative w-full aspect-[16/11] min-h-[50vh] sm:min-h-[60vh] scale-100 sm:scale-105">
                        {/* Screen Content Area - Message inside screen - Adjusted for mobile */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="absolute"
                          style={{
                            top: '18%',
                            left: '13%',
                            right: '13%',
                            bottom: '17%',
                            zIndex: 1,
                          }}
                        >
                          <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-white rounded-[12px] sm:rounded-[16px]">
                            <div className="text-center px-4 sm:px-6">
                              <p className="text-xs sm:text-sm text-black leading-relaxed">
                                View the desktop browser version on a desktop or tablet device for the full experience.
                                If viewing on browser, ensure screen size is in full screen.
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* MacBook Pro Image Background - Overlay on top (Static) */}
                        <div className="absolute inset-0 z-10 pointer-events-none">
                          <Image
                            src="/images/MacBook%20Pro%20M4%2014-inch%20Silver.png"
                            alt="MacBook Pro Frame"
                            fill
                            className="object-contain"
                            sizes="(max-width: 1024px) 100vw, 100vw"
                            priority
                            unoptimized
                          />
                        </div>
                      </div>
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
