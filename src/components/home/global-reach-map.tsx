import { getLocale } from "next-intl/server";

import { exportPoints } from "@/lib/data";

export async function GlobalReachMap() {
  const locale = await getLocale();
  const origin = exportPoints[0];

  return (
    <section className="section-padding bg-export-radar text-white">
      <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-harvest-500">{locale === "en" ? "Global reach" : "Global erişim"}</p>
          <h2 className="mt-5 font-display text-5xl font-semibold leading-tight text-balance">{locale === "en" ? "From Mersin to the port, from the port to the destination market." : "Mersin'den limana, limandan hedef pazara."}</h2>
          <p className="mt-5 text-lg leading-8 text-white/65">
            {locale === "en"
              ? "The routes are indicative planning lanes. Once export countries are confirmed, they will become a country and port based list."
              : "Rotalar planlama amaçlı gösterilir. İhracat ülkeleri onaylandığında ülke ve liman bazlı listeye çevrilecek."}
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
          <svg viewBox="0 0 100 64" role="img" aria-label={locale === "en" ? "Uslu Duyar export map" : "Uslu Duyar ihracat haritası"} className="h-auto w-full">
            <defs>
              <linearGradient id="route" x1="0" x2="1">
                <stop offset="0%" stopColor="#D4A017" />
                <stop offset="100%" stopColor="#2E9E3A" />
              </linearGradient>
            </defs>
            <path d="M7 24C18 14 33 12 45 20s19 5 30 10c10 4 17 12 18 22-15 4-31 2-45 1-18-2-31-1-43-9 0-7 0-13 2-20Z" fill="#BFE0C6" opacity="0.22" />
            <path d="M44 34c5-6 11-8 17-6 8 2 13 8 15 15-9 5-20 8-31 4-4-4-5-8-1-13Z" fill="#A9D6B2" opacity="0.24" />
            {exportPoints.slice(1).map((point, routeIndex) => (
              <path
                key={point.city}
                d={`M${origin.x} ${origin.y} Q ${(origin.x + point.x) / 2} ${Math.min(origin.y, point.y) - 12}, ${point.x} ${point.y}`}
                className="route-draw"
                fill="none"
                stroke="url(#route)"
                strokeWidth="0.35"
                opacity="0.75"
                pathLength={1}
                style={{ animationDelay: `${routeIndex * 140}ms` }}
              />
            ))}
            {exportPoints.map((point, index) => (
              <g key={point.city}>
                <circle cx={point.x} cy={point.y} r={index === 0 ? 1.8 : 1.1} fill={index === 0 ? "#D4A017" : "#1F7A2A"} />
                <text x={point.x + 1.8} y={point.y + 0.8} fill="#F9F5EC" fontSize="2.4">
                  {point.city}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
