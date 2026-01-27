'use client';

import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons-react';

interface ProjectNavigationProps {
  canGoPrevious: boolean;
  canGoNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export default function ProjectNavigation({
  canGoPrevious,
  canGoNext,
  onPrevious,
  onNext,
}: ProjectNavigationProps) {
  return (
    <div className="flex justify-center lg:justify-start gap-3 mt-4 relative z-30 pointer-events-auto">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onPrevious();
        }}
        disabled={!canGoPrevious}
        className="relative z-40 flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors md:h-10 md:w-10"
        aria-label="Previous project"
      >
        <IconArrowNarrowLeft className="h-7 w-7 text-gray-500 md:h-6 md:w-6" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onNext();
        }}
        disabled={!canGoNext}
        className="relative z-40 flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors md:h-10 md:w-10"
        aria-label="Next project"
      >
        <IconArrowNarrowRight className="h-7 w-7 text-gray-500 md:h-6 md:w-6" />
      </button>
    </div>
  );
}
