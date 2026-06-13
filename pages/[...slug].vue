<script setup lang="ts">
const route = useRoute()
const {
    params: { slug },
} = useRoute()

const { t, locale } = useI18n({
    useScope: "local",
})

const path = `/${locale.value}/${(slug as string[]).join("/")}`

const { data: page } = await useAsyncData<any>(route.path, () =>
    queryCollection("pages").path(path).first()
)
if (!page.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "Page not found",
        fatal: true,
    })
}

const { data: surround } = await useAsyncData<any>(
    `${route.path}-surround`,
    () =>
        queryCollectionItemSurroundings("pages", path, {
            fields: ["title", "description", "path"],
        }),
    { default: () => [] }
)

useSeoMeta({
    title: page.value.title,
    ogTitle: page.value.title,
    description: page.value.description,
    ogDescription: page.value.description,
})

defineOgImage("OgImageSaas" as any, {
    title: page.value.title,
    description: page.value.description,
})
</script>

<template>
    <UContainer>
        <UPage v-if="page">
            <UPageHeader
                v-if="page.title"
                :title="page.title"
                :links="(page as any).links"
            >
                <template #description>
                    <span v-html="page.description" />
                </template>
            </UPageHeader>
            <UPageBody prose>
                <ContentRenderer v-if="page.body" :value="page" />

                <USeparator v-if="surround?.length" />

                <UContentSurround :surround="surround" />
            </UPageBody>

            <template v-if="page.body?.toc?.links?.length" #right>
                <UContentToc :title="t('toc')" :links="page.body.toc.links" />
            </template>
        </UPage>
    </UContainer>
</template>

<i18n lang="yaml">
en:
    toc: "Table of Contents"
fr:
    toc: "Table des Matières"
</i18n>
