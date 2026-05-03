'use client';

import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { education } from '@/lib/data';

const BLURB_PARAGRAPHS = [
  <>
    Software engineer who likes to <span className="font-medium text-neutral-900">automate</span> tasks and systems that
    reduce load for humans. I create work with the <span className="font-medium text-neutral-900">user experience</span> in
    mind.
  </>,
  <>
    Senior student at <span className="font-medium text-neutral-900">The University of British Columbia</span> graduating
    April 2026. I studied abroad for one year at{' '}
    <span className="font-medium text-neutral-900">Tsinghua University</span>, where I took computer science courses in{' '}
    <span className="font-medium text-neutral-900">AI</span>, <span className="font-medium text-neutral-900">ML</span>,
    and other interesting areas. An opportunity that gave me a unique global perspective of technology.
  </>,
  <>
    I&apos;m quite involved in my community as a lead in the{' '}
    <span className="font-medium text-neutral-900">Google Developer Student Club</span> and the{' '}
    <span className="font-medium text-neutral-900">Data Analytics Club</span>, where I contribute to tech initiatives. I
    also like to compete in <span className="font-medium text-neutral-900">hackathons</span> and build projects on the weekends.
  </>,
];

const TAGS = ['Skiing ⛷️', 'Snowboarding 🏂', 'Hiking 🥾', 'Orange Americanos 🍊☕', 'Hackathons ⚡️', 'Hojicha oat lattes 🍵', 'Human-centered layouts'];

function LikeCarousel() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setI((p) => (p + 1) % TAGS.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="text-base sm:text-lg font-medium text-neutral-800">
      <span>I like </span>
      <span className="text-[#3B5CCC]" aria-live="polite" aria-atomic="true">
        {TAGS[i]}
      </span>
    </div>
  );
}

function EducationList() {
  return (
    <div className="space-y-8">
      {education.map((edu) => {
        const logoPath =
          edu.id === 'ubc-bucs' ? '/images/ubc-logo.jpg' : '/images/tsinghua-logo.svg';
        return (
          <div key={edu.id} className="flex items-center gap-4">
            <Image
              src={logoPath}
              alt={edu.institution}
              width={64}
              height={64}
              unoptimized
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain shrink-0"
            />
            <div className="min-w-0">
              <p className="text-base font-semibold text-neutral-900">{edu.institution}</p>
              <p className="text-sm font-medium text-[#3B5CCC] mt-0.5">{edu.degree}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="bg-[#F9F9F7]">
      <div className="max-w-5xl mx-auto w-full px-5 sm:px-8 lg:px-10 pt-28 pb-16 sm:pb-20">
        <h1 className="font-display text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.12] text-neutral-950 tracking-tight max-w-4xl">
          Software engineer who <em className="font-display italic text-[#3B5CCC]">builds projects </em> that puts the human experience first.
        </h1>

        <div className="mt-14 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="space-y-4 text-sm sm:text-[0.9375rem] text-neutral-600 leading-relaxed">
            {BLURB_PARAGRAPHS.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div id="about" className="scroll-mt-28 space-y-10 sm:space-y-12">
            <EducationList />
            <LikeCarousel />
          </div>
        </div>

        <div className="mt-12 flex justify-center lg:justify-start">
          <button
            type="button"
            onClick={() => document.getElementById('toolbox')?.scrollIntoView({ behavior: 'smooth' })}
            className="rounded-md p-1 text-neutral-500 transition-colors hover:text-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B5CCC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F9F7]"
            aria-label="Scroll to toolbox"
          >
            <ArrowDown size={22} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
