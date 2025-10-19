'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Database, Cloud, Brain, Wrench, Sparkles } from 'lucide-react';
import { skills } from '@/lib/data';

const skillCategories = {
  languages: {
    icon: Code,
    label: 'Programming Languages',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20'
  },
  frameworks: {
    icon: Sparkles,
    label: 'Frameworks & Libraries',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20'
  },
  cloud: {
    icon: Cloud,
    label: 'Cloud & Infrastructure',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20'
  },
  databases: {
    icon: Database,
    label: 'Databases',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20'
  },
  ai: {
    icon: Brain,
    label: 'AI & Machine Learning',
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20'
  },
  tools: {
    icon: Wrench,
    label: 'Tools & Technologies',
    color: 'from-gray-500 to-slate-500',
    bgColor: 'bg-gray-500/10',
    borderColor: 'border-gray-500/20'
  },
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-400 mx-auto rounded-full"
            />
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skillCategories).map(([categoryKey, categoryInfo], categoryIndex) => {
              const categorySkills = skillsByCategory[categoryKey] || [];
              const IconComponent = categoryInfo.icon;

              if (categorySkills.length === 0) return null;

              return (
                <motion.div
                  key={categoryKey}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 0.8 + categoryIndex * 0.1, duration: 0.6 }}
                  className="group"
                >
                  {/* Category Card */}
                  <div className="liquid-glass-card p-6 hover:liquid-glass-card-hover hover:scale-105 transition-all duration-300">
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${categoryInfo.color} group-hover:scale-110 transition-transform duration-200`}>
                        <IconComponent size={20} className="text-white" />
                      </div>
                      <h3 className="text-base font-semibold text-slate-800">
                        {categoryInfo.label}
                      </h3>
                    </div>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{
                            delay: 1 + categoryIndex * 0.1 + skillIndex * 0.05,
                            duration: 0.4
                          }}
                          className="px-3 py-1.5 liquid-glass-subtle hover:liquid-glass text-slate-800 text-sm font-medium rounded-full transition-all duration-200 cursor-default"
                        >
                          {skill.name}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Skills Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="liquid-glass-card p-10 max-w-3xl mx-auto">
              <p className="text-slate-800 leading-relaxed">
                New technologies are being developed every day. I&apos;m always finding new
                ways to improve my skills using them.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
