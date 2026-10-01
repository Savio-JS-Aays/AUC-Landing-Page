import { useEffect, useState } from 'react'
import { apps } from './config/apps'
import { useHashRoute } from './hooks/useHashRoute'
import Header from './components/Header'
import HomeView from './components/HomeView'
import AppPanel from './components/AppPanel'

export default function App() {
  const active = useHashRoute()
  const [visited, setVisited] = useState<string[]>(() => (active ? [active] : []))

  useEffect(() => {
    if (active) setVisited((v) => (v.includes(active) ? v : [...v, active]))
  }, [active])

  const app = apps.find((a) => a.id === active)
  useEffect(() => {
    document.title = app ? `${app.label} · Automotive Use Cases` : 'Automotive Use Cases'
  }, [app])

  return (
    <div className="flex h-dvh flex-col">
      <Header active={active} />
      <div className="relative min-h-0 flex-1">
        {active === null && <HomeView />}
        {apps
          .filter((a) => visited.includes(a.id))
          .map((a) => (
            <AppPanel key={a.id} app={a} visible={a.id === active} />
          ))}
      </div>
    </div>
  )
}
