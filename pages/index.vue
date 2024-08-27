<script setup lang="ts">

const { locale } = useI18n()

const { data: page } = await useAsyncData('index', () => queryContent(`/${locale.value}`).findOne())

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
    <ULandingHero :links="page.hero.links" orientation="vertical"
      :ui="{ base: 'relative z-[1]', container: 'max-w-4xl' }" class="mb-[calc(var(--header-height)*2)]">
      <template #headline>
        <UBadge v-if="page.hero.headline" variant="subtle" size="lg" class="relative rounded-full font-semibold">
          <UIcon v-if="page.hero.headline.left_icon" :name="page.hero.headline.left_icon" class="mr-1 w-4 h-4 pointer-events-none" />
          <NuxtLink :to="page.hero.headline.to" target="_blank" class="focus:outline-none" tabindex="-1">
            <span class="absolute inset-0" aria-hidden="true" />
          </NuxtLink>

          {{ page.hero.headline.label }}

          <UIcon v-if="page.hero.headline.right_icon" :name="page.hero.headline.right_icon"
            class="ml-1 w-4 h-4 pointer-events-none" />
        </UBadge>
      </template>

      <template #title>
        <span v-html="page.hero.title"></span>
      </template>

      <template #description>
        <span v-html="page.hero.description"></span>
      </template>

      <template #default>
        <ULandingGrid>
          <UDashboardCard v-for="(card, index) in page.hero.cards" class="col-span-3 row-span-2 z-10"
            :title="card.title" :description="card.description" :icon="card.icon" :links="card.links" />
        </ULandingGrid>

        <ClientOnly>
          <HomeTetris />
        </ClientOnly>
      </template>

    </ULandingHero>

    <ULandingSection>
      <ULandingLogos :title="page.integrations.title" :ui="{ images: 'justify-center' }">
          <UIcon v-for="icon in page.integrations.icons" :key="icon" :name="icon"
            class="w-10 h-10 flex-shrink-0 text-gray-500 dark:text-gray-400" />
          <NuxtImg v-for="image in page.integrations.images" :key="image" :src="image" class="max-h-10" />
        </ULandingLogos>
    </ULandingSection>

    <ULandingSection>
      <template #title>
        <span v-html="page.features.title" />
      </template>
      <template #description>
        <span v-html="page.features.description" />
      </template>
      <UPageGrid :ui="{ wrapper: 'sm:grid-cols-3 xl:grid-cols-4' }">
        <ULandingCard v-for="(item, index) in page.features.items" :key="index" v-bind="item" orientation="vertical" />
      </UPageGrid>
    </ULandingSection>


    <ULandingSection v-for="(section, index) in page.sections" :key="index" :align="section.align"
      :features="section.features" :links="section.links">
      <template #title>
        <span v-html="section.title" />
      </template>
      <template #description>
        <span v-html="section.description" />
      </template>
      <NuxtImg :src="section.image" />
    </ULandingSection>

    <ULandingSection :links="page.applications.links">
      <template #title>
        <span v-html="page.applications.title" />
      </template>
      <template #description>
        <span v-html="page.applications.description" />
      </template>
      <ULandingGrid>
        <ULandingCard class="col-span-4 row-span-3" v-for="(item, index) in page.applications.items" :key="index"
          v-bind="item">
          <template #icon>
            <NuxtImg :src="'/frappe/' + item.icon" class="max-h-10" />
          </template>
        </ULandingCard>
      </ULandingGrid>
    </ULandingSection>

    <ULandingSection>
      <ULandingCTA v-bind="page.cta" class="bg-gray-100/50 dark:bg-gray-800/50" />
    </ULandingSection>
  </div>
</template>
