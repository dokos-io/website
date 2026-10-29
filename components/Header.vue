<script setup lang="ts">
import { THEMES, AI_THEME_SLUG } from '~/utils/themes'

const localePath = useLocalePath()
const route = useRoute()
const { t, locale } = useI18n({ useScope: 'local' })

const links = computed(() => {
  const lang = (locale.value === 'en' ? 'en' : 'fr') as 'fr' | 'en'

  // The AI theme has its own entry above the business themes, so it is not
  // repeated in the theme list.
  const theme_links = THEMES.filter(theme => theme.slug !== AI_THEME_SLUG).map(theme => ({
    label: theme.label[lang],
    to: localePath(`/ecosysteme/${theme.slug}`),
    icon: theme.icon,
  }))

  return [
    {
      // The product: the ecosystem of apps and the project behind it.
      label: t('dokos'),
      icon: 'i-heroicons-squares-2x2',
      children: [
        {
          label: t('ecosystem'),
          to: localePath('/modules'),
          icon: 'i-heroicons-rectangle-group',
          description: t('ecosystem_description'),
        },
        {
          label: t('ai_agents'),
          to: localePath(`/ecosysteme/${AI_THEME_SLUG}`),
          icon: 'i-heroicons-cpu-chip',
          description: t('ai_agents_description'),
        },
        {
          label: t('open_source'),
          to: localePath('/editeur'),
          icon: 'i-heroicons-code-bracket-square',
          description: t('open_source_description'),
        },
        {
          label: t('certifications'),
          to: localePath('/certifications'),
          icon: 'i-octicon-law',
          description: t('certifications_description'),
        },
        ...theme_links,
      ],
    },
    {
      // The services: what Dokos SAS does for its clients.
      label: t('services'),
      icon: 'i-heroicons-wrench-screwdriver',
      children: [
        {
          label: t('build'),
          to: localePath('/ingenierie'),
          icon: 'i-heroicons-wrench-screwdriver',
          description: t('build_description'),
        },
        {
          label: t('guarantee'),
          to: localePath('/exploitation'),
          icon: 'i-material-symbols-cloud-done-outline',
          description: t('guarantee_description'),
        },
        {
          label: t('frappe_experts'),
          to: localePath('/exploitation/frappe-erpnext'),
          icon: 'i-simple-icons-frappe',
          description: t('frappe_experts_description'),
        },
        {
          label: t('hosting_data'),
          to: localePath('/souverainete'),
          icon: 'i-material-symbols-security-rounded',
          description: t('hosting_data_description'),
        },
      ],
    },
    {
      label: t('pricing'),
      to: localePath('/tarifs'),
      icon: 'i-heroicons-credit-card',
    },
    {
      label: t('resources'),
      icon: 'i-heroicons-book-open',
      children: [
        { label: t('news'), to: localePath('/blog'), icon: 'i-heroicons-newspaper' },
        { label: t('documentation'), to: 'https://doc.dokos.io', icon: 'i-ic-outline-library-books', target: '_blank' },
        { label: t('community'), to: 'https://community.dokos.io', icon: 'i-heroicons-user-group', target: '_blank' },
        { label: t('partners'), to: localePath('/partners'), icon: 'i-heroicons-building-office-2' },
      ],
    },
  ]
})
</script>

<template>
  <UHeader :to="localePath('/')">
    <template #left>
      <NuxtLink :to="localePath('/')" class="flex items-center gap-2">
        <img width="40" src="/dokos_logo_rect.svg" alt="Dokos">
      </NuxtLink>
    </template>

    <UNavigationMenu :items="links" class="hidden lg:flex" />

    <template #right>
      <UButton :to="localePath('/contact')" icon="i-heroicons-chat-bubble-left-right"
        color="primary" variant="solid" :label="t('contact')" class="hidden sm:inline-flex" />
      <UButton to="https://cloud.dokos.io" target="_blank" icon="i-material-symbols-host-outline-rounded"
        aria-label="Dokos Cloud" color="neutral" variant="outline" :label="t('try_dokos')" />
      <LangSwitcher v-if="!route.matched.some(p => p.path.includes('/blog/'))" />
      <UColorModeButton />

      <UButton to="https://gitlab.com/dokos" target="_blank" icon="i-simple-icons-gitlab" aria-label="Gitlab"
        color="neutral" variant="ghost" />
    </template>

    <template #body>
      <UNavigationMenu :items="links" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>

<i18n lang="yaml">
en:
  dokos: Dokos
  ecosystem: The ecosystem
  ecosystem_description: One database, the apps that plug into it
  ai_agents: AI & agents
  ai_agents_description: Dokos AI, Dokos CLI and the MCP server
  open_source: Open source publisher
  open_source_description: Dodock, Dokos and the apps we maintain
  certifications: Certifications & compliance
  certifications_description: LNE, e-invoicing, version integrity
  services: Services
  build: We build · Engineering
  build_description: Business apps built on Dokos and Frappe
  guarantee: We guarantee · Operations
  guarantee_description: Your Dokos run under contract, with written delays
  frappe_experts: Frappe & ERPNext experts
  frappe_experts_description: Audits, upgrades and operations of standard ERPNext
  hosting_data: Hosting & data
  hosting_data_description: EU hosting, GPLv3, your data stays yours
  pricing: Pricing
  resources: Resources
  documentation: Documentation
  community: Community forum
  partners: Partners
  news: News
  try_dokos: Try Dokos
  contact: Contact us
fr:
  dokos: Dokos
  ecosystem: L'écosystème
  ecosystem_description: Une seule base, les applications qui s'y branchent
  ai_agents: IA & agents
  ai_agents_description: Dokos AI, Dokos CLI et le serveur MCP
  open_source: Éditeur open source
  open_source_description: Dodock, Dokos et les applications que nous maintenons
  certifications: Certifications & conformité
  certifications_description: LNE, facturation électronique, intégrité des versions
  services: Services
  build: Nous bâtissons · Ingénierie
  build_description: Des applications métier construites sur Dokos et Frappe
  guarantee: Nous garantissons · Exploitation
  guarantee_description: Votre Dokos exploité sous contrat, avec des délais écrits
  frappe_experts: Experts Frappe & ERPNext
  frappe_experts_description: Audit, montée de version et exploitation d'ERPNext standard
  hosting_data: Hébergement et données
  hosting_data_description: Hébergement européen, GPLv3, vos données restent à vous
  pricing: Tarifs
  resources: Ressources
  documentation: Documentation
  community: Forum communautaire
  partners: Partenaires
  news: Actualités
  try_dokos: Essayer Dokos
  contact: Nous écrire
</i18n>
