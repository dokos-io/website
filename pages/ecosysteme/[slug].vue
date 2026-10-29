<script setup lang="ts">
// Same pattern as pages/solutions/[slug].vue: content-driven landing pages,
// one per business theme, sharing LandingPage's block renderer.
const route = useRoute()
const { locale } = useI18n()

const slug = route.params.slug as string

const { data: page } = await useAsyncData<any>(`ecosysteme-${slug}`, () =>
    queryCollection('pages').path(`/${locale.value}/ecosysteme/${slug}`).first()
)

if (!page.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page not found',
        fatal: true,
    })
}

useSeoMeta({
    title: page.value.title,
    ogTitle: page.value.title,
    description: page.value.description,
    ogDescription: page.value.description,
})

defineOgImage('OgImageSaas' as any, {
    title: page.value.title,
    description: page.value.description,
})
</script>

<template>
    <LandingPage :page="page" />
</template>
