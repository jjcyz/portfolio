import { toolboxByTier } from '@/lib/data';

export default function Skills() {
  return (
    <section id="toolbox" className="py-16 sm:py-20 lg:py-24 bg-[#F9F9F7]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 lg:mb-12">
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] text-neutral-950 tracking-tight">Toolbox</h2>
          <p className="font-mono text-[11px] sm:text-xs text-neutral-400 max-w-[20rem] sm:text-right">
            Grouped by recency &amp; depth, not category
          </p>
        </div>

        <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200">
          {toolboxByTier.map((tier) => (
            <div
              key={tier.label}
              className="grid grid-cols-1 md:grid-cols-[minmax(0,7rem)_1fr] gap-4 md:gap-10 py-6 md:py-7 md:items-center"
            >
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] text-neutral-400 uppercase whitespace-nowrap">
                {tier.label}
              </span>
              <div className="flex flex-wrap gap-2">
                {tier.items.map((item) => (
                  <span
                    key={`${tier.label}-${item}`}
                    className="font-mono text-[11px] sm:text-xs px-2.5 py-1 rounded-md border border-neutral-200 bg-white text-neutral-800"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
