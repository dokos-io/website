<script setup lang="ts">
// Preview of the 2026 homepage ("Nancy" direction: cream paper, very large
// type, typewriter lines, a blueprint of the company). French only, not
// indexed and absent from the navigation until it replaces pages/index.vue.
// Content: content/fr/accueil-2026.yml; blocks: components/home2026/.

// The header and footer switch to their 2026 look on pages that ask for it.
// French only (no language switch), light only (no dark version).
definePageMeta({ design2026: true, frenchOnly: true, colorMode: 'light' })

const { locale } = useI18n()

const { data: page } = await useAsyncData<any>('accueil-2026', () =>
    queryCollection('pages').path('/fr/accueil-2026').first()
)

if (!page.value || locale.value !== 'fr') {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// The buttons that open "Dokos en deux minutes" only show once the video exists.
usePresentationReady().value = !!page.value.presentation?.src

useSeoMeta({
    titleTemplate: '',
    title: page.value.title,
    ogTitle: page.value.title,
    description: page.value.description,
    ogDescription: page.value.description,
    robots: 'noindex, nofollow',
})
</script>

<template>
    <Home2026Page v-if="page" :page="page" />
</template>
