'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink, Github, FileText, Trophy, Youtube } from 'lucide-react';
import { projects } from '@/lib/data';
import { getWebsitePreviewImage } from '@/lib/preview';

function getYouTubeEmbedUrl(url: string): string | null {
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  const longMatch = url.match(/youtube\.com\/watch\?v=([^?&]+)/);
  if (longMatch) return `https://www.youtube.com/embed/${longMatch[1]}`;
  return null;
}

function WebsitePreview({ url, title }: { url: string; title: string }) {
  return (
    <div className="relative w-full aspect-video overflow-hidden bg-white">
      {/* Browsers can block cross-origin iframes, so we use a screenshot preview instead. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getWebsitePreviewImage(url)}
        alt={`${title} preview`}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#F9F9F7] py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-10 sm:mb-14 group"
        >
          <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
          Back to home
        </Link>

        <header className="mb-14 sm:mb-20">
          <h1 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] text-neutral-950 tracking-tight">All projects</h1>
        </header>

        <div className="space-y-20 sm:space-y-24 lg:space-y-28">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            const youTubeEmbed = project.videoUrl ? getYouTubeEmbedUrl(project.videoUrl) : null;

            return (
              <article
                key={project.id}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-14 items-start`}
              >
                <div className="w-full lg:w-1/2">
                  <div className="rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100">
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
                      <WebsitePreview url={project.websiteUrl} title={project.title} />
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

                <div className="w-full lg:w-1/2">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 tracking-tight">{project.title}</h2>
                    {project.websiteUrl && (
                      <Link
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-neutral-700 transition-colors"
                        aria-label="Open website"
                      >
                        <ExternalLink size={16} />
                      </Link>
                    )}
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-neutral-700 transition-colors"
                        aria-label="Open GitHub"
                      >
                        <Github size={16} />
                      </Link>
                    )}
                    {project.devpostUrl && (
                      <Link
                        href={project.devpostUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-neutral-700 transition-colors"
                        aria-label="Open Devpost"
                      >
                        <Trophy size={16} />
                      </Link>
                    )}
                    {project.paperUrl && (
                      <Link
                        href={project.paperUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-neutral-700 transition-colors"
                        aria-label="Open paper"
                      >
                        <FileText size={16} />
                      </Link>
                    )}
                    {project.videoUrl && (
                      <Link
                        href={project.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-neutral-700 transition-colors"
                        aria-label="Open video"
                      >
                        <Youtube size={16} />
                      </Link>
                    )}
                  </div>

                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-5">{project.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-full border border-neutral-200 bg-white text-neutral-700 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
