'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, FileText, Trophy } from 'lucide-react';
import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons-react';
import { projects } from '@/lib/data';
import SectionHeader from '@/components/ui/SectionHeader';

// Lazy loading iframe component
const LazyIframe = ({ src, title, ...props }: { src: string; title: string; [key: string]: any }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isInView = useInView(iframeRef, { once: true, margin: '50px' });

  useEffect(() => {
    if (isInView && !isLoaded) {
      setIsLoaded(true);
    }
  }, [isInView, isLoaded]);

  return (
    <div className="relative w-full h-full" style={{ width: '100%', height: '100%' }}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-purple-200 border-t-purple-500 rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm text-purple-600 font-medium">Loading preview...</p>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={isLoaded ? src : ''}
        title={title}
        className={`border-0 ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        {...props}
      />
    </div>
  );
};

export default function Projects() {
  const ref = useRef(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scale, setScale] = useState(1);


  const PREVIEW_WIDTH = 1920;
  const PREVIEW_HEIGHT = 1300;

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < projects.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < projects.length - 1;

  const currentProject = useMemo(() => projects[currentIndex], [currentIndex]);

  // Simple scale calculation to fit container
  useEffect(() => {
    const updateScale = () => {
      if (previewRef.current) {
        const container = previewRef.current;
        const scaleX = container.offsetWidth / PREVIEW_WIDTH;
        const scaleY = container.offsetHeight / PREVIEW_HEIGHT;
        setScale(Math.min(scaleX, scaleY));
      }
    };

    const resizeObserver = new ResizeObserver(updateScale);
    if (previewRef.current) {
      resizeObserver.observe(previewRef.current);
      updateScale();
    }

    window.addEventListener('resize', updateScale);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, [currentProject]);

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
                {/* Layout: MacBook Preview on left, text information on right */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 sm:gap-6 lg:gap-12">
                  {/* MacBook Frame Container - Left Side (Static) */}
                  <div className="relative w-full lg:w-2/3 flex-shrink-0 overflow-visible">
                    <div className="relative w-full aspect-[16/11] min-h-[80vh] sm:min-h-[90vh] lg:min-h-[100vh] scale-110 lg:scale-125">
                      {/* Screen Content Area - Behind the frame (Animated) */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentProject.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute"
                          style={{
                            top: '15%',
                            left: '11.5%',
                            right: '11.5%',
                            bottom: '14%',
                            zIndex: 1,
                          }}
                        >
                          <div ref={previewRef} className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
                            {currentProject.websiteUrl ? (
                              <div
                                style={{
                                  width: `${PREVIEW_WIDTH}px`,
                                  height: `${PREVIEW_HEIGHT}px`,
                                  transform: `scale(${scale})`,
                                  transformOrigin: 'center center',
                                }}
                              >
                                <LazyIframe
                                  src={currentProject.websiteUrl}
                                  title={`${currentProject.title} live demo`}
                                  width={PREVIEW_WIDTH}
                                  height={PREVIEW_HEIGHT}
                                  className="border-0"
                                  style={{
                                    display: 'block',
                                    border: 'none',
                                    width: `${PREVIEW_WIDTH}px`,
                                    height: `${PREVIEW_HEIGHT}px`,
                                  }}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              </div>
                            ) : (
                              <div
                                style={{
                                  width: `${PREVIEW_WIDTH}px`,
                                  height: `${PREVIEW_HEIGHT}px`,
                                  transform: `scale(${scale})`,
                                  transformOrigin: 'center center',
                                }}
                                className="relative overflow-hidden"
                              >
                                <Image
                                  src={currentProject.image}
                                  alt={`${currentProject.title} project`}
                                  fill
                                  className="object-cover"
                                  sizes={`${PREVIEW_WIDTH}px`}
                                  priority={currentProject.paperUrl !== undefined}
                                />
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      {/* MacBook Pro Image Background - Overlay on top (Static) */}
                      <div className="absolute inset-0 z-10 pointer-events-none">
                        <Image
                          src="/images/MacBook Pro M4 14-inch Silver.png"
                          alt="MacBook Pro Frame"
                          fill
                          className="object-contain"
                          sizes="(max-width: 1024px) 100vw, 100vw"
                          priority
                        />
                      </div>

                    </div>
              </div>

                  {/* Project Info - Right Side (Animated) */}
                  <div className="w-full lg:w-1/3 flex flex-col justify-center lg:pl-8 lg:self-center">
                    <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
                            {currentProject.title}
                          </h3>
                          {currentProject.websiteUrl && (
                            <Link
                              href={currentProject.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-600 hover:text-slate-900 transition-colors duration-200"
                              aria-label={`View ${currentProject.title} website`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink size={18} />
                            </Link>
                          )}
                          {currentProject.githubUrl && (
                            <Link
                              href={currentProject.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-600 hover:text-slate-900 transition-colors duration-200"
                              aria-label={`View ${currentProject.title} on GitHub`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Github size={18} />
                            </Link>
                          )}
                          {currentProject.devpostUrl && (
                            <Link
                              href={currentProject.devpostUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-600 hover:text-slate-900 transition-colors duration-200"
                              aria-label={`View ${currentProject.title} on Devpost`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Trophy size={18} />
                            </Link>
                          )}
                          {currentProject.paperUrl && (
                            <Link
                              href={currentProject.paperUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-600 hover:text-slate-900 transition-colors duration-200"
                              aria-label={`View ${currentProject.title} paper`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <FileText size={18} />
                            </Link>
                          )}
                        </div>
                        <p className="text-sm sm:text-base text-slate-600 mb-4 leading-relaxed mt-3 sm:mt-4">
                          {currentProject.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {currentProject.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
            </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    <div className="flex justify-center lg:justify-start gap-2 mt-4 relative z-30 pointer-events-auto">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          goToPrevious();
                        }}
                        disabled={!canGoPrevious}
                        className="relative z-40 flex items-center justify-center disabled:opacity-50 transition-colors md:h-10 md:w-10 md:rounded-full md:bg-gray-100 md:hover:bg-gray-200"
                        aria-label="Previous project"
                      >
                        <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          goToNext();
                        }}
                        disabled={!canGoNext}
                        className="relative z-40 flex items-center justify-center disabled:opacity-50 transition-colors md:h-10 md:w-10 md:rounded-full md:bg-gray-100 md:hover:bg-gray-200"
                        aria-label="Next project"
                      >
                        <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
