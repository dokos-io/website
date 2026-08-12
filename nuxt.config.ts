// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/ui-pro',
    '@vueuse/nuxt',
    'nuxt-og-image',
    '@nuxtjs/i18n',
    '@nuxtjs/turnstile',
  ],
  compatibilityDate: '2025-06-13',
  css: ['~/assets/css/main.css'],
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://dokos.io',
  },
  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    'components:extend': (components) => {
      const globals = components.filter((c) => ['UButton'].includes(c.pascalName))

      globals.forEach((c) => c.global = true)
    }
  },
  routeRules: {
    '/api/search.json': { prerender: true },
    '/': { redirect: '/fr', prerender: true },

    // Paths retired by the 2026 positioning revamp. Declared here rather than
    // in `public/_redirects` because that file is a Netlify/Cloudflare
    // convention and is ignored by Vercel, where this site is deployed.
    // Both the prefixed and unprefixed forms exist under `prefix_and_default`.
    '/services': { redirect: { to: '/fr/ingenierie', statusCode: 301 } },
    '/fr/services': { redirect: { to: '/fr/ingenierie', statusCode: 301 } },
    '/pricing': { redirect: { to: '/fr/tarifs', statusCode: 301 } },
    '/fr/pricing': { redirect: { to: '/fr/tarifs', statusCode: 301 } },
    '/tiers-lieux': { redirect: { to: '/fr/solutions/tiers-lieux', statusCode: 301 } },
    '/fr/tiers-lieux': { redirect: { to: '/fr/solutions/tiers-lieux', statusCode: 301 } },
    '/service-companies': { redirect: { to: '/fr/solutions/entreprises-de-services', statusCode: 301 } },
    '/fr/service-companies': { redirect: { to: '/fr/solutions/entreprises-de-services', statusCode: 301 } },
    '/production-companies': { redirect: { to: '/fr/solutions/industrie', statusCode: 301 } },
    '/fr/production-companies': { redirect: { to: '/fr/solutions/industrie', statusCode: 301 } },

    '/**': { prerender: true },
    '/fr': { prerender: true },
    '/fr/**': { prerender: true },
  },
  devtools: {
    enabled: true,
    componentInspector: false,
  },
  i18n: {
    vueI18n: 'i18n.config.ts',
    locales: [
      {
        name: 'Français',
        code: 'fr',
        language: 'fr-FR',
        file: 'fr-FR.js'
      },
      // {
      //   name: 'English',
      //   code: 'en',
      //   language: 'en-US',
      //   file: 'en-US.js'
      // }
    ],
    langDir: 'lang',
    strategy: 'prefix_and_default',
    detectBrowserLanguage: false,
    defaultLocale: 'fr'
  },
  runtimeConfig: {
    public: {
      turnstile: {
        siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY,
      },
    },
    turnstile: {
      secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY,
    },
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
      // Under `prefix_and_default`, `localePath()` emits unprefixed URLs for
      // the default locale, so crawling alone only discovers `/solutions/x`.
      // The redirects above target the canonical `/fr/` form, which would then
      // 301 into a 404 on a static host. Listed explicitly rather than left to
      // link discovery.
      routes: [
        '/fr/solutions/tiers-lieux',
        '/fr/solutions/entreprises-de-services',
        '/fr/solutions/industrie',
        '/fr/exploitation',
        '/fr/exploitation/frappe-erpnext',
        '/fr/souverainete',
        '/fr/editeur',
        '/fr/ingenierie',
        '/fr/tarifs',
      ],
    },
  },
  image: {
    provider: 'ipx',
  },
})
