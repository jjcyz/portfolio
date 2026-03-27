'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink, Github, FileText, Trophy, Youtube } from 'lucide-react';
import { projects } from '@/lib/data';

function getYouTubeThumbnail(url: string): string | null {
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return `https://img.youtube.com/vi/${shortMatch[1]}/maxresdefault.jpg`;
  const longMatch = url.match(/youtube\.com\/watch\?v=([^?&]+)/);
  if (longMatch) return `https://img.youtube.com/vi/${longMatch[1]}/maxresdefault.jpg`;
  return null;
}

function getYouTubeEmbedUrl(url: string): string | null {
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  const longMatch = url.match(/youtube\.com\/watch\?v=([^?&]+)/);
  if (longMatch) return `https://www.youtube.com/embed/${longMatch[1]}`;
  return null;
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors duration-200 mb-10 sm:mb-14 group"
        >
          <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
          <span className="text-sm">Back</span>
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-16 sm:mb-20 lg:mb-24 text-center"
        >
          <span className="gradient-text">All Projects</span>
        </motion.h1>

        <div className="space-y-20 sm:space-y-28 lg:space-y-32">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            const youTubeThumbnail = project.videoUrl ? getYouTubeThumbnail(project.videoUrl) : null;
            const youTubeEmbed = project.videoUrl ? getYouTubeEmbedUrl(project.videoUrl) : null;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-14 items-center`}
              >
                {/* Preview */}
                <div className="w-full lg:w-1/2">
                  <div className="rounded-xl overflow-hidden shadow-md bg-slate-50 border border-slate-100">
                    {youTubeEmbed ? (
                      <div className="relative w-full aspect-video">
                        <iframe
                          src={youTubeEmbed}
                          title={`${project.title} video`}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full border-0"
                          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : project.websiteUrl ? (
                      <div className="relative w-full aspect-video overflow-hidden">
                        <div
                          className="absolute top-0 left-0 pointer-events-none"
                          style={{
                            width: '200%',
                            height: '200%',
                            transform: 'scale(0.5)',
                            transformOrigin: 'top left',
                          }}
                        >
                          <iframe
                            src={project.websiteUrl}
                            title={`${project.title} preview`}
                            loading="lazy"
                            className="w-full h-full border-0"
                            tabIndex={-1}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full aspect-video">
                        <Image
                          src={project.image}
                          alt={`${project.title} preview`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center gap-2 mb-3">
                    <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
                      {project.title}
                    </h2>
                    {project.websiteUrl && (
                      <Link href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-700 transition-colors duration-200">
                        <ExternalLink size={16} />
                      </Link>
                    )}
                    {project.githubUrl && (
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-700 transition-colors duration-200">
                        <Github size={16} />
                      </Link>
                    )}
                    {project.devpostUrl && (
                      <Link href={project.devpostUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-700 transition-colors duration-200">
                        <Trophy size={16} />
                      </Link>
                    )}
                    {project.paperUrl && (
                      <Link href={project.paperUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-700 transition-colors duration-200">
                        <FileText size={16} />
                      </Link>
                    )}
                    {project.videoUrl && (
                      <Link href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-700 transition-colors duration-200">
                        <Youtube size={16} />
                      </Link>
                    )}
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-5">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
