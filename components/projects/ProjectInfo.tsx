'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, Github, FileText, Trophy } from 'lucide-react';
import { Project } from '@/types';

interface ProjectInfoProps {
  project: Project;
}

export default function ProjectInfo({ project }: ProjectInfoProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
            {project.title}
          </h3>
          {project.websiteUrl && (
            <Link
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900 transition-colors duration-200"
              aria-label={`View ${project.title} website`}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={18} />
            </Link>
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900 transition-colors duration-200"
              aria-label={`View ${project.title} on GitHub`}
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={18} />
            </Link>
          )}
          {project.devpostUrl && (
            <Link
              href={project.devpostUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900 transition-colors duration-200"
              aria-label={`View ${project.title} on Devpost`}
              onClick={(e) => e.stopPropagation()}
            >
              <Trophy size={18} />
            </Link>
          )}
          {project.paperUrl && (
            <Link
              href={project.paperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900 transition-colors duration-200"
              aria-label={`View ${project.title} paper`}
              onClick={(e) => e.stopPropagation()}
            >
              <FileText size={18} />
            </Link>
          )}
        </div>
        <p className="text-sm sm:text-base text-slate-600 mb-4 leading-relaxed mt-3 sm:mt-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
