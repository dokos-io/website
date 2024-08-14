<script setup lang="ts">

const { locale } = useI18n()

const { data: page } = await useAsyncData('pricing', () => queryContent(`/${locale.value}/pricing`).findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})

defineOgImage({
  component: 'Saas',
  title: page.value.title,
  description: page.value.description
})

const isYearly = ref(false)
</script>

<template>
  <div v-if="page">
    <UPageHero v-bind="page.hero">
      <!-- <template #links>
        <UPricingToggle v-model="isYearly" class="w-48" />
      </template> -->
    </UPageHero>

    <UContainer>
      <UPricingGrid :ui="{wrapper: 'lg:grid-cols-4'}">
        <UPricingCard v-for="(plan, index) in page.plans" :key="index" v-bind="plan" :price="isYearly ? plan.price.year : plan.price.month" :cycle="isYearly ? '/year' : '/month'" />
      </UPricingGrid>
    </UContainer>

    <ULandingSection>
      <ULandingLogos :title="page.logos.title" :ui="{images: 'justify-center'}">
        <UIcon v-for="icon in page.logos.icons" :key="icon" :name="icon" class="w-12 h-12 flex-shrink-0 text-gray-500 dark:text-gray-400" />
      </ULandingLogos>
    </ULandingSection>

    <ULandingSection class="bg-gradient-to-b from-gray-50 dark:from-gray-950/50 to-white dark:to-gray-900 relative">
      <ULandingGrid>
        <ULandingCard :title="page.services.title" :description="page.services.description" :icon="page.services.icon" :to="page.services.to" :target="page.services.target" class="col-span-6 row-span-2" />
        <ULandingCard :title="page.selfhost.title" :description="page.selfhost.description" :icon="page.selfhost.icon" :to="page.selfhost.to" :target="page.selfhost.target" class="col-span-6 row-span-2" />
      </ULandingGrid>
    </ULandingSection>

    <ULandingSection :title="page.faq.title" :description="page.faq.description">
      <ULandingFAQ :items="page.faq.items" multiple class="max-w-4xl mx-auto" />
    </ULandingSection>
  </div>
</template>
