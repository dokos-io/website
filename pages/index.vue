<script setup lang="ts">

const { locale } = useI18n()

const { data: page } = await useAsyncData('index', () => queryContent('/').where({ _locale: locale.value, _path: `/` }).findOne())

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  titleTemplate: '',
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})
</script>

<template>
  <div v-if="page">
    <ULandingHero :title="page.hero.title" :description="page.hero.description" :links="page.hero.links" orientation="horizontal" :ui="{ base: 'relative z-[1]', container: 'max-w-4xl' }" class="mb-[calc(var(--header-height)*2)]">
        <template #headline>
        <UBadge v-if="page.hero.headline" variant="subtle" size="lg" class="relative rounded-full font-semibold">
          <NuxtLink :to="page.hero.headline.to" target="_blank" class="focus:outline-none" tabindex="-1">
            <span class="absolute inset-0" aria-hidden="true" />
          </NuxtLink>

          {{ page.hero.headline.label }}

          <UIcon v-if="page.hero.headline.icon" :name="page.hero.headline.icon" class="ml-1 w-4 h-4 pointer-events-none" />
        </UBadge>
      </template>

      <template #default>
        <ULandingGrid>
          <UDashboardCard
            v-for="(card, index) in page.hero.cards"
            class="col-span-6 row-span-2 z-10"
            :title="card.title"
            :description="card.description"
            :icon="card.icon"
            :links="card.links"
          />
        </ULandingGrid>
        <ClientOnly>
          <HomeTetris />
        </ClientOnly>
      </template>

    </ULandingHero>

    <ULandingSection>
      <template #title>
        <span v-html="page.presentation.title" />
      </template>
      <ULandingGrid>
        <ULandingCard
          v-for="(feature, index) in page.presentation.features"
          class="col-span-6 row-span-2"
          :icon="feature.icon"
          :title="feature.title"
          :description="feature.description"
        />
      </ULandingGrid>
    </ULandingSection>

    <ULandingSection
      v-for="(section, index) in page.sections"
      :key="index"
      :title="section.title"
      :description="section.description"
      :align="section.align"
      :features="section.features"
      :links="section.links"
    >
      <Placeholder />
    </ULandingSection>

    <ULandingSection :title="page.features.title" :description="page.features.description">
      <UPageGrid>
        <ULandingCard v-for="(item, index) in page.features.items" :key="index" v-bind="item" />
      </UPageGrid>
    </ULandingSection>

    <ULandingSection :headline="page.testimonials.headline" :title="page.testimonials.title" :description="page.testimonials.description">
      <UPageColumns class="xl:columns-4">
        <div v-for="(testimonial, index) in page.testimonials.items" :key="index" class="break-inside-avoid">
          <ULandingTestimonial v-bind="testimonial" class="bg-gray-100/50 dark:bg-gray-800/50" />
        </div>
      </UPageColumns>
    </ULandingSection>

    <ULandingSection>
      <ULandingCTA v-bind="page.cta" class="bg-gray-100/50 dark:bg-gray-800/50" />
    </ULandingSection>
  </div>
</template>
