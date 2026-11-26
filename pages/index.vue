<script setup lang="ts">
// The header and footer switch to their 2026 look on pages that ask for it.
// French only (no language switch), light only (no dark version).
definePageMeta({ design2026: true, frenchOnly: true, colorMode: 'light' })

const { data: page } = await useAsyncData<any>('index', () =>
    queryCollection('pages').path('/fr/accueil-2026').first()
)

if (!page.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page not found',
        fatal: true,
    })
}

useSeoMeta({
    titleTemplate: '',
    title: page.value.title,
    ogTitle: page.value.title,
    description: page.value.description,
    ogDescription: page.value.description,
})
</script>

<template>
    <Home2026Page v-if="page" :page="page" />
</template>
