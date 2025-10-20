'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Code, Database, Cloud, Brain, Wrench, Sparkles } from 'lucide-react';
import { skills } from '@/lib/data';

const skillCategories = {
  languages: {
    icon: Code,
    label: 'Programming Languages'
  },
  frameworks: {
    icon: Sparkles,
    label: 'Frameworks & Libraries'
  },
  cloud: {
    icon: Cloud,
    label: 'Cloud & Infrastructure'
  },
  databases: {
    icon: Database,
    label: 'Databases'
  },
  ai: {
    icon: Brain,
    label: 'AI & Machine Learning'
  },
  tools: {
    icon: Wrench,
    label: 'Tools & Technologies'
  },
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expandedSkills, setExpandedSkills] = useState<Set<string>>(new Set());

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const toggleSkillCategory = (categoryKey: string) => {
    setExpandedSkills(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryKey)) {
        newSet.delete(categoryKey);
      } else {
        newSet.add(categoryKey);
      }
      return newSet;
    });
  };

  return (
    <section id="skills" className="py-20 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
            >
              <span className="gradient-text">Technical Skills</span>
            </motion.h2>
          </div>

          {/* Computer Component Layout */}
          <div className="relative max-w-full mx-auto">
            {/* Main Computer Component Container - Like a motherboard */}
            <div className="relative bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 backdrop-blur-2xl border-2 border-purple-400/30 shadow-2xl shadow-purple-500/20 rounded-3xl p-4 sm:p-6 lg:p-8 overflow-hidden">
              {/* Circuit Board Pattern Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 left-4 w-2 h-2 bg-purple-400 rounded-full"></div>
                <div className="absolute top-4 right-4 w-2 h-2 bg-pink-400 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-purple-400 rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-2 h-2 bg-pink-400 rounded-full"></div>
                <div className="absolute top-1/2 left-8 w-1 h-1 bg-purple-300 rounded-full"></div>
                <div className="absolute top-1/2 right-8 w-1 h-1 bg-pink-300 rounded-full"></div>
                <div className="absolute top-8 left-1/2 w-1 h-1 bg-purple-300 rounded-full"></div>
                <div className="absolute bottom-8 left-1/2 w-1 h-1 bg-pink-300 rounded-full"></div>
              </div>

              {/* Component Grid */}
              <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Object.entries(skillCategories).map(([categoryKey, categoryInfo], categoryIndex) => {
              const categorySkills = skillsByCategory[categoryKey] || [];
              const IconComponent = categoryInfo.icon;

              if (categorySkills.length === 0) return null;

              return (
                <motion.div
                  key={categoryKey}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.8 + categoryIndex * 0.1, duration: 0.6 }}
                      className="group relative"
                    >
                      {/* Component Card - Compact by default, expands on hover (desktop) or click (mobile) */}
                      <div
                        className={`w-full bg-white/20 backdrop-blur-2xl border border-purple-300/40 shadow-xl shadow-purple-500/20 rounded-xl transition-all duration-300 overflow-hidden relative ${
                          // Mobile: click to expand, Desktop: hover to expand
                          window.matchMedia('(max-width: 767px)').matches
                            ? 'cursor-pointer'
                            : 'cursor-default hover:bg-white/30 hover:backdrop-blur-3xl hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-500/30 group-hover:scale-105 group-hover:z-10'
                        }`}
                        onClick={() => {
                          // Only allow click on mobile devices
                          if (window.matchMedia('(max-width: 767px)').matches) {
                            toggleSkillCategory(categoryKey);
                          }
                        }}
                      >

                        {/* Default State - Compact Header Only */}
                        <div className={`p-4 ${expandedSkills.has(categoryKey) ? 'hidden' : 'block md:group-hover:hidden'}`}>
                          <div className="flex items-center gap-3">
                            <div className="p-2">
                              <IconComponent size={16} className="text-slate-700" />
                            </div>
                            <h3 className="text-sm font-semibold text-slate-800">
                              {categoryInfo.label}
                            </h3>
                          </div>
                        </div>

                        {/* Expanded State - Shows on hover (desktop) or click (mobile) */}
                        <div className={`${expandedSkills.has(categoryKey) ? 'block' : 'hidden md:group-hover:block'} p-4`}>
                          {/* Expanded Header */}
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 group-hover:scale-110 transition-transform duration-200">
                              <IconComponent size={16} className="text-slate-700" />
                      </div>
                            <h3 className="text-sm font-semibold text-slate-800">
                        {categoryInfo.label}
                      </h3>
                    </div>

                          {/* Skills List */}
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-1.5">
                      {categorySkills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{
                                    delay: 1 + categoryIndex * 0.1 + skillIndex * 0.03,
                                    duration: 0.3
                          }}
                                  className="px-2 py-1 bg-purple-100/50 backdrop-blur-lg border border-purple-200/50 text-purple-700 text-xs font-medium rounded-full transition-all duration-200"
                        >
                          {skill.name}
                        </motion.span>
                      ))}
                            </div>
                          </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>


            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
