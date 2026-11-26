<script setup lang="ts">
// « Comment nous travaillons ensemble » in the 2026 design: the relationship
// with Dokos SAS, looking for allies rather than suppliers. French only, not
// indexed and absent from the navigation until its texts are validated.
// Content: content/fr/travailler-ensemble.yml; blocks: components/together2026/,
// plus the homepage's hero and letter.

// French only (no language switch), light only (no dark version).
definePageMeta({ design2026: true, frenchOnly: true, colorMode: 'light' })

const { locale } = useI18n()

const { data: page } = await useAsyncData<any>('travailler-ensemble', () =>
    queryCollection('pages').path('/fr/travailler-ensemble').first()
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
        <Home2026Story v-if="page.story" :block="page.story" />
        <Together2026Freedom v-if="page.roles" :block="page.roles" tone="paper" />
        <Together2026Freedom v-if="page.convictions" :block="page.convictions" tone="paper" />
        <Together2026Text v-if="page.autonomy" :block="page.autonomy" tone="blue" />
        <Together2026Freedom v-if="page.freedom" :block="page.freedom" tone="paper" />
        <Together2026Closing v-if="page.closing" :block="page.closing" />
    </div>
</template>
