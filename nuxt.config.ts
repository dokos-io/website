// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-og-image',
    '@nuxtjs/i18n',
    '@nuxtjs/turnstile',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],
  compatibilityDate: '2025-06-13',
  css: ['~/assets/css/main.css'],
  content: {
    // Node 24 ships `node:sqlite`; using it avoids the native better-sqlite3
    // build on Vercel and locally.
    experimental: { sqliteConnector: 'native' },
  },
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.dokos.io',
  },
  hooks: {
    'components:extend': (components) => {
      // The site has no rich-text editor. Nuxt UI's editor components import tiptap
      // extensions whose peer dependencies (@tiptap/y-tiptap, yjs) are not installed.
      for (let i = components.length - 1; i >= 0; i--) {
        if (components[i].pascalName.startsWith('UEditor')) components.splice(i, 1)
      }

      // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
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
    '/features': { redirect: { to: '/fr/modules', statusCode: 301 } },
    '/fr/features': { redirect: { to: '/fr/modules', statusCode: 301 } },
    '/features/**': { redirect: { to: '/fr/modules/**', statusCode: 301 } },
    '/fr/features/**': { redirect: { to: '/fr/modules/**', statusCode: 301 } },
    '/en/features': { redirect: { to: '/en/modules', statusCode: 301 } },
    '/en/features/**': { redirect: { to: '/en/modules/**', statusCode: 301 } },
    '/fr/pricing': { redirect: { to: '/fr/tarifs', statusCode: 301 } },
    '/tiers-lieux': { redirect: { to: '/fr/solutions/tiers-lieux', statusCode: 301 } },
    '/fr/tiers-lieux': { redirect: { to: '/fr/solutions/tiers-lieux', statusCode: 301 } },
    '/service-companies': { redirect: { to: '/fr/solutions/entreprises-de-services', statusCode: 301 } },
    '/fr/service-companies': { redirect: { to: '/fr/solutions/entreprises-de-services', statusCode: 301 } },
    '/production-companies': { redirect: { to: '/fr/solutions/industrie', statusCode: 301 } },
    '/fr/production-companies': { redirect: { to: '/fr/solutions/industrie', statusCode: 301 } },
    // Retired product pages (2026-11): OCR is part of eTransactions on V5,
    // Drive moved into Frappe Suite, Print Designer is no longer maintained.
    '/modules/ocr': { redirect: { to: '/fr/modules/etransactions', statusCode: 301 } },
    '/fr/modules/ocr': { redirect: { to: '/fr/modules/etransactions', statusCode: 301 } },
    '/en/modules/ocr': { redirect: { to: '/en/modules/etransactions', statusCode: 301 } },
    '/modules/drive': { redirect: { to: '/fr/modules/suite', statusCode: 301 } },
    '/fr/modules/drive': { redirect: { to: '/fr/modules/suite', statusCode: 301 } },
    '/en/modules/drive': { redirect: { to: '/en/modules/suite', statusCode: 301 } },
    '/modules/print-designer': { redirect: { to: '/fr/ecosysteme/site-web-outils-numeriques', statusCode: 301 } },
    '/fr/modules/print-designer': { redirect: { to: '/fr/ecosysteme/site-web-outils-numeriques', statusCode: 301 } },
    '/en/modules/print-designer': { redirect: { to: '/en/ecosysteme/site-web-outils-numeriques', statusCode: 301 } },

    // Legacy paths of the pre-2024 site, formerly only in `public/_redirects`,
    // which no host here reads.
    '/accounting': { redirect: { to: '/fr/modules/comptabilite', statusCode: 301 } },
    '/dashboards': { redirect: { to: '/fr/modules/insights', statusCode: 301 } },
    '/human-resources': { redirect: { to: '/fr/modules/ressources-humaines', statusCode: 301 } },
    '/website': { redirect: { to: '/fr/modules/builder', statusCode: 301 } },
    '/inventory': { redirect: { to: '/fr/modules/stocks', statusCode: 301 } },
    '/manufacturing': { redirect: { to: '/fr/modules/production', statusCode: 301 } },
    '/projects': { redirect: { to: '/fr/modules/projets', statusCode: 301 } },
    '/purchasing': { redirect: { to: '/fr/modules/achats', statusCode: 301 } },
    '/quality-management': { redirect: { to: '/fr/modules/qualite', statusCode: 301 } },
    '/selling': { redirect: { to: '/fr/modules/ventes', statusCode: 301 } },
    '/support': { redirect: { to: '/fr/modules/support', statusCode: 301 } },
    '/integrations': { redirect: { to: '/fr/modules/integrations', statusCode: 301 } },
    '/become-a-partner': { redirect: { to: '/fr/partners', statusCode: 301 } },
    '/jobs': { redirect: { to: '/fr/recrutement', statusCode: 301 } },
    '/security-and-privacy': { redirect: { to: '/fr/securityandprivacy', statusCode: 301 } },
    '/terms-and-conditions': { redirect: { to: '/fr/termsandconditions', statusCode: 301 } },
    '/checkout': { redirect: { to: '/fr/ingenierie', statusCode: 301 } },
    '/training': { redirect: { to: '/fr/ingenierie', statusCode: 301 } },
    '/open-source-experience': { redirect: { to: '/fr/open-source-experience-2025', statusCode: 307 } },
    '/fr/open-source-experience': { redirect: { to: '/fr/open-source-experience-2025', statusCode: 307 } },
    // English forms of the paths retired by the 2026 revamp.
    '/en/services': { redirect: { to: '/en/ingenierie', statusCode: 301 } },
    '/en/pricing': { redirect: { to: '/en/tarifs', statusCode: 301 } },
    '/en/tiers-lieux': { redirect: { to: '/en/solutions/tiers-lieux', statusCode: 301 } },
    '/en/service-companies': { redirect: { to: '/en/solutions/entreprises-de-services', statusCode: 301 } },
    '/en/production-companies': { redirect: { to: '/en/solutions/industrie', statusCode: 301 } },
    // The homepage is French only (pages/index.vue), and its former preview
    // page duplicated it.
    '/en': { redirect: { to: '/fr', statusCode: 301 } },
    '/accueil-2026': { redirect: { to: '/fr', statusCode: 301 } },
    '/fr/accueil-2026': { redirect: { to: '/fr', statusCode: 301 } },

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
      {
        name: 'English',
        code: 'en',
        language: 'en-US',
        file: 'en-US.js'
      }
    ],
    langDir: 'lang',
    // Absolute URLs for the canonical and hreflang links (useLocaleHead in app.vue).
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.dokos.io',
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
  ogImage: {
    // Every route is prerendered, so there is no runtime image endpoint to
    // protect; v7 would otherwise require a 32-char NUXT_APP_SECRET at build.
    security: { secret: false },
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
        '/fr/modules',
        '/fr/certifications',
        '/fr/open-source-experience-2026',
        '/fr/ecosysteme/vente-relation-client',
        '/fr/ecosysteme/finance-comptabilite',
        '/fr/ecosysteme/achats-stocks-production',
        '/fr/ecosysteme/projets-ressources-humaines',
        '/fr/ecosysteme/support-collaboration',
        '/fr/ecosysteme/site-web-outils-numeriques',
        '/fr/ecosysteme/intelligence-artificielle',
      ],
    },
  },
  image: {
    provider: 'ipx',
  },
  icon: {
    // Icons resolve from the installed @iconify-json collections only, never
    // from the public Iconify API: the site makes no third-party requests.
    fallbackToApi: false,
    // Icons named in components and content ship in the client bundle, so
    // client-side navigation does not fetch them either.
    clientBundle: {
      scan: { globInclude: ['components/**/*.vue', 'pages/**/*.vue', 'layouts/**/*.vue', 'utils/**/*.ts', 'composables/**/*.ts', 'content/**/*.{md,yml}'] },
      sizeLimitKb: 512,
    },
  },
  sitemap: {
    // URLs are listed in their canonical form (shared/canonical-path.mjs,
    // rewritten by server/plugins/sitemap-canonical.ts): unprefixed for French,
    // `/fr` for the homepage. Left out: noindexed previews and the search index.
    urls: ['/fr'],
    // Built with the prerender, from every prerendered page, and served as
    // static files: at runtime the module no longer knows the prerendered URLs.
    zeroRuntime: true,
    exclude: ['/osxp-2026', '/fr/osxp-2026', '/travailler-ensemble', '/fr/travailler-ensemble', '/api/**'],
  },
})
