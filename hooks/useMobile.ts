import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the current viewport is mobile
 * Uses matchMedia for efficient detection
 */
export function useMobile(breakpoint: number = 767): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    
    const checkIsMobile = () => {
      setIsMobile(mediaQuery.matches);
    };

    // Check on mount
    checkIsMobile();

    // Listen for resize events
    mediaQuery.addEventListener('change', checkIsMobile);
    return () => mediaQuery.removeEventListener('change', checkIsMobile);
  }, [breakpoint]);

  return isMobile;
}

