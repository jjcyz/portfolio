'use client';

import { motion } from 'framer-motion';
import { fadeInDown, transitions, delays } from '@/lib/animations';

interface SectionHeaderProps {
  title: string;
  delay?: number;
  className?: string;
}

/**
 * Reusable section header component with consistent styling and animation
 */
export default function SectionHeader({
  title,
  delay = delays.medium,
  className = ''
}: SectionHeaderProps) {
  return (
    <div className={`text-center mb-4 sm:mb-6 lg:mb-8 ${className}`}>
      <motion.h2
        variants={fadeInDown}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        transition={{ ...transitions.default, delay }}
        className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
      >
        <span className="gradient-text">{title}</span>
      </motion.h2>
    </div>
  );
}

