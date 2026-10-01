import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { apps, projectName } from '../config/apps'
import { hrefFor } from '../hooks/useHashRoute'
import OwnerBadge from './OwnerBadge'

/** Decorative dial: one tick per app, in its accent colour. */
function Dial({ hovered }: { hovered: string | null }) {
  const cx = 120
  const cy = 120
  const n = apps.length
  return (
    <svg viewBox="0 0 240 130" aria-hidden className="w-full max-w-[280px]">
      <path d="M 20 120 A 100 100 0 0 1 220 120" fill="none" stroke="var(--line)" strokeWidth="1.5" />
      {Array.from({ length: 31 }, (_, i) => {
        const a = Math.PI - (i / 30) * Math.PI
        const major = i % 6 === 0
        const r1 = major ? 84 : 90
        return (
          <line
            key={i}
            x1={cx + Math.cos(a) * r1}
            y1={cy - Math.sin(a) * r1}
            x2={cx + Math.cos(a) * 100}
            y2={cy - Math.sin(a) * 100}
            stroke="var(--ink)"
            strokeWidth={major ? 2 : 1}
            opacity={major ? 1 : 0.35}
          />
        )
      })}
      {apps.map((app, i) => {
        const a = Math.PI - ((i + 0.5) / n) * Math.PI
        const on = hovered === app.id
        return (
          <circle
            key={app.id}
            cx={cx + Math.cos(a) * 66}
            cy={cy - Math.sin(a) * 66}
            r={on ? 7 : 4.5}
            fill={app.accent}
            className="motion-safe:transition-all"
          />
        )
      })}
      <text x={cx} y={cy - 6} textAnchor="middle" className="fill-current font-mono" fontSize="34" fontWeight="600">
        {String(n).padStart(2, '0')}
      </text>
    </svg>
  )
}

export default function HomeView() {
  const [hovered, setHovered] = useState<string | null>(null)
  return (
    <main className="h-full overflow-y-auto">
      <div className="mx-auto max-w-5xl px-4 pt-8 pb-16 sm:px-6 sm:pt-14">
        <div className="flex flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <h1 className="text-4xl leading-none font-semibold tracking-tight sm:text-6xl">{projectName}</h1>
            <p className="mt-4 text-base text-muted sm:text-lg">
              Six working demos across the vehicle lifecycle, in one place. Pick one to open it in this window.
            </p>
          </div>
          <Dial hovered={hovered} />
        </div>

        <h2 className="mt-12 border-b-2 border-strong pb-2 font-mono text-sm font-semibold">Applications</h2>
        <ol>
          {apps.map((app, i) => (
            <li key={app.id} className="border-b border-line">
              <a
                href={hrefFor(app.id)}
                onMouseEnter={() => setHovered(app.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(app.id)}
                onBlur={() => setHovered(null)}
                className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-1 py-5 pl-5 hover:bg-surface sm:grid-cols-[3.5rem_1fr_auto_auto] sm:gap-x-6 sm:pl-6"
              >
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-1 motion-safe:transition-[width] group-hover:w-2 group-focus-visible:w-2"
                  style={{ background: app.accent }}
                />
                <span aria-hidden className="font-mono text-2xl tabular-nums text-muted sm:text-3xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0">
                  <span className="block text-xl font-semibold">{app.label}</span>
                  <span className="mt-0.5 block text-sm text-muted">{app.description}</span>
                </span>
                <span className="col-start-2 row-start-2 mt-2 sm:col-start-3 sm:row-start-1 sm:mt-0">
                  <OwnerBadge owner={app.owner} />
                </span>
                <span className="col-start-3 row-start-1 inline-flex items-center gap-1 font-mono text-sm sm:col-start-4">
                  <span className="hidden sm:inline">Open</span>
                  <ArrowUpRight aria-hidden className="size-4 motion-safe:transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span className="sr-only sm:hidden">Open</span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </main>
  )
}
