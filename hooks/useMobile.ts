import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the current viewport is mobile
 * Uses matchMedia for efficient detection
 */
export function useMobile(breakpoint: number = 767): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.matchMedia(`(max-width: ${breakpoint}px)`).matches);
    };

    // Check on mount
    checkIsMobile();

    // Listen for resize events
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    // Modern browsers support addEventListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', checkIsMobile);
      return () => mediaQuery.removeEventListener('change', checkIsMobile);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(checkIsMobile);
      return () => mediaQuery.removeListener(checkIsMobile);
    }
  }, [breakpoint]);

  return isMobile;
}

