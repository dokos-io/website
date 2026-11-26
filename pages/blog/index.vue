<script setup lang="ts">
import { canonicalPath } from '#shared/canonical-path.mjs'
// French only: no /en/ copy of this page is generated (no hreflang to a
// French text under lang="en").
defineI18nRoute({ locales: ['fr'] })
// 2026 design: cream header and footer, light only.
definePageMeta({ design2026: true, colorMode: 'light' })

const { locale } = useI18n()
const { data: page } = await useAsyncData<any>('blog', () =>
    queryCollection('pages').path(`/${locale.value}/blog`).first()
)
if (!page.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page not found',
        fatal: true,
    })
}

const { data: posts } = await useAsyncData<any>('posts', () =>
    queryCollection('blog').order('date', 'DESC').all()
)

useSeoMeta({
    title: page.value.title,
    ogTitle: page.value.title,
    description: page.value.description,
    ogDescription: page.value.description,
})

// A post's image is either a path or { src, alt }.
// Some paths are written without the leading slash.
const imageOf = (post: any): string | undefined => {
    const src: string | undefined = typeof post.image === 'string' ? post.image : post.image?.src
    return src && !/^(\/|https?:)/.test(src) ? `/${src}` : src
}

defineOgImage('OgImageSaas' as any, {
    title: page.value.title,
    description: page.value.description,
})
</script>

<template>
    <div class="h26 overflow-x-clip bg-paper text-dokos-500">
        <Landing2026Header :title="page?.title" :description="page?.description" />

        <!-- The latest post across the row, the others on white sheets in a grid. -->
        <section class="mx-auto grid max-w-[1360px] gap-8 px-4 pb-24 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
            <NuxtLink
                v-for="(post, index) in posts"
                :key="index"
                :to="canonicalPath(post.path)"
                class="h26-lift group flex flex-col bg-white shadow-[0_12px_30px_rgba(43,42,39,0.12)]"
                :class="index === 0 ? 'sm:col-span-2 lg:col-span-3 lg:flex-row' : ''"
            >
                <img
                    v-if="imageOf(post)"
                    :src="imageOf(post)"
                    :alt="post.image?.alt || ''"
                    class="aspect-video w-full object-cover"
                    :class="index === 0 ? 'lg:w-3/5' : ''"
                    loading="lazy"
                >
                <span class="flex flex-1 flex-col gap-3 p-6" :class="index === 0 ? 'lg:justify-center lg:p-10' : ''">
                    <span class="font-typed text-sm text-stone-600">
                        <template v-if="post.badge?.label">{{ post.badge.label }} · </template>
                        <time v-if="post.date">{{ new Date(post.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' }) }}</time>
                    </span>
                    <b
                        class="font-extrabold tracking-[-0.02em] group-hover:underline"
                        :class="index === 0 ? 'text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.05]' : 'text-2xl leading-tight'"
                    >{{ post.title }}</b>
                    <span class="line-clamp-3 leading-relaxed text-stone-600">{{ post.description }}</span>
                </span>
            </NuxtLink>
        </section>
    </div>
</template>
