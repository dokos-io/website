<script setup lang="ts">
import { THEMES, AI_THEME_SLUG } from '~/utils/themes'

const localePath = useLocalePath()
const route = useRoute()
const { t, locale } = useI18n({ useScope: 'local' })

// Pages in the 2026 design (definePageMeta({ design2026: true })) get the 2026 header: cream like the page, flat
// rounded buttons ("Essayer Dokos" first in weight: the page starts from the
// product) and dropdowns laid as white sheets with a soft shadow. Every other
// page keeps the current header until the rest of the site moves over.
const is2026 = computed(() => !!route.meta.design2026)

// High-contrast top menu: bold ink labels, coral underline on hover, ink
// background on the open item.
const NAV_UI = {
  link: 'px-3.5 py-2 rounded-lg text-[15px] font-bold text-[#0F2A3A] dark:text-white hover:bg-sand-200 dark:hover:bg-stone-800 hover:shadow-[inset_0_-3px_0_var(--color-accent)] data-[state=open]:bg-[#0F2A3A] data-[state=open]:text-white data-[state=open]:shadow-[3px_3px_0_var(--color-accent)] before:hidden',
  linkLeadingIcon: 'hidden',
  linkTrailingIcon: 'text-current',
  content: 'border-[2.5px] border-[#0F2A3A] dark:border-dokos-300 rounded-xl shadow-[6px_6px_0_#0F2A3A] dark:shadow-[6px_6px_0_var(--color-dokos-400)]',
  childLinkLabel: 'font-bold text-[#0F2A3A] dark:text-white',
  childLinkDescription: 'text-[#4A5A64] dark:text-stone-300',
}
const NAV_UI_2026 = {
  ...NAV_UI,
  link: 'px-3.5 py-2 rounded-lg text-[15px] font-bold text-dokos-500 hover:shadow-[inset_0_-3px_0_var(--color-accent)] data-[state=open]:bg-dokos-500 data-[state=open]:text-white before:hidden',
  content: 'border border-dokos-500/10 rounded-xl bg-white shadow-[0_18px_40px_rgba(43,42,39,0.16)]',
  childLinkLabel: 'font-bold text-dokos-500',
  childLinkDescription: 'text-stone-600',
}

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
  <UHeader :to="localePath('/')" :ui="is2026 ? { root: 'bg-paper/90 border-dokos-500/10' } : undefined">
    <template #left>
      <NuxtLink :to="localePath('/')" class="flex items-center gap-2.5">
        <img width="40" src="/dokos_logo_rect.svg" alt="Dokos">
        <!-- On the 2026 preview the name is written beside the mark, so it reads on arrival. -->
        <img v-if="is2026" src="/dokos_wordmark.svg" alt="" aria-hidden="true" class="h-6 w-auto">
      </NuxtLink>
    </template>

    <UNavigationMenu :items="links" class="hidden lg:flex" :ui="is2026 ? NAV_UI_2026 : NAV_UI" />

    <template #right>
      <UButton
:to="localePath('/contact')" icon="i-heroicons-chat-bubble-left-right"
        color="primary" variant="solid" :label="t('contact')"
        :class="is2026 ? 'hidden rounded-lg bg-transparent px-4 py-2 font-bold text-dokos-500 ring-[1.5px] ring-dokos-500 hover:bg-dokos-500 hover:text-white sm:inline-flex' : 'dk-btn hidden sm:inline-flex'" />
      <UButton
to="https://cloud.dokos.io" target="_blank" icon="i-material-symbols-host-outline-rounded"
        aria-label="Dokos Cloud" color="neutral" variant="outline" :label="t('try_dokos')"
        :class="is2026 ? 'rounded-lg bg-dokos-500 px-4 py-2 font-bold text-white ring-[1.5px] ring-dokos-500 hover:bg-dokos-600' : 'dk-btn-outline'" />
      <!-- No language switch on French-only pages (English would lead nowhere), and no dark mode
           switch on 2026 pages, which have no dark version. -->
      <LangSwitcher
        v-if="!route.meta.frenchOnly && !route.matched.some(p => p.path.includes('/blog/'))"
        :class="{ 'font-bold text-dokos-500': is2026 }"
      />
      <UColorModeButton v-if="!is2026" />

      <UButton
to="https://gitlab.com/dokos" target="_blank" icon="i-simple-icons-gitlab" aria-label="Gitlab"
        color="neutral" variant="ghost" :class="{ 'text-dokos-500': is2026 }" />
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
