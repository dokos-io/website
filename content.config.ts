import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// Content v3 stores each declared schema field in its own SQLite column. Using
// `z.any()` for nested data makes it coerce objects/arrays to "[object Object]",
// so structured fields must be typed as objects (passthrough keeps their keys)
// or arrays to be JSON-serialized and read back correctly.
const obj = () => z.object({}).passthrough()
const arr = () => z.array(z.any())

const landingSchema = z.object({
  icon: z.string().optional(),
  toc: z.boolean().optional(),
  announcement: obj().optional(),
  hero: obj().optional(),
  metrics: obj().optional(),
  sections: arr().optional(),
  // Blocks introduced by the "éditeur souverain + garanties opérationnelles"
  // positioning. Every block here is `passthrough()`, so a typo in a key name
  // renders nothing rather than failing the build — check pages visually.
  scope: obj().optional(),
  guarantees: obj().optional(),
  operations: obj().optional(),
  reversibility: obj().optional(),
  lanes: obj().optional(),
  proof: obj().optional(),
  applications: obj().optional(),
  integrations: obj().optional(),
  modules: obj().optional(),
  cta: obj().optional(),
  pricing_toggle: obj().optional(),
  plans: arr().optional(),
  links: arr().optional(),
  faq: obj().optional(),
  services: obj().optional(),
  selfhost: obj().optional(),
  form: obj().optional(),
  contact_info: arr().optional(),
  cards: arr().optional(),
  logos: obj().optional(),
  colored_section: obj().optional(),
  carousel: arr().optional(),
})

const blogSchema = z.object({
  name: z.string().optional(),
  year: z.union([z.string(), z.number()]).optional(),
  date: z.string().optional(),
  id: z.union([z.string(), z.number()]).optional(),
  badge: obj().optional(),
  author: z.string().optional(),
  authors: arr().optional(),
  image: z.union([z.string(), obj()]).optional(),
  icon: z.string().optional(),
})

// Shared by `modules` and `features`.
const moduleSchema = z.object({
  icon: z.string().optional(),
  application: z.string().optional(),
  author: z.string().optional(),
  link: z.string().optional(),
  logo: obj().optional(),
  hero: obj().optional(),
  bridge: obj().optional(),
  bridge_before_colored_section: obj().optional(),
  bridge_after_carousel: obj().optional(),
  features_before_colored_section: obj().optional(),
  colored_section: obj().optional(),
  features: arr().optional(),
  main_features: arr().optional(),
  carousel: obj().optional(),
  bottom_section: obj().optional(),
  bottom_cta: obj().optional(),
  plus_button: obj().optional(),
})

const partnerSchema = z.object({
  category: z.string().optional(),
  color: z.string().optional(),
  link: z.string().optional(),
  fullDescription: z.string().optional(),
  emailAddress: z.string().optional(),
  phoneNumber: z.string().optional(),
  phone: z.string().optional(),
  twitter: z.string().optional(),
  github: z.string().optional(),
  gitlab: z.string().optional(),
  logo: obj().optional(),
  logoFull: z.union([z.string(), obj()]).optional(),
  services: arr().optional(),
  resources: arr().optional(),
  regions: arr().optional(),
  location: z.string().optional(),
})

export default defineContentConfig({
  collections: {
    // Landing/marketing pages + standalone markdown docs (French locale)
    pages: defineCollection({
      type: 'page',
      source: {
        include: 'fr/**',
        exclude: [
          'fr/blog/**',
          'fr/features/**',
          'fr/modules/**',
          'fr/partners/**',
          '**/_dir.yml',
        ],
      },
      schema: landingSchema,
    }),
    blog: defineCollection({
      type: 'page',
      source: 'fr/blog/**',
      schema: blogSchema,
    }),
    features: defineCollection({
      type: 'page',
      source: 'fr/features/**',
      schema: moduleSchema,
    }),
    modules: defineCollection({
      type: 'page',
      source: 'fr/modules/**',
      schema: moduleSchema,
    }),
    partners: defineCollection({
      type: 'page',
      source: {
        include: 'fr/partners/**',
        exclude: ['**/_dir.yml'],
      },
      schema: partnerSchema,
    }),
  },
})
