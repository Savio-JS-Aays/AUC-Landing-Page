# Conventions

- **Config-driven.** [src/config/apps.ts](src/config/apps.ts) is the single source of truth. Tabs, home cards and
  routes are generated from it. Never hard-code an app name, URL or accent elsewhere. Never invent URLs: use
  `https://REPLACE-<slug>.vercel.app` until a real one is given.
- **Stack.** React + Vite + TypeScript. Raw Tailwind only: no shadcn, MUI or other UI libraries. Icons from lucide-react.
  No backend, auth or data fetching. No state library: routing is the URL hash (`useHashRoute`).
- **Routing.** Hash-based (`#/<id>`). Unknown hash goes home. Don't add Vercel rewrites.
- **Iframes.** Mounted lazily on first visit, then kept mounted (hidden). Keep the title, fullscreen, sandbox, loading state
  and the 8s fallback panel. The header must always offer "Open in new tab" for the active app.
- **Look.** Match the child apps: navy chrome (header max 48px), cool light canvas, white rounded cards with a coloured top edge, blue links. Accent colours are small markers only (tab dot, card top edge, icon tile). Colours live as CSS variables in `src/index.css`.
- **Accessibility.** tablist/tab/tabpanel roles with arrow/Home/End navigation, visible `:focus-visible` rings,
  `prefers-reduced-motion` respected (use `motion-safe:` for transitions), AA contrast in light and dark. Keep
  colours as CSS variables in [src/index.css](src/index.css).
- **Done means** `npm run build` passes with no warnings.
