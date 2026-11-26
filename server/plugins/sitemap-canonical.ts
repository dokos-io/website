// The prerender crawler finds most French pages under /fr/ (content links are
// written that way), but the canonical form is unprefixed
// (shared/canonical-path.mjs). Rewrite every URL the sitemap collects to its
// canonical form before the module resolves locales and removes duplicates.
import { canonicalPath } from '#shared/canonical-path.mjs'

type SitemapInput = string | { loc?: string }

export default defineNitroPlugin((nitroApp) => {
  // @ts-expect-error the hook is declared by @nuxtjs/sitemap's runtime types
  nitroApp.hooks.hook('sitemap:input', (ctx: { urls: SitemapInput[] }) => {
    ctx.urls = ctx.urls.map((url) => {
      if (typeof url === 'string') return url.startsWith('/') ? canonicalPath(url) : url
      if (url.loc?.startsWith('/')) return { ...url, loc: canonicalPath(url.loc) }
      return url
    })
  })
})
