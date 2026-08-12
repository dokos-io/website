<script setup lang="ts">

const localePath = useLocalePath()

const route = useRoute()

const { t } = useI18n({
  useScope: 'local'
})

const { Modules, fetchList } = useModules()
await fetchList()

const modules_links = computed(() =>
  [...Modules.value]
    .map((feat) => {
      const nav = (feat.navigation ?? {}) as { title?: string, icon?: string, description?: string }
      return {
        label: (nav.title ?? feat.title) as string,
        to: feat.path as string,
        icon: (nav.icon ?? feat.icon) as string,
        description: (nav.description ?? feat.description) as string
      }
    })
    .sort((a, b) => a.label.toUpperCase().localeCompare(b.label.toUpperCase()))
)

const links = computed(() => {
  return [
    {
      // What we publish: the éditeur claim and the surface it covers.
      label: t('platform'),
      icon: 'i-heroicons-squares-2x2',
      children: [
        {
          label: t('publisher'),
          to: localePath('/editeur'),
          icon: 'i-heroicons-code-bracket-square',
          description: t('publisher_description')
        },
        {
          label: t('all_modules'),
          to: localePath('/modules'),
          icon: 'i-heroicons-rectangle-group',
          description: t('all_modules_description')
        },
        {
          label: t('certifications'),
          to: localePath('/certifications'),
          icon: 'i-octicon-law',
          description: t('certifications_description')
        },
        ...modules_links.value
      ]
    },
    {
      // What we run, and what we commit to in writing.
      label: t('operations'),
      icon: 'i-heroicons-server-stack',
      children: [
        {
          label: t('managed_dokos'),
          to: localePath('/exploitation'),
          icon: 'i-material-symbols-cloud-done-outline',
          description: t('managed_dokos_description')
        },
        {
          label: t('managed_frappe'),
          to: localePath('/exploitation/frappe-erpnext'),
          icon: 'i-simple-icons-frappe',
          description: t('managed_frappe_description')
        },
        {
          label: t('sovereignty'),
          to: localePath('/souverainete'),
          icon: 'i-material-symbols-security-rounded',
          description: t('sovereignty_description')
        }
      ]
    },
    {
      label: t('engineering'),
      to: localePath('/ingenierie'),
      icon: 'i-heroicons-wrench-screwdriver'
    },
    {
      label: t('pricing'),
      to: localePath('/tarifs'),
      icon: 'i-heroicons-credit-card'
    },
    {
      label: t('resources'),
      icon: 'i-heroicons-book-open',
      children: [
        {
          label: t('news'),
          to: localePath('/blog'),
          icon: 'i-heroicons-newspaper'
        },
        {
          label: t('documentation'),
          to: 'https://doc.dokos.io',
          icon: 'i-ic-outline-library-books',
          target: '_blank'
        },
        {
          label: t('community'),
          to: 'https://community.dokos.io',
          icon: 'i-heroicons-user-group',
          target: '_blank'
        },
        {
          label: t('partners'),
          to: localePath('/partners'),
          icon: 'i-heroicons-building-office-2'
        }
      ]
    }
  ]
});

</script>

<template>
  <UHeader :to="localePath('/')">
    <template #left>
      <NuxtLink :to="localePath('/')" class="flex items-center gap-2">
        <img width="40" src="/dokos_logo_rect.svg" alt="Dokos">
        <UBadge :label="t('badge_label')" variant="subtle" class="mb-0.5" />
      </NuxtLink>
    </template>

    <UNavigationMenu :items="links" class="hidden lg:flex" />

    <template #right>
      <!-- Two doors: self-serve stays, but the operated offer leads. -->
      <UButton :to="localePath('/contact')" icon="i-heroicons-chat-bubble-left-right"
        color="primary" variant="solid" :label="t('talk_to_engineer')" class="hidden sm:inline-flex" />
      <UButton to="https://cloud.dokos.io" target="_blank" icon="i-material-symbols-host-outline-rounded"
        aria-label="Dokos Cloud" color="neutral" variant="outline" :label="t('create_site')" />
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
  platform: Platform
  publisher: The publisher
  publisher_description: Dodock and Dokos — the fork we maintain
  all_modules: All modules
  all_modules_description: The functional surface, module by module
  certifications: Certifications & compliance
  certifications_description: LNE, e-invoicing, version integrity
  operations: Operations
  managed_dokos: Managed Dokos
  managed_dokos_description: We run your ERP under contract
  managed_frappe: Frappe & ERPNext
  managed_frappe_description: Already running Frappe? We operate it too
  sovereignty: Sovereignty & security
  sovereignty_description: EU hosting, GPLv3, reversibility
  engineering: Engineering
  pricing: Pricing
  resources: Resources
  documentation: Documentation
  community: Community forum
  partners: Partners
  news: News
  badge_label: Project
  create_site: Create a site
  talk_to_engineer: Talk to an engineer
fr:
  platform: Plateforme
  publisher: L'éditeur
  publisher_description: Dodock et Dokos — le fork que nous maintenons
  all_modules: Tous les modules
  all_modules_description: La couverture fonctionnelle, module par module
  certifications: Certifications & conformité
  certifications_description: LNE, facturation électronique, intégrité des versions
  operations: Exploitation
  managed_dokos: Infogérance Dokos
  managed_dokos_description: Nous exploitons votre ERP, sous contrat
  managed_frappe: Frappe & ERPNext
  managed_frappe_description: Déjà sous Frappe ? Nous l'exploitons aussi
  sovereignty: Souveraineté & sécurité
  sovereignty_description: Hébergement UE, GPLv3, réversibilité
  engineering: Ingénierie
  pricing: Tarifs
  resources: Ressources
  documentation: Documentation
  community: Forum communautaire
  partners: Partenaires
  news: Actualités
  badge_label: Projet
  create_site: Créer un site
  talk_to_engineer: Parler à un ingénieur
</i18n>
