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

  // Reset all states when src changes and clean up iframe
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
    setShouldLoad(false);

    // Properly clean up the iframe
    if (iframeRef.current) {
      // Remove src to stop loading and free resources
      iframeRef.current.src = 'about:blank';
      // Remove contentDocument if accessible
      try {
        if (iframeRef.current.contentDocument) {
          iframeRef.current.contentDocument.open();
          iframeRef.current.contentDocument.close();
        }
      } catch (e) {
        // Cross-origin iframe, can't access contentDocument
      }
    }
  }, [src]);

  // Handle loading and unloading based on viewport visibility
  useEffect(() => {
    if (isInView && src && !shouldLoad) {
      // Minimal delay to ensure previous iframe is cleaned up before loading new one
      const timeoutId = setTimeout(() => {
        setShouldLoad(true);
      }, 50);
      return () => clearTimeout(timeoutId);
    } else if (!isInView && iframeRef.current && shouldLoad) {
      // Unload iframe when scrolled out of view to save resources
      iframeRef.current.src = 'about:blank';
      setIsLoaded(false);
    }
  }, [isInView, src, shouldLoad]);

  // Set iframe src when it should be loaded
  useEffect(() => {
    if (shouldLoad && iframeRef.current && isInView) {
      if (iframeRef.current.src === 'about:blank' || !iframeRef.current.src) {
        iframeRef.current.src = src;
      }
    }
  }, [shouldLoad, isInView, src]);

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
        <div className="absolute inset-0 bg-white flex items-center justify-center z-10 rounded-[20px]">
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
              <p className={`${width < 500 ? 'text-sm sm:text-base' : 'text-2xl sm:text-3xl'} text-black font-semibold`}>
                Loading interactive preview ...
              </p>
            )}
          </div>
        </div>
      )}
      {shouldLoad && (
        <iframe
          key={src}
          ref={iframeRef}
          src={isInView ? src : 'about:blank'}
          title={title}
          className={`border-0 rounded-[32px] ${!isLoaded || hasError ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ${className || ''}`}
          width={width}
          height={height}
          style={style}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          {...props}
        />
      )}
    </div>
  );
}
