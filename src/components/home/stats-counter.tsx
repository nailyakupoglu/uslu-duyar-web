import { getLocale } from "next-intl/server";

import { CounterUp } from "@/components/motion/counter-up";
import { getStatsL } from "@/lib/content";

export async function StatsCounter() {
  const locale = await getLocale();
  const stats = getStatsL(locale);
  return (
    <section className="route-rule field-grid relative overflow-hidden bg-cream py-20 text-ink md:py-24">
      <div className="container relative grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="relative border-b border-primary-900/12 px-4 py-8 text-center last:border-0 sm:[&:nth-child(3)]:border-b-0 sm:[&:nth-child(4)]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
          >
            <span className="absolute left-4 top-3 font-mono text-[0.6rem] tracking-[0.2em] text-accent-500/72">0{index + 1}</span>
            <p className="display-tight font-display text-5xl font-medium text-primary-900 md:text-7xl">
              <CounterUp value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink/60">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
