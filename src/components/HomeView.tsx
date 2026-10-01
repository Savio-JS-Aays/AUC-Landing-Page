import type { MouseEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { apps, projectName } from '../config/apps'
import { hrefFor } from '../hooks/useHashRoute'
import OwnerBadge from './OwnerBadge'

// Tracks the pointer so each card can light up around the cursor.
const track = (e: MouseEvent<HTMLAnchorElement>) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export default function HomeView() {
  return (
    <main className="h-full overflow-y-auto">
      <section className="relative overflow-hidden bg-nav text-nav-ink">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {apps.map((app, i) => (
            <span
              key={app.id}
              className="drift absolute size-56 rounded-full opacity-25 blur-3xl"
              style={{
                background: app.accent,
                left: `${8 + i * 17}%`,
                top: i % 2 ? '-30%' : '25%',
                animationDelay: `${-i * 2.3}s`,
              }}
            />
          ))}
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <h1 className="rise text-3xl font-bold tracking-tight sm:text-5xl">{projectName}</h1>
          <p className="rise mt-3 max-w-2xl text-base text-nav-muted sm:text-lg" style={{ animationDelay: '80ms' }}>
            Six demo dashboards across the vehicle lifecycle, in one place. Choose an application to open it in this
            window.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <h2 className="sr-only">Applications</h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app, i) => {
            const Icon = app.icon
            return (
              <li key={app.id} className="rise flex" style={{ animationDelay: `${160 + i * 70}ms` }}>
                <a
                  href={hrefFor(app.id)}
                  onMouseMove={track}
                  className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow)] motion-safe:transition-[box-shadow,transform,border-color] motion-safe:duration-300 hover:border-(--accent) hover:shadow-[var(--shadow-hover)] motion-safe:hover:-translate-y-1"
                  style={{ '--accent': app.accent } as React.CSSProperties}
                >
                  {/* accent edge that sweeps across on hover */}
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 h-1 w-14 bg-(--accent) motion-safe:transition-[width] motion-safe:duration-500 group-hover:w-full group-focus-visible:w-full"
                  />
                  {/* cursor spotlight */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 motion-safe:transition-opacity motion-safe:duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(260px circle at var(--mx, 50%) var(--my, 0%), color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%)',
                    }}
                  />
                  <span
                    aria-hidden
                    className="absolute right-5 bottom-3 font-mono text-5xl font-semibold text-ink/[0.05] tabular-nums"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="relative flex items-start justify-between gap-3">
                    <span
                      aria-hidden
                      className="flex size-12 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[color-mix(in_srgb,var(--accent)_70%,var(--ink))] motion-safe:transition-all motion-safe:duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-(--accent) group-hover:text-white"
                    >
                      <Icon className="size-6" strokeWidth={1.75} />
                    </span>
                    <OwnerBadge owner={app.owner} />
                  </div>
                  <h3 className="relative mt-4 text-lg font-semibold">{app.label}</h3>
                  <p className="relative mt-1 flex-1 text-sm text-muted">{app.description}</p>
                  <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-link">
                    Open
                    <ArrowRight
                      aria-hidden
                      className="size-4 motion-safe:transition-transform motion-safe:duration-300 group-hover:translate-x-1.5"
                    />
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </main>
  )
}
