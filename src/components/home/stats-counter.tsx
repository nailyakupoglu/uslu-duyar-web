import { CounterUp } from "@/components/motion/counter-up";
import { stats } from "@/lib/data";

export function StatsCounter() {
  return (
    <section className="bg-cream py-14">
      <div className="container grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-primary-900/10 bg-white/80 p-6 text-center shadow-sm">
            <p className="font-display text-4xl font-semibold text-primary-700 md:text-5xl">
              <CounterUp value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-ink/58">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
