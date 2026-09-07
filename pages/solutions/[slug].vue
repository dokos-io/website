<script setup lang="ts">
// Replaces the three near-identical sector SFCs (tiers-lieux,
// service-companies, production-companies). All three were ~250 lines of the
// same template; the shape now lives in LandingPage and the difference lives
// entirely in content/fr/solutions/*.yml.
const route = useRoute()
const { locale } = useI18n()

const slug = route.params.slug as string

const { data: page } = await useAsyncData<any>(`solutions-${slug}`, () =>
    queryCollection('pages').path(`/${locale.value}/solutions/${slug}`).first()
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
