<script setup lang="ts">

const localePath = useLocalePath()

const route = useRoute()

const { t } = useI18n({
  useScope: 'local'
})

const links = [{
  label: t('features'),
  icon: 'i-heroicons-computer-desktop',
  children: [
    {
      label: t('selling'),
      to: localePath('/selling'),
      icon: 'i-heroicons-ticket',
      description: 'A simple pricing, for solo developers or teams.'
    },
    {
      label: t('buying'),
      to: localePath('/selling'),
      icon: 'i-heroicons-ticket',
      description: 'A simple pricing, for solo developers or teams.'
    }
  ]
}, {
  label: t('documentation'),
  to: 'https://doc.dokos.io',
  icon: 'i-heroicons-book-open',
  children: [
    {
      label: t('installation'),
      to: 'https://doc.dokos.io/dodock/installation',
      target: '_blank',
      icon: 'i-heroicons-ticket',
      description: 'A simple pricing, for solo developers or teams.'
    },
    {
      label: t('applications'),
      to: 'https://doc.dokos.io',
      target: '_blank',
      icon: 'i-heroicons-ticket',
      description: 'A simple pricing, for solo developers or teams.'
    }
  ]
}, {
  label: t('applications'),
  to: localePath('/pricing'),
  icon: 'i-heroicons-ticket',
},
{
  label: t('news'),
  to: localePath('/blog'),
  icon: 'i-heroicons-newspaper',
}]

</script>

<template>
  <UHeader :links="links">
    <template #logo>
      Dokos <UBadge label="Project" variant="subtle" class="mb-0.5" />
    </template>

    <template #center>
      <UHeaderLinks :links="links" :ui="{ default: { popover: { popper: { strategy: 'absolute' }, ui: { width: 'w-[256px]' } } } }" class="hidden lg:flex" />
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
  installation: Installation
  applications: Applications
  pricing: Pricing
  news: News
fr:
  features: Fonctionnalités
  selling: Selling
  buying: Buying
  documentation: Documentation
  installation: Installation
  applications: Applications
  pricing: Tarifs
  news: Actualités
</i18n>