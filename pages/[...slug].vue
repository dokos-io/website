<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'

const route = useRoute()
const {
    params: { slug },
} = useRoute();
const { locale } = useI18n()

const { data: page } = await useAsyncData(route.path, () => queryContent(`/${locale.value}/${(slug as string[]).join("/")}` ).findOne())
if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => queryContent(`/${locale.value}`)
    .where({ _extension: 'md', navigation: { $ne: false } })
    .only(['title', 'description', '_path'])
    .findSurround(`/${locale.value}`)
    , { default: () => [] })

useSeoMeta({
    title: page.value.title,
    ogTitle: page.value.title,
    description: page.value.description,
    ogDescription: page.value.description
})

defineOgImage({
    component: 'Saas',
    title: page.value.title,
    description: page.value.description
})

const { t } = useI18n({
  useScope: 'local'
})

const headline = computed(() => findPageHeadline(page.value!))
</script>

<template>
    <UContainer>
        <UPage v-if="page">
            <UPageHeader :title="page.title" :links="page.links" :headline="headline" v-if="page.title">
                <template #description>
                    <span v-html="page.description" />
                </template>
            </UPageHeader>
            <UPageBody prose>
                <ContentRenderer v-if="page.body" :value="page" />

                <hr v-if="surround?.length">

                <UContentSurround :surround="surround" />
            </UPageBody>

            <template v-if="page.toc === true" #right>
                <UContentToc :title="t('toc')" :links="page.body?.toc?.links" />
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