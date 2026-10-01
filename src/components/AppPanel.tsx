import { useEffect, useState } from 'react'
import type { AppConfig } from '../config/apps'
import FallbackPanel from './FallbackPanel'

const TIMEOUT_MS = 8000

type Status = 'loading' | 'loaded' | 'slow'

/** Mounted on first visit and then kept mounted (hidden) so the embedded app keeps its state. */
export default function AppPanel({ app, visible }: { app: AppConfig; visible: boolean }) {
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    if (status !== 'loading') return
    const t = window.setTimeout(() => setStatus((s) => (s === 'loading' ? 'slow' : s)), TIMEOUT_MS)
    return () => window.clearTimeout(t)
  }, [status])

  return (
    <div
      role="tabpanel"
      id={`panel-${app.id}`}
      aria-labelledby={`tab-${app.id}`}
      hidden={!visible}
      className="absolute inset-0"
    >
      <iframe
        src={app.url}
        title={`${app.label} app`}
        allow="fullscreen"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
        onLoad={() => setStatus('loaded')}
        className="size-full border-0 bg-surface"
      />
      {status === 'loading' && (
        <div
          role="status"
          className="absolute inset-0 flex items-center justify-center bg-bg text-sm text-muted"
        >
          <span aria-hidden className="mr-3 size-2 animate-pulse" style={{ background: app.accent }} />
          Loading {app.label}…
        </div>
      )}
      {status === 'slow' && <FallbackPanel app={app} />}
    </div>
  )
}
