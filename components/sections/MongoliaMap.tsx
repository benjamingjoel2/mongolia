"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { capital, outlinePath, proj } from "@/lib/map";
import { cn } from "@/lib/cn";

export interface MapMarker {
  id: string;
  label: string;
  x: number;
  y: number;
  href?: string;
  active?: boolean;
}

/**
 * Stylised map placeholder: the country outline, region markers and an optional route
 * that draws itself on scroll. Not to scale; swap for a real map provider later.
 */
export function MongoliaMap({
  markers = [],
  route,
  tone = "light",
  className,
  label = "Map of Mongolia",
}: {
  markers?: MapMarker[];
  route?: { label: string; x: number; y: number }[];
  tone?: "light" | "dark";
  className?: string;
  label?: string;
}) {
  const reduce = useReducedMotion();
  const routePts = route?.map(proj) ?? [];
  const routeD = routePts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join("");
  const ub = proj(capital);
  const ink = tone === "dark" ? "text-offwhite" : "text-charcoal";

  return (
    <figure className={cn("relative", className)}>
      <svg viewBox="-6 -8 221 116" role={markers.some((m) => m.href) ? "group" : "img"} aria-label={label} className={cn("h-auto w-full overflow-visible", ink)}>
        <defs>
          <pattern id="map-grain" width="3" height="3" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="0.35" className="fill-current opacity-25" />
          </pattern>
        </defs>
        <path d={outlinePath} className={cn(tone === "dark" ? "fill-offwhite/5" : "fill-steppe-tint")} />
        <path d={outlinePath} fill="url(#map-grain)" />
        <path d={outlinePath} fill="none" className="stroke-current" strokeWidth="0.6" strokeLinejoin="round" />

        {/* Capital */}
        <g>
          <rect x={ub.x - 1.4} y={ub.y - 1.4} width="2.8" height="2.8" className="fill-current" transform={`rotate(45 ${ub.x} ${ub.y})`} />
          <text x={ub.x + 2.8} y={ub.y - 2} className="fill-current text-[3.2px] font-medium">
            Ulaanbaatar
          </text>
        </g>

        {route && routePts.length > 1 && (
          <>
            <motion.path
              d={routeD}
              fill="none"
              className="stroke-felt"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: reduce ? 1 : 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 2.4, ease: [0.65, 0, 0.35, 1] }}
            />
            {routePts.map((p, i) => (
              <motion.g
                key={`${route[i].label}-${i}`}
                initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ delay: 0.3 + (i / routePts.length) * 2, duration: 0.4 }}
                style={{ transformOrigin: `${p.x}px ${p.y}px` }}
              >
                <circle cx={p.x} cy={p.y} r="2.6" className="fill-felt" />
                <text x={p.x} y={p.y + 1.1} textAnchor="middle" className="fill-offwhite text-[2.8px] font-medium">
                  {i + 1}
                </text>
              </motion.g>
            ))}
          </>
        )}

        {markers.map((m) => {
          const p = proj(m);
          const dot = (
            <g className="group">
              <circle cx={p.x} cy={p.y} r={m.active ? 5 : 3.6} className={cn("transition-all duration-500", m.active ? "fill-felt" : "fill-felt/85 group-hover:fill-felt")} />
              <circle cx={p.x} cy={p.y} r={m.active ? 8.5 : 6.2} className="fill-none stroke-felt/40" strokeWidth="0.5" />
              <text x={p.x} y={p.y - 7.6} textAnchor="middle" className="fill-current text-[3.6px] font-medium tracking-[-0.02em]">
                {m.label}
              </text>
            </g>
          );
          return m.href ? (
            <Link key={m.id} href={m.href} aria-label={m.label}>
              {dot}
            </Link>
          ) : (
            <g key={m.id}>{dot}</g>
          );
        })}
      </svg>
      <figcaption className={cn("mt-3 text-[12px] tracking-[-0.01em] md:text-[13px]", tone === "dark" ? "text-offwhite/60" : "text-charcoal/70")}>
        Stylised map, not to scale. Map placeholder.
      </figcaption>
      {route && route.length > 0 && (
        <ol className={cn("mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2 md:grid-cols-3", tone === "dark" ? "text-offwhite/85" : "text-charcoal/85")}>
          {route.map((r, i) => (
            <li key={`${r.label}-${i}`} className="flex items-baseline gap-3 text-[15px] md:text-[16px]">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-felt text-[12px] font-medium text-offwhite">{i + 1}</span>
              {r.label}
            </li>
          ))}
        </ol>
      )}
    </figure>
  );
}
