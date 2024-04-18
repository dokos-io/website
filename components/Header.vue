<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'

const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))

const localePath = useLocalePath()

const links = [{
  label: 'Docs',
  to: localePath('/docs')
}, {
  label: 'Pricing',
  to: localePath('/pricing')
}, {
  label: 'Blog',
  to: localePath('/blog')
}]
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      Dokos <UBadge label="Project" variant="subtle" class="mb-0.5" />
    </template>

    <template #right>
    </template>

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" default-open />
    </template>
  </UHeader>
</template>
