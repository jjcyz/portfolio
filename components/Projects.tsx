'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
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
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-purple-600">Loading preview...</p>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={isLoaded ? src : ''}
        title={title}
        className={`w-full h-full border-0 ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        {...props}
      />
    </div>
  );
};

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const currentProject = projects[currentIndex];

  return (
    <section id="projects" className="py-20 sm:py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader title="Featured Projects" />

          {/* Carousel Container */}
          <div className="relative">
            {/* Carousel */}
            <div className="relative overflow-hidden rounded-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject.id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl shadow-black/15 rounded-3xl overflow-hidden"
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  {/* Horizontal Layout: Image/Iframe on left, Content on right */}
                  <div className="flex flex-col lg:flex-row">
                    {/* Project Image or Iframe - Horizontal */}
                    <div className="relative w-full lg:w-1/2 h-64 sm:h-80 lg:h-96 overflow-hidden">
                      {currentProject.iframeUrl ? (
                        <>
                          <LazyIframe
                            src={currentProject.iframeUrl}
                            title={`${currentProject.title} live demo`}
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                          {/* Action Buttons */}
                          <div className="absolute top-4 right-4 flex gap-2">
                            {currentProject.githubUrl && (
                              <Link
                                href={currentProject.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                aria-label={`View ${currentProject.title} source code`}
                              >
                                <Github size={16} className="text-white" />
                              </Link>
                            )}
                            <Link
                              href={currentProject.liveUrl || currentProject.iframeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                              aria-label={`View ${currentProject.title} live demo`}
                            >
                              <ExternalLink size={16} className="text-white" />
                            </Link>
                          </div>
                        </>
                      ) : (
                        <>
                          <Image
                            src={currentProject.image}
                            alt={`${currentProject.title} project`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                          />
                          {/* Action Buttons */}
                          <div className="absolute top-4 right-4 flex gap-2">
                            {currentProject.githubUrl && (
                              <Link
                                href={currentProject.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors duration-200"
                                aria-label={`View ${currentProject.title} source code`}
                              >
                                <Github size={16} className="text-white" />
                              </Link>
                            )}
                            {currentProject.liveUrl && (
                              <Link
                                href={currentProject.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors duration-200"
                                aria-label={`View ${currentProject.title} live demo`}
                              >
                                <ExternalLink size={16} className="text-white" />
                              </Link>
                            )}
                            {currentProject.paperUrl && (
                              <Link
                                href={currentProject.paperUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors duration-200"
                                aria-label={`View ${currentProject.title} research paper`}
                              >
                                <FileText size={16} className="text-white" />
                              </Link>
                            )}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Project Content */}
                    <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                      <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">
                        {currentProject.title}
                      </h3>

                      <p className="text-slate-800 mb-6 leading-relaxed text-base">
                        {currentProject.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {currentProject.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 bg-purple-100/50 backdrop-blur-lg border border-purple-200/50 text-purple-700 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* View Project Button */}
                      <div>
                        <Link
                          href={currentProject.githubUrl || currentProject.liveUrl || currentProject.paperUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-purple-700 hover:text-purple-800 font-medium transition-colors duration-200 group/link text-base"
                        >
                          <span>View Project</span>
                          <ExternalLink size={18} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full shadow-lg hover:bg-white/30 transition-all duration-200 z-10"
              aria-label="Previous project"
            >
              <ChevronLeft size={24} className="text-slate-700" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full shadow-lg hover:bg-white/30 transition-all duration-200 z-10"
              aria-label="Next project"
            >
              <ChevronRight size={24} className="text-slate-700" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-purple-600'
                      : 'w-2 bg-purple-300/50 hover:bg-purple-400/50'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
