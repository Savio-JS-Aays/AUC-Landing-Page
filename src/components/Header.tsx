import { ExternalLink, Gauge } from 'lucide-react'
import { apps, projectName } from '../config/apps'
import TabBar from './TabBar'

export default function Header({ active }: { active: string | null }) {
  const app = apps.find((a) => a.id === active)
  return (
    <header className="flex h-[52px] shrink-0 items-center gap-1 bg-nav px-2 text-nav-ink sm:gap-2 sm:px-3">
      <a
        href="#/"
        aria-label={`${projectName} home`}
        aria-current={active === null ? 'page' : undefined}
        className="flex h-9 shrink-0 items-center gap-2 rounded-lg px-2 text-sm font-semibold hover:bg-nav-hover sm:pr-3"
      >
        <Gauge aria-hidden className="size-5 text-[#8fb3ff]" />
        <span className="hidden sm:inline">{projectName}</span>
      </a>
      <span aria-hidden className="h-5 w-px shrink-0 bg-white/15" />
      <TabBar active={active} />
      <a
        href={app?.url ?? undefined}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={app ? `Open ${app.label} in new tab` : 'Open in new tab (select an app first)'}
        aria-disabled={!app}
        title={app ? `Open ${app.label} in new tab` : undefined}
        tabIndex={app ? 0 : -1}
        className={`flex size-9 shrink-0 items-center justify-center rounded-lg text-nav-muted ${
          app ? 'hover:bg-nav-hover hover:text-nav-ink' : 'pointer-events-none opacity-40'
        }`}
      >
        <ExternalLink aria-hidden className="size-[18px]" />
      </a>
    </header>
  )
}
