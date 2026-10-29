<script setup lang="ts">
const { locale } = useI18n();

const { data: page } = await useAsyncData<any>("contact", () =>
    queryCollection("pages").path(`/${locale.value}/contact`).first()
);
if (!page.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "Page not found",
        fatal: true,
    });
}

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
    <UPage v-if="page">
        <ClientOnly>
            <HomeTetris />
        </ClientOnly>
        <UPageSection
            class="z-10"
            :ui="{ container: 'gap-y-0 sm:gap-y-0' }"
        >
            <template #title>
                <span v-html="page.form.title"></span>
            </template>

            <template #description>
                <span v-html="page.form.description"></span>
            </template>
            <div class="pt-8 w-full flex justify-center">
                <ContactForm :form="page.form" />
            </div>
        </UPageSection>
        <UPageSection>
            <UPageGrid>
                <UPageCard
                    v-for="(info, index) in page.contact_info"
                    :key="index"
                    v-bind="info"
                    target="_blank"
                />
            </UPageGrid>
        </UPageSection>
    </UPage>
</template>
