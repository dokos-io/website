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
    .map(feat => ({
      label: feat.title as string,
      to: feat.path as string,
      icon: feat.icon as string,
      description: feat.description as string
    }))
    .sort((a, b) => a.label.toUpperCase().localeCompare(b.label.toUpperCase()))
)

const links = computed(() => {
  return [
    {
      label: t('features'),
      icon: 'i-heroicons-computer-desktop',
      children: modules_links.value
    }, {
      label: t('services'),
      to: localePath('/services'),
      icon: 'i-heroicons-ticket',
    },
    {
      label: t('news'),
      to: localePath('/blog'),
      icon: 'i-heroicons-newspaper',
    },
    {
      label: t('documentation'),
      to: 'https://doc.dokos.io',
      icon: 'i-heroicons-book-open',
      target: "_blank"
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
      <UButton to="https://cloud.dokos.io" target="_blank" icon="i-material-symbols-host-outline-rounded" aria-label="Dokos Cloud"
        color="info" variant="outline" label="Créer un site" />
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
  features: Features
  selling: Selling
  buying: Buying
  documentation: Documentation
  services: Services
  news: News
  badge_label: Project
  applications: Applications
fr:
  features: Fonctionnalités
  selling: Selling
  buying: Buying
  documentation: Documentation
  services: Services
  news: Actualités
  badge_label: Projet
  applications: Applications
</i18n>