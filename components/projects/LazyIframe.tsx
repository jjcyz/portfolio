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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isInView = useInView(iframeRef, { once: true, margin: '50px' });

  useEffect(() => {
    if (isInView && !isLoaded) {
      setIsLoaded(true);
    }
  }, [isInView, isLoaded]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-[20px]" style={{ width: '100%', height: '100%' }}>
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
        className={`border-0 rounded-[20px] ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ${className || ''}`}
        width={width}
        height={height}
        style={style}
        {...props}
      />
    </div>
  );
}
