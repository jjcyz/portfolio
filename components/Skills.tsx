'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { skills } from '@/lib/data';
import SectionHeader from '@/components/ui/SectionHeader';
import SkillCategory from '@/components/ui/SkillCategory';

// Memoize skill categories to avoid recalculating on every render
const getSkillCategories = () => ({
  frontend: {
    label: 'Frontend',
    skills: skills.filter(s => s.category === 'frontend')
  },
  backend: {
    label: 'Backend',
    skills: skills.filter(s => s.category === 'backend')
  },
  tools: {
    label: 'Tools & DevOps',
    skills: skills.filter(s => s.category === 'tools')
  },
  design: {
    label: 'Design & Workflow',
    skills: skills.filter(s => s.category === 'design')
  },
});

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Memoize skill categories to avoid recalculating on every render
  const skillCategories = useMemo(() => getSkillCategories(), []);

  return (
    <section id="skills" className="py-20 sm:py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <SectionHeader title="What I Use" className="mb-20" />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-4xl mx-auto">
            {/* Left Column */}
            <div className="space-y-12">
              <SkillCategory
                label={skillCategories.frontend.label}
                skills={skillCategories.frontend.skills}
                direction="left"
                delay={0.3}
              />
              <SkillCategory
                label={skillCategories.tools.label}
                skills={skillCategories.tools.skills}
                direction="left"
                delay={0.5}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-12">
              <SkillCategory
                label={skillCategories.backend.label}
                skills={skillCategories.backend.skills}
                direction="right"
                delay={0.3}
              />
              <SkillCategory
                label={skillCategories.design.label}
                skills={skillCategories.design.skills}
                direction="right"
                delay={0.5}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
