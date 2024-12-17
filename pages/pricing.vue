<script setup lang="ts">
const { locale } = useI18n();

const { data: page } = await useAsyncData("pricing", () =>
    queryContent(`/${locale.value}/pricing`).findOne()
);
if (!page.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "Page not found",
        fatal: true,
    });
}

const isNgo = ref(false);

useSeoMeta({
    title: page.value.title,
    ogTitle: page.value.title,
    description: page.value.description,
    ogDescription: page.value.description,
});

defineOgImage({
    component: "Saas",
    title: page.value.title,
    description: page.value.description,
});
</script>

<template>
    <div v-if="page">
        <ULandingHero v-bind="page.hero" class="py-24 sm:py-32 md:py-40 pb-0 sm:pb-0 md:pb-0">
            <template #title>
                <span v-html="page.hero.title" />
            </template>
            <template #default>
                <ClientOnly>
                    <HomeTetris />
                </ClientOnly>
            </template>
        </ULandingHero>
        <ULandingSection class="pt-0 sm:pt-0 md:pt-0" :links="page.links">
            <div class="mb-10">
                <UPricingToggle
                    v-model="isNgo"
                    :left="page.pricing_toggle.left"
                    :right="page.pricing_toggle.right"
                    class="w-64 mx-auto bg-white"
                />
            </div>
            <UPricingGrid :ui="{ wrapper: 'lg:grid-cols-4' }">
                <UPricingCard
                    v-for="(plan, index) in page.plans"
                    :key="index"
                    v-bind="plan"
                    :price="
                        isNgo ? plan.price.association : plan.price.entreprise
                    "
                />
            </UPricingGrid>
        </ULandingSection>

        <ULandingSection
            class="bg-gradient-to-b from-gray-50 dark:from-gray-950/50 to-white dark:to-gray-900 relative"
        >
            <ULandingGrid>
                <ULandingCard
                    :title="page.services.title"
                    :description="page.services.description"
                    :icon="page.services.icon"
                    :to="page.services.to"
                    :target="page.services.target"
                    class="col-span-6 row-span-2"
                />
                <ULandingCard
                    :title="page.selfhost.title"
                    :description="page.selfhost.description"
                    :icon="page.selfhost.icon"
                    :to="page.selfhost.to"
                    :target="page.selfhost.target"
                    class="col-span-6 row-span-2"
                />
            </ULandingGrid>
        </ULandingSection>

        <ULandingSection
            :title="page.faq.title"
            :description="page.faq.description"
            v-if="page.faq"
        >
            <ULandingFAQ
                :items="page.faq.items"
                multiple
                class="max-w-4xl mx-auto"
            >
                <template #item="{ item }">
                    <MDC :value="item.content" class="prose prose-primary dark:prose-invert max-w-none text-gray-500 dark:text-gray-400" />
                </template>
            </ULandingFAQ>
        </ULandingSection>

        <ULandingSection v-if="page.cta">
            <ULandingCTA
                v-bind="page.cta"
                class="bg-amber-100/50 dark:bg-amber-800/50"
            />
        </ULandingSection>
    </div>
</template>
