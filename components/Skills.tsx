'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Wrench, Award, Database } from 'lucide-react';
import { skills } from '@/lib/data';

const skillCategories = {
  languages: { icon: Code, label: 'Programming Languages', color: 'text-blue-400' },
  frameworks: { icon: Database, label: 'Frameworks & Libraries', color: 'text-green-400' },
  tools: { icon: Wrench, label: 'Tools & Technologies', color: 'text-purple-400' },
  certifications: { icon: Award, label: 'Certifications', color: 'text-yellow-400' },
};

const proficiencyColors = {
  beginner: 'bg-gray-600',
  intermediate: 'bg-blue-500',
  advanced: 'bg-green-500',
  expert: 'bg-purple-500',
};

const proficiencyLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
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
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            >
              <span className="gradient-text">Technical Skills</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-600 mx-auto rounded-full"
            />
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skillCategories).map(([categoryKey, categoryInfo], categoryIndex) => {
              const categorySkills = skillsByCategory[categoryKey] || [];
              const IconComponent = categoryInfo.icon;

              return (
                <motion.div
                  key={categoryKey}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 0.6 + categoryIndex * 0.2, duration: 0.6 }}
                  className="glass-effect p-6 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2 rounded-lg bg-white/10 group-hover:scale-110 transition-transform duration-200 ${categoryInfo.color}`}>
                      <IconComponent size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-100">
                      {categoryInfo.label}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-3">
                    {categorySkills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{
                          delay: 0.8 + categoryIndex * 0.2 + skillIndex * 0.1,
                          duration: 0.4
                        }}
                        className="group/skill"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300 font-medium group-hover/skill:text-white transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {proficiencyLabels[skill.proficiency]}
                          </span>
                        </div>

                        {/* Proficiency Bar */}
                        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? {
                              width: skill.proficiency === 'beginner' ? '25%' :
                                     skill.proficiency === 'intermediate' ? '50%' :
                                     skill.proficiency === 'advanced' ? '75%' : '100%'
                            } : { width: 0 }}
                            transition={{
                              delay: 1 + categoryIndex * 0.2 + skillIndex * 0.1,
                              duration: 0.8,
                              ease: 'easeOut'
                            }}
                            className={`h-full ${proficiencyColors[skill.proficiency]} rounded-full`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Skills Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="glass-effect p-8 rounded-xl max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">
                Continuous Learning & Growth
              </h3>
              <p className="text-gray-400 leading-relaxed">
                I&apos;m passionate about staying current with emerging technologies and continuously expanding my skill set.
                Currently exploring advanced AI/ML techniques, cloud architecture, and modern web development practices.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
