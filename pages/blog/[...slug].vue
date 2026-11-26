<script setup lang="ts">
import { joinURL } from 'ufo'
import { canonicalPath } from '#shared/canonical-path.mjs'

// French only: no /en/ copy of this page is generated (no hreflang to a
// French text under lang="en").
defineI18nRoute({ locales: ['fr'] })
// 2026 design: cream header and footer, light only.
definePageMeta({ design2026: true, colorMode: 'light' })

const {
    params: { slug },
} = useRoute()
const { locale } = useI18n()

const path = `/${locale.value}/blog/${(slug as string[]).join('/')}`

const { data: post } = await useAsyncData<any>(path, () =>
    queryCollection('blog').path(path).first()
)
if (!post.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Post not found',
        fatal: true,
    })
}

const { data: surround } = await useAsyncData<any>(
    `${path}-surround`,
    () =>
        queryCollectionItemSurroundings('blog', path, {
            fields: ['title', 'description', 'path', 'date'],
        }),
    { default: () => [] }
)

const title = post.value.title
const description = post.value.description
const language = locale.value

// Posts carry `author:` (a name) outside the collection schema, so Content
// keeps it under `meta`; a few carry `authors:` (a list of { name }).
const authorNames: string[] = post.value.authors?.length
    ? (post.value.authors as { name?: string }[]).map(a => a.name).filter((n): n is string => !!n)
    : [post.value.meta?.author].filter(Boolean)

useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
    ogType: 'article',
    articlePublishedTime: post.value.date,
    articleAuthor: authorNames,
    author: authorNames.join(', ') || undefined,
})

const image = post.value.image as { src?: string } | undefined
const site = useSiteConfig()

useHead({
    script: [{
        key: 'ld-article',
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: title,
            description,
            datePublished: post.value.date,
            inLanguage: 'fr-FR',
            url: joinURL(site.url, canonicalPath(path)),
            image: image?.src ? joinURL(site.url, image.src) : undefined,
            author: authorNames.map(name => ({ '@type': 'Person', name })),
            publisher: { '@id': `${site.url}/#organization` },
        }),
    }],
})

if (image?.src) {
    useSeoMeta({
        ogImage: joinURL(site.url, image.src),
        twitterImage: joinURL(site.url, image.src),
    })
} else {
    defineOgImage('OgImageSaas' as any, {
        title,
        description,
        headline: 'Blog',
    })
}
</script>

<template>
    <div v-if="post" class="h26 overflow-x-clip bg-paper text-dokos-500">
        <Landing2026Header :title="post.title" :description="post.description" kicker-to="/blog">
            <template #kicker>
                ← Blog<template v-if="post.badge?.label"> · {{ post.badge.label }}</template><template v-if="post.date"> · {{ new Date(post.date).toLocaleDateString(language, { year: 'numeric', month: 'long', day: 'numeric' }) }}</template>
            </template>
            <div v-if="post.authors?.length" class="flex flex-wrap items-center gap-4">
                <component
                    :is="author.to ? 'a' : 'span'"
                    v-for="(author, index) in (post.authors as any[])"
                    :key="index"
                    :href="author.to"
                    target="_blank"
                    class="flex items-center gap-2 font-bold"
                >
                    <UAvatar v-bind="author.avatar" :alt="author.name" size="sm" />
                    {{ author.name }}
                </component>
            </div>
        </Landing2026Header>

        <div class="mx-auto grid max-w-[1360px] gap-12 px-4 pb-24 sm:px-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
            <article class="h26-prose min-w-0 max-w-3xl">
                <ContentRenderer v-if="post.body" :value="post" />
                <USeparator v-if="surround?.length" class="my-12" />
                <UContentSurround :surround="surround?.map((item: any) => item && { ...item, path: canonicalPath(item.path) })" />
            </article>
            <aside v-if="post.body?.toc?.links?.length" class="h26-prose hidden lg:block">
                <UContentToc :links="post.body.toc.links" class="sticky top-24" />
            </aside>
        </div>
    </div>
</template>
