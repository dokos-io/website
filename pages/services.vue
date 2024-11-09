<script setup lang="ts">
const { locale } = useI18n();

const { data: page } = await useAsyncData("services", () =>
    queryContent(`/${locale.value}/services`).findOne()
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

defineOgImage({
  component: 'Saas',
  title: page.value.title,
  description: page.value.description
})
</script>

<template>
    <div v-if="page">
        <UPage>
                <ULandingHero v-bind="page.hero" v-if="page.hero" class="pb-12 sm:pb-24 md:pb-32">
                    <template #title>
                        <span v-html="page.hero.title"></span>
                    </template>
                    <template #default>
                        <ClientOnly>
                            <HomeTetris />
                        </ClientOnly>
                    </template>
                </ULandingHero>

                <ULandingSection class="py-12 sm:py-24 md:py-32">
                    <UPageGrid
                        :ui="{
                            wrapper:
                                'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-8',
                        }"
                    >
                        <UCard
                            v-for="(card, index) in page.cards"
                            :key="index"
                            v-bind="card"
                            target="_blank"
                            :ui="{
                                header: { base: card.color + ' rounded-t-xl' },
                                base: 'text-center',
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
                    </UPageGrid>
                </ULandingSection>

                <ULandingSection :v-bind="page.faq" v-if="page.faq">
                    <ULandingFAQ
                        :items="page.faq.items"
                        multiple
                        :class="page.faq"
                    />
                </ULandingSection>
        </UPage>
    </div>
</template>