<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('pages'), { default: () => [] })
// The search index (~350 KB) is fetched the first time search is opened
// (Cmd/Ctrl+K), not on every page load.
const { files } = useDeferredSearchIndex()

provide('navigation', navigation)
</script>

<template>
  <div>
    <Header />

    <UMain>
      <slot />
    </UMain>

    <Footer />

    <ClientOnly>
      <LazyUContentSearch :files="files" :navigation="navigation" />
    </ClientOnly>
  </div>
</template>
