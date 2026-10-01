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
      className="no-scrollbar flex h-full min-w-0 flex-1 overflow-x-auto"
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
            className={`relative flex h-full shrink-0 items-center gap-2 border-l border-line px-3.5 font-mono text-[13px] whitespace-nowrap hover:bg-surface sm:px-4 ${
              selected ? 'bg-surface text-ink' : 'text-muted'
            }`}
          >
            <span aria-hidden className="size-2 shrink-0" style={{ background: app.accent }} />
            {app.shortLabel}
            {selected && (
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5" style={{ background: app.accent }} />
            )}
          </a>
        )
      })}
    </div>
  )
}
