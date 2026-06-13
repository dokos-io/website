<script setup lang="ts">
const { locale } = useI18n();

const { data: page } = await useAsyncData<any>("pricing", () =>
    queryCollection("pages").path(`/${locale.value}/pricing`).first()
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

defineOgImage("OgImageSaas" as any, {
    title: page.value.title,
    description: page.value.description,
});
</script>

<template>
    <div v-if="page">
        <UPageHero
            v-bind="page.hero"
            class="py-24 sm:py-32 md:py-40 pb-0 sm:pb-0 md:pb-0"
        >
            <template #title>
                <span v-html="page.hero.title" />
            </template>
            <template #default>
                <ClientOnly>
                    <HomeTetris />
                </ClientOnly>
            </template>
        </UPageHero>
        <UPageSection class="pt-0 sm:pt-0 md:pt-0" :links="page.links">
            <div class="mb-10 flex items-center justify-center gap-3">
                <span class="font-medium">{{ page.pricing_toggle.left }}</span>
                <USwitch v-model="isNgo" size="lg" />
                <span class="font-medium">{{ page.pricing_toggle.right }}</span>
            </div>
            <UPricingPlans :ui="{ root: 'lg:grid-cols-4' }">
                <UPricingPlan
                    v-for="(plan, index) in page.plans"
                    :key="index"
                    v-bind="plan"
                    :price="
                        isNgo ? plan.price.association : plan.price.entreprise
                    "
                />
            </UPricingPlans>
        </UPageSection>

        <UPageSection
            class="bg-gradient-to-b from-gray-50 dark:from-gray-950/50 to-white dark:to-gray-900 relative"
        >
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <UPageCard
                    :title="page.services.title"
                    :description="page.services.description"
                    :icon="page.services.icon"
                    :to="page.services.to"
                    :target="page.services.target"
                />
                <UPageCard
                    :title="page.selfhost.title"
                    :description="page.selfhost.description"
                    :icon="page.selfhost.icon"
                    :to="page.selfhost.to"
                    :target="page.selfhost.target"
                />
            </div>
        </UPageSection>

        <UPageSection
            v-if="page.faq"
            :title="page.faq.title"
            :description="page.faq.description"
        >
            <UPageAccordion
                :items="page.faq.items"
                type="multiple"
                class="max-w-4xl mx-auto"
            >
                <template #body="{ item }">
                    <MDC
                        :value="(item as any).content || ''"
                        class="prose prose-primary dark:prose-invert max-w-none text-gray-500 dark:text-gray-400"
                    />
                </template>
            </UPageAccordion>
        </UPageSection>

        <UPageSection v-if="page.cta">
            <UPageCTA
                v-bind="page.cta"
                class="bg-amber-100/50 dark:bg-amber-800/50"
            />
        </UPageSection>
    </div>
</template>
