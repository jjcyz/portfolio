'use client';

import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';

interface LazyIframeProps {
  src: string;
  title: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

export default function LazyIframe({ src, title, width, height, className, style, ...props }: LazyIframeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const isInView = useInView(containerRef, { once: false, margin: '50px' });

  // Reset all states when src changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
    setShouldLoad(false);
    
    // Clear the iframe src to force a complete reload
    if (iframeRef.current) {
      iframeRef.current.src = '';
    }
  }, [src]);

  // Load iframe when in view and src is available
  useEffect(() => {
    if (isInView && src && !shouldLoad) {
      // Small delay to ensure previous iframe is cleaned up before loading new one
      const timeoutId = setTimeout(() => {
        setShouldLoad(true);
      }, 150);
      return () => clearTimeout(timeoutId);
    }
  }, [isInView, src, shouldLoad]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-[20px]" 
      style={{ width: '100%', height: '100%' }}
    >
      {(!isLoaded || hasError) && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 backdrop-blur-2xl shadow-2xl shadow-purple-500/20 flex items-center justify-center z-10 rounded-[20px]">
          <div className="text-center">
            {hasError ? (
              <>
                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <p className="text-base text-red-600 font-semibold">Failed to load preview</p>
                <p className="text-sm text-red-500 mt-2">The website may be unavailable</p>
              </>
            ) : (
              <>
                <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-base text-purple-600 font-semibold">Loading preview...</p>
              </>
            )}
          </div>
        </div>
      )}
      {shouldLoad && (
        <iframe
          key={src}
          ref={iframeRef}
          src={src}
          title={title}
          className={`border-0 rounded-[32px] ${!isLoaded || hasError ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ${className || ''}`}
          width={width}
          height={height}
          style={style}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
}
