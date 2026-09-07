<script setup lang="ts">
const { locale } = useI18n()

const { data: page } = await useAsyncData<any>('souverainete', () =>
    queryCollection('pages').path(`/${locale.value}/souverainete`).first()
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
