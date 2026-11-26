<script setup lang="ts">
// Preview of the Open Source Experience 2026 page in the 2026 design (see the
// homepage preview). French only, not indexed and absent from the navigation
// until it replaces pages/open-source-experience-2026.vue.
// Content: content/fr/osxp-2026.yml; blocks: components/osxp2026/, plus the
// homepage's hero and marquee.

// The header and footer switch to their 2026 look on pages that ask for it.
// French only (no language switch), light only (no dark version).
definePageMeta({ design2026: true, frenchOnly: true, colorMode: 'light' })

const { locale } = useI18n()

const { data: page } = await useAsyncData<any>('osxp-2026', () =>
    queryCollection('pages').path('/fr/osxp-2026').first()
)

if (!page.value || locale.value !== 'fr') {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

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
    <div v-if="page" class="h26 overflow-x-clip bg-paper text-dokos-500">
        <Home2026Hero :block="page.hero" />
        <Home2026Marquee v-if="page.marquee" :block="page.marquee" />
        <Osxp2026Stack v-if="page.stack" :block="page.stack" />
        <Osxp2026Mastery v-if="page.mastery" :block="page.mastery" />
        <Osxp2026Framework v-if="page.framework" :block="page.framework" />
        <Osxp2026Chapters v-if="page.chapters" :block="page.chapters" />
        <Osxp2026Assist v-if="page.assist" :block="page.assist" />
        <Osxp2026Event v-if="page.event" :block="page.event" />
    </div>
</template>
