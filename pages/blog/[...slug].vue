<script setup lang="ts">
import { joinURL } from "ufo";

const {
    params: { slug },
} = useRoute();
const { locale } = useI18n();

const path = `/${locale.value}/blog/${(slug as string[]).join("/")}`;

const { data: post } = await useAsyncData<any>(path, () =>
    queryCollection("blog").path(path).first()
);
if (!post.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "Post not found",
        fatal: true,
    });
}

const { data: surround } = await useAsyncData<any>(
    `${path}-surround`,
    () =>
        queryCollectionItemSurroundings("blog", path, {
            fields: ["title", "description", "path", "date"],
        }),
    { default: () => [] }
);

const title = post.value.title;
const description = post.value.description;
const language = locale.value;

useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
});

const image = post.value.image as { src?: string } | undefined;

if (image?.src) {
    const site = useSiteConfig();

    useSeoMeta({
        ogImage: joinURL(site.url, image.src),
        twitterImage: joinURL(site.url, image.src),
    });
} else {
    defineOgImage("OgImageSaas" as any, {
        title,
        description,
        headline: "Blog",
    });
}
</script>

<template>
    <UContainer v-if="post">
        <UPageHeader :title="post.title" :description="post.description">
            <template #headline>
                <UBadge v-if="post.badge" v-bind="post.badge" variant="subtle" />
                <span class="text-gray-500 dark:text-gray-400">&middot;</span>
                <time v-if="post.date" class="text-gray-500 dark:text-gray-400">{{
                    new Date(post.date).toLocaleDateString(language, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })
                }}</time>
            </template>

            <div v-if="post.authors?.length" class="flex flex-wrap items-center gap-3 mt-4">
                <UButton
                    v-for="(author, index) in (post.authors as any[])"
                    :key="index"
                    :to="author.to"
                    color="neutral"
                    variant="outline"
                    target="_blank"
                    size="sm"
                >
                    <UAvatar
                        v-bind="author.avatar"
                        :alt="author.name"
                        size="2xs"
                    />

                    {{ author.name }}
                </UButton>
            </div>
        </UPageHeader>

        <UPage>
            <UPageBody prose>
                <ContentRenderer v-if="post && post.body" :value="post" />

                <USeparator v-if="surround?.length" />

                <UContentSurround :surround="surround" />
            </UPageBody>

            <template #right>
                <UContentToc
                    v-if="post.body && post.body.toc"
                    :links="post.body.toc.links"
                />
            </template>
        </UPage>
    </UContainer>
</template>
