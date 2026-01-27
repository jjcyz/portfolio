'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Project } from '@/types';
import MobileFrame from './MobileFrame';
<<<<<<< HEAD
import ProjectNavigation from './ProjectNavigation';
=======
>>>>>>> e4a77bf (Removed simultaneous iframe loading)
import { useMobile } from '@/hooks/useMobile';

interface MobileFrameSectionProps {
  project: Project;
  isInView: boolean;
  canGoPrevious: boolean;
  canGoNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

<<<<<<< HEAD
export default function MobileFrameSection({ 
  project, 
  isInView, 
  canGoPrevious, 
  canGoNext, 
  onPrevious, 
  onNext 
}: MobileFrameSectionProps) {
=======
export default function MobileFrameSection({ project, isInView }: MobileFrameSectionProps) {
>>>>>>> e4a77bf (Removed simultaneous iframe loading)
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sectionRef, { once: false, margin: '100px' });
  const isMobileDevice = useMobile(1024);
  const [shouldLoadMobileFrame, setShouldLoadMobileFrame] = useState(false);

  // On mobile devices, delay loading mobile frame to prevent simultaneous loading
  // On desktop, load when scrolled into view
  useEffect(() => {
    if (isMobileDevice) {
      // On mobile: wait for section to be in view, then add additional delay
      // to ensure desktop frame has started loading first
      if (isSectionInView) {
        const timer = setTimeout(() => {
          setShouldLoadMobileFrame(true);
<<<<<<< HEAD
        }, 1500); // Delay to let desktop frame load first
=======
        }, 2000); // Increased delay to let desktop frame load first
>>>>>>> e4a77bf (Removed simultaneous iframe loading)
        return () => clearTimeout(timer);
      } else {
        setShouldLoadMobileFrame(false);
      }
    } else {
      // On desktop: load when scrolled into view
      setShouldLoadMobileFrame(isSectionInView);
    }
  }, [isMobileDevice, isSectionInView]);

  return (
    <div ref={sectionRef} className="mt-8 sm:mt-12 lg:mt-16 w-full">
      <div className="max-w-5xl ml-auto mr-0 lg:mr-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-6 sm:gap-8 lg:gap-12 lg:justify-start">
          {/* Mobile Frame Text - Left Side */}
          <div className="w-full lg:w-2/5 flex flex-col justify-center lg:pl-12 lg:pr-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight mb-3">
                Check the project out on mobile devices
              </h3>
              <p className="text-sm sm:text-base text-slate-600 mb-4 leading-relaxed">
                I find having a mobile view is important because it&apos;s more accessible.
              </p>
              
              {/* Navigation Arrows */}
              <ProjectNavigation
                canGoPrevious={canGoPrevious}
                canGoNext={canGoNext}
                onPrevious={onPrevious}
                onNext={onNext}
              />
            </motion.div>
          </div>

          {/* iPhone Frame Container - Right Side */}
<<<<<<< HEAD
          {shouldLoadMobileFrame && <MobileFrame project={project} />}
=======
          {shouldLoadMobileFrame && <MobileFrame key={project.id} project={project} />}
>>>>>>> e4a77bf (Removed simultaneous iframe loading)
        </div>
      </div>
    </div>
  );
}
