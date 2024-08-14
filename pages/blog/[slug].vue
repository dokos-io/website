<script setup lang="ts">
import { withoutTrailingSlash, joinURL } from 'ufo'
import type { BlogPost } from '~/types'

const route = useRoute();
const {
  params: { slug },
} = useRoute();
const { locale } = useI18n()

const { data: post } = await useAsyncData(`/${locale.value}/blog/${slug}`, () => queryContent<BlogPost>(`/${locale.value}/blog/${slug}`).findOne())
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

const { data: surround } = await useAsyncData(`/${locale.value}/blog/${slug}-surround`, () => queryContent(`/${locale.value}/blog`)
  .where({ _extension: 'md' })
  .without(['body', 'excerpt'])
  .sort({ date: -1 })
  .findSurround(`/${locale.value}/blog/${slug}`)
, { default: () => [] })

const title = post.value.head?.title || post.value.title
const description = post.value.head?.description || post.value.description
const language = locale.value

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
})

if (post.value.image?.src) {
  const site = useSiteConfig()

  useSeoMeta({
    ogImage: joinURL(site.url, post.value.image.src),
    twitterImage: joinURL(site.url, post.value.image.src)
  })
} else {
  defineOgImage({
    component: 'Saas',
    title,
    description,
    headline: 'Blog'
  })
}
</script>

<template>
  <UContainer v-if="post">
    <UPageHeader :title="post.title" :description="post.description">
      <template #headline>
        <UBadge v-bind="post.badge" variant="subtle" />
        <span class="text-gray-500 dark:text-gray-400">&middot;</span>
        <time class="text-gray-500 dark:text-gray-400">{{ new Date(post.date).toLocaleDateString(language, { year: 'numeric', month: 'short', day: 'numeric' }) }}</time>
      </template>

      <div class="flex flex-wrap items-center gap-3 mt-4">
        <UButton
          v-for="(author, index) in post.authors"
          :key="index"
          :to="author.to"
          color="white"
          target="_blank"
          size="sm"
        >
          <UAvatar v-bind="author.avatar" :alt="author.name" size="2xs" />

          {{ author.name }}
        </UButton>
      </div>
    </UPageHeader>

    <UPage>
      <UPageBody prose>
        <ContentRenderer v-if="post && post.body" :value="post" />

        <hr v-if="surround?.length">

        <UContentSurround :surround="surround" />
      </UPageBody>

      <template #right>
        <UContentToc v-if="post.body && post.body.toc" :links="post.body.toc.links" />
      </template>
    </UPage>
  </UContainer>
</template>
