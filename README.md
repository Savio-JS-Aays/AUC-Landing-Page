# Automotive Use Cases

A React hub dashboard that hosts six separately deployed Vercel apps as tabs. It is a shell: no backend, no auth, no data fetching.
Stack: Vite, React, TypeScript, Tailwind CSS (raw, no UI library), lucide-react.

## Edit the apps

Everything (tabs, home cards, routes) comes from [src/config/apps.ts](src/config/apps.ts). To change a URL, owner or
accent, edit the entry there. To add or remove a tab, add or remove an entry. Order in the array is the tab order.

Each app has: `id` (URL slug, `#/<id>`), `label`, `shortLabel`, `description`, `url`, `owner` (`"mine"` or `"partner"`)
and `accent` (hex) and `icon` (a lucide-react icon for the home card).

URLs currently containing `REPLACE-` are placeholders.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-checks and builds to dist/
npm run preview  # serves the production build
```

## Deploy to Vercel

1. Push this folder to a Git repo and import it in Vercel as a new project. The Vite preset is auto-detected
   (build command `npm run build`, output `dist`).
2. No `vercel.json` is needed: routing is hash-based (`#/telematics`), so no rewrites are required.
3. Note the production domain, then follow [docs/EMBEDDING.md](docs/EMBEDDING.md) so each child app allows
   framing by it.

If the apps don't show in their tabs, see the embedding doc. It is almost always a framing header on the child app.

If a deploy fails on Vercel, run `npm run build` locally first. It runs `tsc -b`, so type errors fail the build there too.
