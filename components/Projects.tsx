'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { projects, PROJECT_FILTER_LABELS } from '@/lib/data';
import type { Project, ProjectCategory } from '@/types';

type FilterId = 'all' | 'hackathon' | 'research' | 'product';

function categoryLabel(cat: ProjectCategory): string {
  switch (cat) {
    case 'hackathon':
      return 'Hackathon';
    case 'research':
      return 'Research';
    case 'community':
      return 'Community';
    case 'product':
    default:
      return 'Product';
  }
}

function stripEmoji(text: string): string {
  const out = Array.from(text)
    .filter((ch) => {
      const cp = ch.codePointAt(0) ?? 0;
      if (cp >= 0x1f300 && cp <= 0x1faf6) return false;
      if (cp >= 0x2600 && cp <= 0x26ff) return false;
      return true;
    })
    .join('');
  return out.replace(/\s+/g, ' ').trim();
}

const DOT_COLORS = ['bg-orange-500', 'bg-[#3B5CCC]', 'bg-violet-500', 'bg-rose-500', 'bg-teal-500'];

function dotsForProjectIndex(i: number) {
  return DOT_COLORS[i % DOT_COLORS.length];
}

function matchesFilter(project: Project, filter: FilterId): boolean {
  if (filter === 'all') return project.featured;
  if (filter === 'product') return project.category === 'product' || project.category === 'community';
  return project.category === filter;
}

export default function Projects() {
  const [filter, setFilter] = useState<FilterId>('all');

  const HOME_PROJECT_LIMIT = 9;

  const visible = useMemo(
    () =>
      projects
        .filter((p) => matchesFilter(p, filter))
        .sort((a, b) => b.yearLabel.localeCompare(a.yearLabel))
        .slice(0, HOME_PROJECT_LIMIT),
    [filter]
  );

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24 bg-[#F9F9F7]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] text-neutral-950 tracking-tight">
              Things I&apos;ve built
            </h2>
            <p className="mt-3 text-sm text-neutral-600 max-w-xl">
              A mix of products, hackathon builds, club sites, and research — full write-ups live on{' '}
              <Link href="/projects" className="underline underline-offset-2 hover:text-neutral-900">
                the projects page
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-neutral-950 pb-3 mb-8">
          {PROJECT_FILTER_LABELS.map((pill) => {
            const active = filter === pill.id;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => setFilter(pill.id)}
                className={`text-[10px] sm:text-[11px] tracking-[0.22em] uppercase pb-3 -mb-[13px] border-b-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B5CCC] rounded-sm ${
                  active ? 'text-neutral-950 border-neutral-950' : 'text-neutral-400 border-transparent hover:text-neutral-600'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 list-none">
          {visible.map((project, index) => (
            <ProjectCard key={project.id} project={project} dotClass={dotsForProjectIndex(index)} />
          ))}
        </ul>

        <p className="mt-12 text-center text-sm text-neutral-500">
          <Link href="/projects" className="underline underline-offset-2 hover:text-neutral-800">
            View all projects →
          </Link>
        </p>
      </div>
    </section>
  );
}

function ProjectCard({ project, dotClass }: { project: Project; dotClass: string }) {
  const href = project.websiteUrl ?? project.githubUrl ?? project.devpostUrl ?? '/projects';
  const external = Boolean(project.websiteUrl ?? project.githubUrl ?? project.devpostUrl);
  const summary = stripEmoji(project.description);
  const short =
    summary.length > 140 ? `${summary.slice(0, 137)}…` : summary;
  const categoryUpper = `${categoryLabel(project.category).toUpperCase()} ${project.yearLabel}`;

  const CardInner = (
    <>
      <div
        className="relative aspect-5/3 bg-neutral-100 border border-neutral-200/80 overflow-hidden"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(0,0,0,.04) 10px, rgba(0,0,0,.04) 11px)',
        }}
      >
        <span className={`absolute left-3 top-3 h-2 w-2 rounded-full ${dotClass}`} aria-hidden />
        <span className="absolute inset-0 flex items-center justify-center font-display text-[clamp(2rem,5vw,2.75rem)] uppercase tracking-widest text-neutral-300/90 select-none pointer-events-none text-center px-4">
          {project.title}
        </span>
      </div>
      <div className="pt-4 space-y-2">
        <p className="inline-block rounded-full border border-neutral-200 bg-white px-2.5 py-0.5 text-[10px] tracking-[0.12em] uppercase text-neutral-500">
          {categoryUpper}
        </p>
        <h3 className="font-display text-lg text-neutral-950">{project.title}</h3>
        <p className="text-sm text-neutral-600 leading-snug line-clamp-3">{short}</p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.slice(0, 5).map((tech) => (
            <span key={tech} className="text-[11px] font-mono px-2 py-0.5 rounded border border-neutral-200 bg-white text-neutral-600">
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 ? (
            <span className="text-[11px] font-mono text-neutral-400">+{project.technologies.length - 5}</span>
          ) : null}
        </div>
      </div>
    </>
  );

  const className =
    'group block rounded-lg outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-[#3B5CCC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F9F7]';

  if (external) {
    return (
      <li>
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {CardInner}
        </a>
      </li>
    );
  }

  return (
    <li>
      <Link href={href} className={className}>
        {CardInner}
      </Link>
    </li>
  );
}
