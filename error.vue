<script setup lang="ts">
import type { NuxtError } from '#app'

const { locale } = useI18n()

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.'
})

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true
  }
})

useHead({
  htmlAttrs: {
    lang: locale.value
  }
})

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('pages'), { default: () => [] })
const { data: files } = useLazyFetch('/api/search.json', { default: () => [], server: false })

provide('navigation', navigation)
</script>

<template>
  <UApp>
    <Header />

    <UMain>
      <UContainer>
        <UPage>
          <UPageError :error="error" />
        </UPage>
      </UContainer>
    </UMain>

    <Footer />

    <ClientOnly>
      <LazyUContentSearch :files="files" :navigation="navigation" />
    </ClientOnly>
  </UApp>
</template>
