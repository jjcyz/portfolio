'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/types';
import LazyIframe from './LazyIframe';

interface DesktopFrameProps {
  project: Project;
}

const DESKTOP_FRAME_WIDTH = 1920;
const DESKTOP_FRAME_HEIGHT = 1300;

export default function DesktopFrame({ project }: DesktopFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    let rafId: number | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const updateScale = () => {
      if (frameRef.current) {
        const container = frameRef.current;
        const scaleX = container.offsetWidth / DESKTOP_FRAME_WIDTH;
        const scaleY = container.offsetHeight / DESKTOP_FRAME_HEIGHT;
        setScale(Math.min(scaleX, scaleY));
      }
    };

    // Throttle updates using requestAnimationFrame
    const throttledUpdateScale = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updateScale();
          rafId = null;
        });
      }
    };

    const resizeObserver = new ResizeObserver(throttledUpdateScale);
    if (frameRef.current) {
      resizeObserver.observe(frameRef.current);
      updateScale();
    }

    // Debounce window resize events
    const handleResize = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(throttledUpdateScale, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="relative w-full lg:w-2/3 flex-shrink-0 overflow-visible">
      <div className="relative w-full aspect-[16/11] min-h-[50vh] sm:min-h-[60vh] lg:min-h-[100vh] scale-100 sm:scale-105 lg:scale-125">
        {/* Screen Content Area - Behind the frame (Animated) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute"
            style={{
              top: '15%',
              left: '11.5%',
              right: '11.5%',
              bottom: '14%',
              zIndex: 1,
            }}
          >
            <div ref={frameRef} className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
              {project.websiteUrl ? (
                <div
                  style={{
                    width: `${DESKTOP_FRAME_WIDTH}px`,
                    height: `${DESKTOP_FRAME_HEIGHT}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center',
                  }}
                >
                  <LazyIframe
                    key={`desktop-${project.id}`}
                    src={project.websiteUrl}
                    title={`${project.title} live demo`}
                    width={DESKTOP_FRAME_WIDTH}
                    height={DESKTOP_FRAME_HEIGHT}
                    className="border-0"
                    style={{
                      display: 'block',
                      border: 'none',
                      width: `${DESKTOP_FRAME_WIDTH}px`,
                      height: `${DESKTOP_FRAME_HEIGHT}px`,
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: `${DESKTOP_FRAME_WIDTH}px`,
                    height: `${DESKTOP_FRAME_HEIGHT}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center',
                  }}
                  className="relative overflow-hidden"
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} project`}
                    fill
                    className="object-cover"
                    sizes={`${DESKTOP_FRAME_WIDTH}px`}
                    priority={project.paperUrl !== undefined}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

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
  );
}
