import { ExternalLink, ShieldAlert } from 'lucide-react'
import type { AppConfig } from '../config/apps'

export default function FallbackPanel({ app }: { app: AppConfig }) {
  return (
    <div role="alert" className="absolute inset-0 z-10 flex items-center justify-center overflow-auto bg-bg p-6">
      <div className="max-w-md rounded-xl border border-line bg-surface p-6 shadow-[var(--shadow)]">
        <ShieldAlert aria-hidden className="mb-3 size-6" />
        <h2 className="text-lg font-semibold">{app.label} hasn't loaded</h2>
        <p className="mt-2 text-sm text-muted">
          The app may block being embedded, or the address may not be live yet. You can still use it in its own tab.
        </p>
        <p className="mt-2 font-mono text-xs break-all text-muted">{app.url}</p>
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#1d4ed8] px-3.5 py-2 text-sm font-semibold text-white hover:bg-[#1e40af]"
        >
          <ExternalLink aria-hidden className="size-4" />
          Open in new tab
        </a>
      </div>
    </div>
  )
}
