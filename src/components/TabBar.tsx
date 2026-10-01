import { useEffect, useRef, type KeyboardEvent } from 'react'
import { apps } from '../config/apps'
import { hrefFor } from '../hooks/useHashRoute'

export default function TabBar({ active }: { active: string | null }) {
  const listRef = useRef<HTMLDivElement>(null)

  // Keep the active tab in view on narrow screens.
  useEffect(() => {
    if (!active) return
    const el = document.getElementById(`tab-${active}`)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el?.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: reduce ? 'auto' : 'smooth' })
  }, [active])

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const tabs = Array.from(listRef.current?.querySelectorAll<HTMLAnchorElement>('[role="tab"]') ?? [])
    const i = tabs.indexOf(document.activeElement as HTMLAnchorElement)
    if (i < 0) return
    let next = -1
    if (e.key === 'ArrowRight') next = (i + 1) % tabs.length
    else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = tabs.length - 1
    if (next < 0) return
    e.preventDefault()
    tabs[next].focus()
    window.location.hash = tabs[next].getAttribute('href')!.slice(1) // automatic activation
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label="Automotive apps"
      onKeyDown={onKeyDown}
      className="no-scrollbar flex min-w-0 flex-1 items-center gap-1 overflow-x-auto px-1"
    >
      {apps.map((app, i) => {
        const selected = app.id === active
        // Roving tabindex: on home, the first tab is the entry point.
        const tabbable = selected || (active === null && i === 0)
        return (
          <a
            key={app.id}
            id={`tab-${app.id}`}
            role="tab"
            href={hrefFor(app.id)}
            aria-selected={selected}
            aria-controls={`panel-${app.id}`}
            aria-label={app.label}
            tabIndex={tabbable ? 0 : -1}
            className={`relative flex h-9 shrink-0 items-center gap-2 rounded-lg px-3 text-sm font-medium whitespace-nowrap motion-safe:transition-colors ${
              selected ? 'bg-white/12 text-nav-ink' : 'text-nav-muted hover:bg-nav-hover hover:text-nav-ink'
            }`}
>
            <span aria-hidden className="size-2 shrink-0 rounded-full" style={{ background: app.accent }} />
            {app.shortLabel}
          </a>
        )
      })}
    </div>
  )
}
