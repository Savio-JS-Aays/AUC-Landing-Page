import { useEffect, useState } from 'react'
import { apps } from '../config/apps'

/** Returns the active app id from `#/<id>`, or null for home. Unknown hashes redirect to `#/`. */
function parse(): string | null {
  const id = window.location.hash.replace(/^#\/?/, '').split(/[/?]/)[0]
  return apps.some((a) => a.id === id) ? id : null
}

export function useHashRoute(): string | null {
  const [route, setRoute] = useState<string | null>(parse)

  useEffect(() => {
    const sync = () => {
      const next = parse()
      const raw = window.location.hash.replace(/^#\/?/, '')
      // Unknown, non-empty hash: normalise to home without adding a history entry.
      if (next === null && raw !== '') window.history.replaceState(null, '', '#/')
      setRoute(next)
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  return route
}

export const hrefFor = (id: string | null) => (id ? `#/${id}` : '#/')
