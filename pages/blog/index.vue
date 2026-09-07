<script setup lang="ts">
const { locale } = useI18n();
const { data: page } = await useAsyncData<any>("blog", () =>
    queryCollection("pages").path(`/${locale.value}/blog`).first()
);
if (!page.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "Page not found",
        fatal: true,
    });
}

const { data: posts } = await useAsyncData<any>("posts", () =>
    queryCollection("blog").order("date", "DESC").all()
);

useSeoMeta({
    title: page.value.title,
    ogTitle: page.value.title,
    description: page.value.description,
    ogDescription: page.value.description,
});

defineOgImage("OgImageSaas" as any, {
    title: page.value.title,
    description: page.value.description,
});
</script>

<template>
    <UContainer>
        <UPageHeader
            :title="page?.title"
            :description="page?.description"
            class="py-[50px]"
        />

        <UPageBody>
            <UBlogPosts>
                <UBlogPost
                    v-for="(post, index) in posts"
                    :key="index"
                    :to="post.path"
                    :title="post.title"
                    :description="post.description"
                    :image="post.image as any"
                    :date="
                        post.date
                            ? new Date(post.date).toLocaleDateString(locale, {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                              })
                            : undefined
                    "
                    :authors="post.authors as any"
                    :badge="post.badge as any"
                    :orientation="index === 0 ? 'horizontal' : 'vertical'"
                    :class="[index === 0 && 'col-span-full']"
                    :ui="{ description: 'line-clamp-2' }"
                />
            </UBlogPosts>
        </UPageBody>
    </UContainer>
</template>
