'use client';

import { motion } from 'framer-motion';
import { useState, ReactNode } from 'react';
import { useMobile } from '@/hooks/useMobile';

interface ExpandableModuleProps {
  title: string;
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Reusable expandable module component that expands on hover (desktop) or click (mobile)
 */
export default function ExpandableModule({
  title,
  children,
  delay = 1.0,
  className = ''
}: ExpandableModuleProps) {
  const isMobile = useMobile();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay, duration: 0.8 }}
      className={`group/module bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 backdrop-blur-2xl shadow-2xl shadow-purple-500/20 rounded-3xl overflow-hidden relative p-3 sm:p-4 ${
        isMobile ? 'cursor-pointer' : 'cursor-default'
      } ${className}`}
      onClick={() => {
        if (isMobile) {
          setIsExpanded(!isExpanded);
        }
      }}
    >
      {/* Header - Always Visible */}
      <div className="relative z-10 mb-6 text-center">
        <h3 className="text-xl font-bold text-purple-600 flex items-center justify-center gap-2">
          {title}
        </h3>
      </div>

      {/* Content - Expandable */}
      <div className={`relative z-10 transition-all duration-300 overflow-hidden ${
        isMobile
          ? (isExpanded ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0')
          : 'opacity-0 max-h-0 group-hover/module:opacity-100 group-hover/module:max-h-96'
      }`}>
        {children}
      </div>
    </motion.div>
  );
}

