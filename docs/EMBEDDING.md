# Embedding the apps in the hub

The hub shows each app in an `<iframe>`. A browser only renders a page in a frame if that page's own
response headers allow the parent site to frame it. The hub can't override this. Each child app has to opt in.

## Why each child app must allow framing

- Browsers enforce framing rules using two response headers on the **child** app:
  - `Content-Security-Policy: frame-ancestors ...` (the modern one)
  - `X-Frame-Options: DENY` or `SAMEORIGIN` (the legacy one)
- `X-Frame-Options: DENY` blocks all framing. `SAMEORIGIN` blocks the hub too, because the hub is on a different
  `*.vercel.app` domain. Either one makes the tab show a blank or "refused to connect" panel.
- If both headers are present, `frame-ancestors` wins in modern browsers, but remove `X-Frame-Options`
  anyway so behaviour is predictable.
- Vercel doesn't add either header by default. If a child app is blocked, one of its own `vercel.json`,
  framework config or middleware sets it.

## Snippet for each child app

Add this to the child app's `vercel.json` (merge into the existing file if there is one). Replace
`<HUB-DOMAIN>` with the hub's domain, for example `automotive-use-cases.vercel.app`, with no trailing slash and no path.

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "frame-ancestors 'self' https://<HUB-DOMAIN>"
        }
      ]
    }
  ]
}
```

Notes:

- Redeploy the child app after changing this, then hard-refresh the hub.
- If the child already sets a `Content-Security-Policy`, add `frame-ancestors 'self' https://<HUB-DOMAIN>` to the
  existing value rather than setting a second header.
- Preview deployments have different domains. To test the hub on a preview URL, add that origin to the list too
  (space-separated), or use the production hub domain.
- Remove any `X-Frame-Options` header (in `vercel.json`, `next.config.js` `headers()`, middleware, etc.).

## How the hub behaves when framing is blocked

- A page that never responds triggers the hub's 8-second fallback panel with an "Open in new tab" button.
- **Known limitation:** when a page replies quickly with `X-Frame-Options: DENY` or a restrictive CSP, Chrome shows its
  own "refused to connect" error page inside the frame and still fires `onLoad`. Browsers don't let the parent detect
  this, so the hub's fallback panel does **not** appear in that case. The "Open in new tab" icon in the header is
  always available as the escape hatch. Fixing the headers is the real solution.

## Login inside iframes (e.g. Supabase auth)

Browsers increasingly block third-party cookies and storage in iframes. A child app on
`telematics.vercel.app` embedded in `automotive-use-cases.vercel.app` is a third party, so its auth cookies or
`localStorage` session may be blocked or partitioned. Symptoms are a login that loops, a session that disappears on
refresh, or "storage access" errors in the console.

Options, in order of simplicity:

1. **Open in new tab.** The header button opens the app as a first party where login works normally. This
   is the dependable fallback.
2. **Share a parent domain.** Put the hub and all apps on subdomains of one custom domain
   (`hub.example.com`, `telematics.example.com`) and set auth cookies for `.example.com`. Browsers treat these as the same
   site, so cookies are not third-party. This is the best long-term fix.
3. **Public demo mode.** Let apps skip login for demos, so nothing needs cookies when embedded.

Supabase keeps its session in `localStorage` by default, and partitioned or blocked storage in a cross-site iframe
breaks it. A shared parent domain is the realistic fix.

---

## Section to forward to the partner (3 apps)

> Hi, we're putting our apps into a single hub dashboard (`https://<HUB-DOMAIN>`) where each app appears as a tab
> in an iframe. For your three apps to show up there, each one needs to allow the hub to frame it.
>
> **What to do (per app, about 2 minutes):**
>
> 1. In the app's `vercel.json`, add:
>
>    ```json
>    {
>      "headers": [
>        {
>          "source": "/(.*)",
>          "headers": [
>            {
>              "key": "Content-Security-Policy",
>              "value": "frame-ancestors 'self' https://<HUB-DOMAIN>"
>            }
>          ]
>        }
>      ]
>    }
>    ```
>
> 2. Make sure the app does **not** send `X-Frame-Options: DENY` or `SAMEORIGIN`. Those block our hub.
>    Check `vercel.json`, framework config and middleware.
> 3. If the app already sets a `Content-Security-Policy`, add the `frame-ancestors` part to it rather than adding a second one.
> 4. Redeploy and tell us the final `https://....vercel.app` URL for each app.
>
> **Heads-up on login:** if an app uses Supabase (or any cookie/localStorage login), browsers may block that
> inside an iframe. For a demo, either let it run without login, or we'll use the "Open in new tab" button for that app.
