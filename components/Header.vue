<script setup lang="ts">

const localePath = useLocalePath()

const route = useRoute()

const { t, locale } = useI18n({
  useScope: 'local'
})

const modulesContentQuery = queryContent(`/${locale.value}/modules`)
const { data: modules_nav } = await useAsyncData('modules_nav', () => fetchContentNavigation(modulesContentQuery), {
  watch: [locale]
})

const modules = modules_nav.value?.find(item => item._path === `/${locale.value}`)?.children?.find(item => item._path === `/${locale.value}/modules`)?.children

const modules_links = modules?.map(feat => {
  return {
    label: feat.title,
    to: feat._path,
    icon: feat.icon,
    description: feat.description
  }
}).sort((a, b) => {
  const nameA = a.label.toUpperCase();
  const nameB = b.label.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  return 0;
})


const links = computed(() => {
  return [
    {
      label: t('features'),
      icon: 'i-heroicons-computer-desktop',
      children: modules_links
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
  <UHeader :links="links" :to="localePath('/')">
    <template #logo>
      <img width="40px" src="/dokos_logo_rect.svg">
      <UBadge :label="t('badge_label')" variant="subtle" class="mb-0.5" />
    </template>

    <template #center>
      <UHeaderLinks :links="links"
        :ui="{ default: { popover: { popper: { strategy: 'absolute' }, ui: { width: 'w-[64rem]' } } } }"
        class="hidden lg:flex" />
    </template>

    <template #panel>
      <UNavigationTree :links="links" default-open />
    </template>

    <template #right>
      <UButton to="https://cloud.dokos.io" target="_blank" icon="i-material-symbols-host-outline-rounded" aria-label="Dokos Cloud"
        color="blue" variant="outline" label="Créer un site"/>
      <!-- <LangSwitcher v-if='!route.matched.some(p => p.path.includes("/blog/:slug()"))' /> -->
      <UColorModeButton size="sm" />

      <UButton to="https://gitlab.com/dokos" target="_blank" icon="i-simple-icons-gitlab" aria-label="Gitlab"
        color="gray" variant="ghost" />
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