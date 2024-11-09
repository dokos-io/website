// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [process.env.NUXT_UI_PRO_PATH || '@nuxt/ui-pro'],
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxthq/studio',
    '@vueuse/nuxt',
    'nuxt-og-image',
    "@nuxtjs/i18n",
    '@nuxtjs/turnstile',
  ],
  turnstile: {
    siteKey: '1x00000000000000000000AA',
  },
  compatibilityDate: "2024-08-06",
  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    'components:extend': (components) => {
      const globals = components.filter((c) => ['UButton'].includes(c.pascalName))

      globals.forEach((c) => c.global = true)
    }
  },
  ui: {
    icons: ['heroicons', 'simple-icons', 'ic', 'mdi', 'icon-park-outline', 'octicon', 'carbon', 'ep', 'uil', 'eos-icons', 'vaadin', 'fluent', 'ri', 'material-symbols', 'gg', 'ic', 'circle-flags', 'iconoir', 'logos', 'cib', 'ph']
  },
  routeRules: {
    '/api/search.json': { prerender: true },
    '/en/docs': { redirect: '/en/docs/getting-started', prerender: false },
    '/fr/docs': { redirect: '/fr/docs/getting-started', prerender: false },
    '/': { redirect: '/fr', prerender: true },
  },
  devtools: {
    enabled: true,
    componentInspector: false,
  },
  i18n: {
    vueI18n: './i18n.config.ts',
    locales: [
      {
        name: 'Français',
        code: 'fr',
        iso: 'fr-FR',
        file: 'fr-FR.js'
      },
      // {
      //   name: 'English',
      //   code: 'en',
      //   iso: 'en-US',
      //   file: 'en-US.js'
      // }
    ],
    langDir: 'lang',
    strategy: "prefix_and_default",
    detectBrowserLanguage: false,
    defaultLocale: "fr"
  },
  runtimeConfig: {
    turnstile: {
      secretKey: '1x0000000000000000000000000000000AA',
    },
  },
})