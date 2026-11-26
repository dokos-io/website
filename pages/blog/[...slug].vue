<script setup lang="ts">
import { joinURL } from 'ufo'

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

useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
})

const image = post.value.image as { src?: string } | undefined

if (image?.src) {
    const site = useSiteConfig()

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
        <Landing2026Header :title="post.title" :description="post.description" kicker-to="/fr/blog">
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
                <UContentSurround :surround="surround" />
            </article>
            <aside v-if="post.body?.toc?.links?.length" class="h26-prose hidden lg:block">
                <UContentToc :links="post.body.toc.links" class="sticky top-24" />
            </aside>
        </div>
    </div>
</template>
