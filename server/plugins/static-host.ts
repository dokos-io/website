// What Vercel did for the Node server: Cache-Control headers, safe redirects, and one URL per
// page. All run before Nitro looks up the static files. Adapted from the documentation
// repository (gitlab.com/dokos/documentation, server/plugins/static-host.ts).
//
// Redirects: every redirect route rule is answered here, before Nitro's route-rules handler,
// with shared/redirect-location.mjs. It computes the same Location as Nitro, but never one
// that starts with `//` or `/\` (an open redirect through the `/features/**` prefix rules).
//
// Cache-Control: pages get `public, max-age=0, must-revalidate`, as on Vercel, so the browser
// and the Edge Services cache check the page again on every visit and a deploy shows at once.
// Images and media get one day, as `vercel.json` did. Nitro's static handler, which runs next,
// replaces the header on the hashed `/_nuxt/**` files with its own `immutable` one.
//
// Trailing slash: Nitro serves `<route>/index.html` for both `/path` and `/path/`. Two URLs for
// one page split the cache and the search index, so `/path/` redirects to `/path`.
//
// A server middleware would run too late: Nitro registers its static handler first. So this
// plugin puts its handler at the front of the stack.
import { withQuery, getQuery } from 'ufo'
import { redirectLocation, safeLocation } from '../../shared/redirect-location.mjs'

const PAGE_CACHE_CONTROL = 'public, max-age=0, must-revalidate'
const MEDIA_CACHE_CONTROL = 'public, max-age=86400, immutable'
const MEDIA = /\.(?:ico|png|svg|jpg|jpeg|avif|gif|webp|mp3|mp4)$/i

export default defineNitroPlugin((nitroApp) => {
  if (import.meta.dev || import.meta.prerender) return

  const handler = eventHandler((event) => {
    const { redirect } = getRouteRules(event)
    if (redirect) return sendRedirect(event, redirectLocation(redirect, event.path), redirect.statusCode)

    if (event.method !== 'GET' && event.method !== 'HEAD') return

    const [pathname] = event.path.split('?')
    setResponseHeader(event, 'Cache-Control', MEDIA.test(pathname) ? MEDIA_CACHE_CONTROL : PAGE_CACHE_CONTROL)

    // One URL per page: backslashes (raw or `%5C`) and repeated slashes become single slashes.
    if (/\\|%5c|\/\//i.test(pathname)) {
      const clean = `/${pathname.replace(/%5c/gi, '/').replace(/\\/g, '/').split('/').filter(Boolean).join('/')}`
      return sendRedirect(event, withQuery(clean, getQuery(event.path)), 301)
    }

    if (pathname === '/' || !pathname.endsWith('/')) return

    // Collapse leading slashes and backslashes too: `//evil.example/` must stay on this host.
    const target = safeLocation(pathname.replace(/[/\\]+$/, '') || '/')
    return sendRedirect(event, withQuery(target, getQuery(event.path)), 301)
  })

  nitroApp.h3App.stack.unshift({ route: '', handler })
})
