<script setup lang="ts">

const localePath = useLocalePath()

const route = useRoute()

const { t, locale } = useI18n({
  useScope: 'local'
})

const { data: nav } = await useAsyncData('navigation', () => fetchContentNavigation(queryContent(`/${locale.value}/features`)), {
    watch: [locale]
  })

const features = nav.value?.find(item => item._path === `/${locale.value}`)?.children?.find(item => item._path === `/${locale.value}/features`)?.children

const features_links = features?.map(feat => {
  return {
    label: feat.title,
    to: feat._path,
    icon: feat.icon,
    description: feat.description
  }
})

const links = computed(() => {
  return [{
    label: t('features'),
    icon: 'i-heroicons-computer-desktop',
    children: features_links
  }, {
    label: t('documentation'),
    to: 'https://doc.dokos.io',
    icon: 'i-heroicons-book-open',
  }, {
    label: t('pricing'),
    to: localePath('/pricing'),
    icon: 'i-heroicons-ticket',
  },
  {
    label: t('news'),
    to: localePath('/blog'),
    icon: 'i-heroicons-newspaper',
  }]
});

</script>

<template>
  <UHeader :links="links" :to="localePath('/')">
    <template #logo>
      <img width="40px" src="/dokos_logo_rect.svg">
      <UBadge :label="t('badge_label')" variant="subtle" class="mb-0.5" />
    </template>

    <template #center>
      <UHeaderLinks :links="links" :ui="{ default: { popover: { popper: { strategy: 'absolute' }, ui: { width: 'w-[64rem]' } } } }" class="hidden lg:flex" />
    </template>

    <template #panel>
      <UNavigationTree :links="links" default-open />
    </template>

    <template #right>
      <LangSwitcher v-if='!route.matched.some(p => p.path.includes("/blog/:slug()"))'/>
      <UColorModeButton size="sm" />

      <UButton to="https://gitlab.com/dokos" target="_blank" icon="i-simple-icons-gitlab" aria-label="Gitlab" color="gray" variant="ghost" />
    </template>
  </UHeader>
</template>

<i18n lang="yaml">
en:
  features: Features
  selling: Selling
  buying: Buying
  documentation: Documentation
  pricing: Pricing
  news: News
  badge_label: Project
fr:
  features: Fonctionnalités
  selling: Selling
  buying: Buying
  documentation: Documentation
  pricing: Tarifs
  news: Actualités
  badge_label: Projet
</i18n>