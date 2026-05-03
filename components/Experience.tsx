import { experiences } from '@/lib/data';
import type { Experience as ExperienceType } from '@/types';

const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatCvDate(iso: string): string {
  const [y, m] = iso.split('-');
  return `${MONTH_SHORT[parseInt(m, 10) - 1]} ${y.slice(2)}`;
}

function formatDateRange(exp: ExperienceType): string {
  const start = formatCvDate(exp.startDate);
  if (exp.endDate === 'present') return `${start} — Now`;
  return `${start} — ${formatCvDate(exp.endDate)}`;
}

function summaryLine(exp: ExperienceType): string {
  const joined = exp.description.join(' ');
  return joined.length > 220 ? `${joined.slice(0, 217)}…` : joined;
}

function shortLocation(loc: string): string {
  return loc.split(',')[0]?.trim() ?? loc;
}

const sortedExperience = [...experiences].sort((a, b) => b.startDate.localeCompare(a.startDate));

export default function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-20 lg:py-24 bg-[#F9F9F7]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex flex-row items-start justify-between gap-6 mb-2">
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] text-neutral-950 tracking-tight">Experience</h2>
          <div className="text-right pt-1 shrink-0">
            <span className="inline-block h-2 w-2 rounded-full bg-red-500 mb-1.5" aria-hidden />
            <p className="font-mono text-[11px] sm:text-xs text-neutral-400">2024 → present</p>
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:block mt-10 border-t border-neutral-950">
          <div className="grid grid-cols-[minmax(5rem,7rem)_minmax(10rem,12rem)_1fr_minmax(5rem,6rem)] gap-x-6 gap-y-0 text-[13px] leading-snug">
            {sortedExperience.map((exp, i) => (
              <div key={exp.id} className="contents font-sans">
                <div
                  className={`font-mono text-[11px] text-neutral-400 pt-5 pb-5 ${i === 0 ? '' : 'border-t border-neutral-200'}`}
                >
                  {formatDateRange(exp)}
                </div>
                <div className={`pt-5 pb-5 ${i === 0 ? '' : 'border-t border-neutral-200'}`}>
                  <div className="font-semibold text-neutral-950">{exp.title}</div>
                  <div className="text-neutral-600 mt-0.5">{exp.company}</div>
                </div>
                <div className={`pt-5 pb-5 text-neutral-600 ${i === 0 ? '' : 'border-t border-neutral-200'}`}>
                  {summaryLine(exp)}
                </div>
                <div
                  className={`pt-5 pb-5 text-right text-neutral-600 ${i === 0 ? '' : 'border-t border-neutral-200'}`}
                >
                  {shortLocation(exp.location)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile stacked */}
        <ul className="md:hidden mt-8 space-y-0 border-t border-neutral-950 list-none">
          {sortedExperience.map((exp, i) => (
            <li key={exp.id} className={`py-6 ${i === 0 ? '' : 'border-t border-neutral-200'}`}>
              <div className="font-mono text-[11px] text-neutral-400 mb-3">{formatDateRange(exp)}</div>
              <div className="font-semibold text-neutral-950">{exp.title}</div>
              <div className="text-neutral-600 text-sm mt-0.5">{exp.company}</div>
              <p className="text-sm text-neutral-600 mt-3 leading-relaxed">{summaryLine(exp)}</p>
              <p className="text-xs text-neutral-500 mt-2">{shortLocation(exp.location)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
