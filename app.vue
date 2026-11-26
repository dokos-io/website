<script setup lang="ts">
import type { Link } from '@unhead/vue'
import { joinURL } from 'ufo'
import { canonicalPath } from '#shared/canonical-path.mjs'

const colorMode = useColorMode()
const route = useRoute()
const site = useSiteConfig()

// lang, og:locale and the hreflang alternates, kept in step with the route.
const i18nHead = useLocaleHead({ dir: false, lang: true, seo: true })

// The 2026 pages are cream and light only; the others follow the colour mode.
const themeColor = computed(() => route.meta.design2026
  ? '#f7f1e8'
  : colorMode.value === 'dark' ? '#111827' : 'white')

// One canonical URL per page: see shared/canonical-path.mjs.
function canonicalUrl(url: string) {
  const path = url.startsWith(site.url) ? url.slice(site.url.length) || '/' : url
  return joinURL(site.url, canonicalPath(path))
}
const canonical = computed(() => joinURL(site.url, canonicalPath(route.path)))

useHead({
  htmlAttrs: { lang: () => i18nHead.value.htmlAttrs?.lang },
  meta: computed(() => [
    { key: 'theme-color', name: 'theme-color', content: themeColor.value },
    ...(i18nHead.value.meta || []),
  ]),
  link: computed((): Link[] => [
    { rel: 'icon' as const, href: '/favicon.ico' },
    // The weights the first screen needs: body text and the extra-bold titles.
    ...['400', '800'].map(weight => ({
      rel: 'preload',
      as: 'font',
      type: 'font/woff2',
      crossorigin: 'anonymous',
      href: `/fonts/hanken-grotesk/hanken-grotesk-latin-${weight}-normal.woff2`,
    }) as const),
    // Alternates follow the same rule as the canonical (the homepage's French
    // alternate would otherwise be `/`, a redirect).
    ...(i18nHead.value.link || [])
      .filter(link => link.rel !== 'canonical')
      .map(link => ({ ...link, href: link.href && canonicalUrl(link.href) }) as Link),
    { key: 'canonical', rel: 'canonical' as const, href: canonical.value },
  ]),
  script: [{
    key: 'ld-organization',
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${site.url}/#organization`,
          name: 'Dokos',
          legalName: 'Dokos SAS',
          url: site.url,
          logo: joinURL(site.url, '/dokos_logo_rect.svg'),
          sameAs: ['https://gitlab.com/dokos'],
        },
        {
          '@type': 'WebSite',
          '@id': `${site.url}/#website`,
          name: 'Dokos',
          url: site.url,
          inLanguage: ['fr-FR', 'en-US'],
          publisher: { '@id': `${site.url}/#organization` },
        },
      ],
    }),
  }],
})

useSeoMeta({
  titleTemplate: '%s — Dokos',
  ogUrl: canonical,
  ogImage: joinURL(site.url, '/social-card.png'),
  twitterImage: joinURL(site.url, '/social-card.png'),
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
