// @ts-check
// The canonical path of a page. Under the `prefix_and_default` i18n strategy a
// French page answers both with and without the prefix (`/tarifs` and
// `/fr/tarifs`). The canonical is the unprefixed form, the one localePath()
// links to and @nuxtjs/sitemap lists; except the homepage, where `/` redirects
// to `/fr`. English paths keep their `/en` prefix.
//
// Used by app.vue (canonical and hreflang links), by links built from content
// paths, and by server/plugins/sitemap-canonical.ts.

/** @param {string} [path] */
export function canonicalPath(path = '/') {
  const [pathname, rest = ''] = path.split(/(?=[?#])/)
  const clean = (pathname ?? '').replace(/\/+$/, '') || '/'
  if (clean === '/' || clean === '/fr') return `/fr${rest}`
  return (clean.startsWith('/fr/') ? clean.slice(3) : clean) + rest
}
