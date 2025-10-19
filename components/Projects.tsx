'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, FileText } from 'lucide-react';
import { projects } from '@/lib/data';
import { generateProjectStructuredData } from '@/lib/structured-data';

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // Pre-generate structured data for all projects
  const projectsWithStructuredData = projects.map(project => ({
    ...project,
    structuredData: generateProjectStructuredData(project)
  }));

  const categoryColors = {
    ai: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    web: 'bg-green-500/20 text-green-400 border-green-500/30',
    research: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    systems: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  };

  const categoryIcons = {
    ai: '🤖',
    web: '🌐',
    research: '🔬',
    systems: '⚙️',
  };

  return (
    <section id="projects" className="py-20 sm:py-24 lg:py-32">
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
              <span className="gradient-text">Featured Projects</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-400 mx-auto rounded-full"
            />
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsWithStructuredData.map((project, index) => {

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 0.6 + index * 0.2, duration: 0.6 }}
                  className="group"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Structured Data */}
                  <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(project.structuredData),
                    }}
                  />

                  <div className="bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl shadow-black/15 rounded-3xl overflow-hidden hover:bg-white/30 hover:backdrop-blur-3xl hover:border-white/40 hover:shadow-2xl hover:shadow-black/20 transition-all duration-300 h-full flex flex-col">
                    {/* Project Image or Iframe */}
                    <div className="relative h-48 overflow-hidden">
                      {project.iframeUrl ? (
                        <>
                          <iframe
                            src={project.iframeUrl}
                            title={`${project.title} live demo`}
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                          {/* Vercel Button - only show for iframes */}
                          <div className="absolute top-4 right-4 flex gap-2">
                            {project.githubUrl && (
                              <Link
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                aria-label={`View ${project.title} source code`}
                              >
                                <Github size={16} className="text-white" />
                              </Link>
                            )}
                            <Link
                              href={project.liveUrl || project.iframeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                              aria-label={`View ${project.title} on Vercel`}
                            >
                              <ExternalLink size={16} className="text-white" />
                            </Link>
                          </div>
                        </>
                      ) : (
                        <Image
                          src={project.image}
                          alt={`${project.title} project`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index < 2}
                        />
                      )}

                      {/* Overlay - only show for images, not iframes */}
                      {!project.iframeUrl && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${categoryColors[project.category]}`}>
                          {categoryIcons[project.category]} {project.category.toUpperCase()}
                        </span>
                      </div>

                      {/* Action Buttons - only show for images, not iframes */}
                      {!project.iframeUrl && (
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.githubUrl && (
                          <Link
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            aria-label={`View ${project.title} source code`}
                          >
                            <Github size={16} className="text-white" />
                          </Link>
                        )}
                        {project.liveUrl && (
                          <Link
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            aria-label={`View ${project.title} live demo`}
                          >
                            <ExternalLink size={16} className="text-white" />
                          </Link>
                        )}
                        {project.paperUrl && (
                          <Link
                            href={project.paperUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            aria-label={`View ${project.title} research paper`}
                          >
                            <FileText size={16} className="text-white" />
                          </Link>
                        )}
                      </div>
                      )}
                    </div>

                    {/* Project Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-base font-bold text-slate-800 mb-2 group-hover:text-purple-600 transition-colors duration-200">
                        {project.title}
                      </h3>

                      <p className="text-slate-800 mb-3 flex-1 leading-relaxed text-sm">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{
                              delay: 0.8 + index * 0.2 + techIndex * 0.1,
                              duration: 0.4
                            }}
                            className="px-2 py-1 bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg shadow-black/10 text-purple-800 rounded-full text-xs font-medium"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      {/* View Project Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: 1 + index * 0.2, duration: 0.4 }}
                        className="mt-auto"
                      >
                        <Link
                          href={project.githubUrl || project.liveUrl || project.paperUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-purple-700 hover:text-purple-800 font-medium transition-colors duration-200 group/link text-sm"
                        >
                          <span>View Project</span>
                          <ExternalLink size={14} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
