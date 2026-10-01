import { ExternalLink, Gauge } from 'lucide-react'
import { apps, projectName } from '../config/apps'
import TabBar from './TabBar'

export default function Header({ active }: { active: string | null }) {
  const app = apps.find((a) => a.id === active)
  return (
    <header className="flex h-12 shrink-0 items-stretch border-b border-strong bg-bg">
      <a
        href="#/"
        aria-label={`${projectName} home`}
        aria-current={active === null ? 'page' : undefined}
        className="flex shrink-0 items-center gap-2 px-3 text-sm font-semibold hover:bg-surface sm:px-4"
      >
        <Gauge aria-hidden className="size-4" />
        <span className="hidden sm:inline">{projectName}</span>
      </a>
      <TabBar active={active} />
      <a
        href={app?.url ?? undefined}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={app ? `Open ${app.label} in new tab` : 'Open in new tab (select an app first)'}
        aria-disabled={!app}
        title={app ? `Open ${app.label} in new tab` : undefined}
        tabIndex={app ? 0 : -1}
        className={`flex w-12 shrink-0 items-center justify-center border-l border-line ${
          app ? 'hover:bg-surface' : 'pointer-events-none opacity-40'
        }`}
      >
        <ExternalLink aria-hidden className="size-4" />
      </a>
    </header>
  )
}
