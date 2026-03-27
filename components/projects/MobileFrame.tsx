'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/types';
import LazyIframe from './LazyIframe';

function getYouTubeEmbedUrl(url: string): string | null {
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  const longMatch = url.match(/youtube\.com\/watch\?v=([^?&]+)/);
  if (longMatch) return `https://www.youtube.com/embed/${longMatch[1]}`;
  return null;
}

interface MobileFrameProps {
  project: Project;
}

const MOBILE_FRAME_WIDTH = 390;
const MOBILE_FRAME_HEIGHT = 844;

export default function MobileFrame({ project }: MobileFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    let rafId: number | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const updateScale = () => {
      if (frameRef.current) {
        const container = frameRef.current;
        const scaleX = container.offsetWidth / MOBILE_FRAME_WIDTH;
        const scaleY = container.offsetHeight / MOBILE_FRAME_HEIGHT;
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
    <div className="relative w-full lg:w-3/5 flex-shrink-0 overflow-visible flex justify-center lg:justify-end lg:pr-8">
      <div className="relative w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[340px] aspect-[9/19.5]">
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
              top: '5%',
              left: '4%',
              right: '4%',
              bottom: '5%',
              zIndex: 1,
            }}
          >
            <div ref={frameRef} className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center rounded-[20px]">
              {project.websiteUrl ? (
                <div
                  style={{
                    width: `${MOBILE_FRAME_WIDTH}px`,
                    height: `${MOBILE_FRAME_HEIGHT}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center',
                  }}
                >
                  <LazyIframe
                    key={`mobile-${project.id}`}
                    src={project.websiteUrl}
                    title={`${project.title} mobile demo`}
                    width={MOBILE_FRAME_WIDTH}
                    height={MOBILE_FRAME_HEIGHT}
                    className="border-0"
                    style={{
                      display: 'block',
                      border: 'none',
                      width: `${MOBILE_FRAME_WIDTH}px`,
                      height: `${MOBILE_FRAME_HEIGHT}px`,
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : project.videoUrl && getYouTubeEmbedUrl(project.videoUrl) ? (
                <div
                  style={{
                    width: `${MOBILE_FRAME_WIDTH}px`,
                    height: `${MOBILE_FRAME_HEIGHT}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center',
                  }}
                  className="bg-black flex items-center justify-center"
                >
                  <iframe
                    src={getYouTubeEmbedUrl(project.videoUrl)!}
                    title={`${project.title} video`}
                    width={MOBILE_FRAME_WIDTH}
                    height={MOBILE_FRAME_HEIGHT}
                    className="border-0"
                    style={{
                      display: 'block',
                      border: 'none',
                      width: `${MOBILE_FRAME_WIDTH}px`,
                      height: `${MOBILE_FRAME_HEIGHT}px`,
                    }}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: `${MOBILE_FRAME_WIDTH}px`,
                    height: `${MOBILE_FRAME_HEIGHT}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center',
                  }}
                  className="relative overflow-hidden"
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} project mobile`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 300px, 340px"
                    priority={project.paperUrl !== undefined}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* iPhone 17 Pro Max Image Background - Overlay on top (Static) */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Image
            src="/images/iPhone 17 Pro Max - Silver.png"
            alt="iPhone 17 Pro Max Frame"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 240px, (max-width: 1024px) 260px, 300px"
            priority
          />
        </div>
      </div>
    </div>
  );
}
