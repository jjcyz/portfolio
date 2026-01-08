'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Skill } from '@/types';
import SkillIcon from './SkillIcon';

interface SkillCategoryProps {
  label: string;
  skills: Skill[];
  direction?: 'left' | 'right';
  delay?: number;
}

/**
 * Reusable component for rendering a category of skills
 */
export default function SkillCategory({
  label,
  skills,
  direction = 'left',
  delay = 0.3
}: SkillCategoryProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  if (skills.length === 0) return null;

  const xOffset = direction === 'left' ? -20 : 20;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: xOffset }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: xOffset }}
      transition={{ delay, duration: 0.6 }}
    >
      <h3 className="text-xl font-bold text-slate-800 mb-6">{label}</h3>
      <div className="h-px bg-gradient-to-r from-purple-300 to-transparent mb-6"></div>
      <div className="space-y-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: delay + 0.1 + index * 0.05, duration: 0.4 }}
            className="flex items-start gap-5 group"
          >
            <SkillIcon skillName={skill.name} />
            <div className="flex-1 min-w-0 pt-1">
              <h4 className="font-semibold text-slate-800 mb-1.5">{skill.name}</h4>
              {skill.description && (
                <p className="text-sm text-slate-600 leading-relaxed">{skill.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

