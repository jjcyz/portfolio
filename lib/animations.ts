import { Variants } from 'framer-motion';

/**
 * Shared animation variants for consistent animations across components
 */

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Common transition configurations
 */
export const transitions = {
  default: { duration: 0.6 },
  fast: { duration: 0.3 },
  slow: { duration: 0.8 },
  spring: { type: 'spring', stiffness: 100, damping: 10 },
};

/**
 * Common animation delays
 */
export const delays = {
  short: 0.1,
  medium: 0.2,
  long: 0.3,
};

