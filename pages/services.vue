<script setup lang="ts">
const { locale } = useI18n();

const { data: page } = await useAsyncData<any>("services", () =>
    queryCollection("pages").path(`/${locale.value}/services`).first()
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
    <div v-if="page">
        <UPage>
            <UPageHero
                v-if="page.hero"
                v-bind="page.hero"
                class="pb-12 sm:pb-24 md:pb-32"
            >
                <template #title>
                    <span v-html="page.hero.title"></span>
                </template>
                <template #default>
                    <ClientOnly>
                        <HomeTetris />
                    </ClientOnly>
                </template>
            </UPageHero>

            <UPageSection class="py-6 sm:py-12 md:py-16">
                <div
                    class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-8"
                >
                    <UCard
                        v-for="(card, index) in page.cards"
                        :key="index"
                        :ui="{
                            header: card.color + ' rounded-t-xl',
                            root: 'text-center',
                        }"
                    >
                        <template #header>
                            <p
                                class="text-gray-900 dark:text-white text-base font-semibold truncate gap-1.5"
                            >
                                {{ card.title }}
                            </p>
                        </template>

                        <template #footer>
                            <div
                                class="text-[15px] text-gray-500 dark:text-gray-400 mt-1 mb-6"
                            >
                                {{ card.description }}
                            </div>
                            <UButton v-bind="card.button" />
                        </template>
                    </UCard>
                </div>
            </UPageSection>

            <UPageSection v-if="page.faq">
                <UPageAccordion :items="page.faq.items" type="multiple">
                    <template #body="{ item }">
                        <MDC
                            :value="(item as any).content || ''"
                            class="prose prose-primary dark:prose-invert max-w-none text-gray-500 dark:text-gray-400"
                        />
                    </template>
                </UPageAccordion>
            </UPageSection>
        </UPage>
    </div>
</template>
