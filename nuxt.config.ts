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
    preference: 'light',
    fallback: 'light',
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
  },
  image: {
    provider: 'ipx',
  },
})
