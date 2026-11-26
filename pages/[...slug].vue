<script setup lang="ts">
// Markdown pages (legal notices, terms, certifications) in the 2026 design.
definePageMeta({ design2026: true, colorMode: 'light' })

const route = useRoute()
const {
    params: { slug },
} = useRoute()

const { t, locale } = useI18n({
    useScope: 'local',
})

const path = `/${locale.value}/${(slug as string[]).join('/')}`

const { data: page } = await useAsyncData<any>(route.path, () =>
    queryCollection('pages').path(path).first()
)
if (!page.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page not found',
        fatal: true,
    })
}

const { data: surround } = await useAsyncData<any>(
    `${route.path}-surround`,
    () =>
        queryCollectionItemSurroundings('pages', path, {
            fields: ['title', 'description', 'path'],
        }),
    { default: () => [] }
)

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
    <div v-if="page" class="h26 overflow-x-clip bg-paper text-dokos-500">
        <Landing2026Header :title="page.title" :description="page.description" />

        <div class="mx-auto grid max-w-[1360px] gap-12 px-4 pb-24 sm:px-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
            <article class="h26-prose min-w-0 max-w-3xl">
                <ContentRenderer v-if="page.body" :value="page" />
                <USeparator v-if="surround?.length" class="my-12" />
                <UContentSurround :surround="surround" />
            </article>
            <aside v-if="page.body?.toc?.links?.length" class="h26-prose hidden lg:block">
                <UContentToc :title="t('toc')" :links="page.body.toc.links" class="sticky top-24" />
            </aside>
        </div>
    </div>
</template>

<i18n lang="yaml">
en:
    toc: "Table of Contents"
fr:
    toc: "Table des Matières"
</i18n>
