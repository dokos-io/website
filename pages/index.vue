<script setup lang="ts">

const { locale } = useI18n()

const { data: page } = await useAsyncData('index', () => queryContent(`/${locale.value}`).findOne())

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const sorted_modules = computed(() => {
  return page.value.modules.items.sort((a, b) => a.title.localeCompare(b.title))
})

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
      :ui="{ base: 'relative z-[1]' }" class="mb-[calc(var(--header-height)*2)]">
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
        <NuxtImg
          :src="'/home/' + page.hero.image"
          class="w-full rounded-md bg-white/75"
        />

        <ClientOnly>
          <HomeTetris />
        </ClientOnly>
      </template>
    </ULandingHero>

    <ULandingSection>
      <UCard :ui="{body: {base: 'grid grid-cols-3 gap-4', padding: 'py-10 sm:py-20'}, background: 'bg-yellow-500/10', ring: 'ring-0'}">
          <div v-for="(item, index) in page.metrics.items" :key="index" class="flex-1">
            <div class="mb-6 flex">
              <UIcon :name="item.icon" class="w-10 h-10 flex-shrink-0 text-primary"/>
            </div>
            <p class="text-gray-900 dark:text-white text-base font-semibold truncate flex items-center gap-1.5">{{ item.title }}</p>
            <div class="text-[15px] text-gray-500 dark:text-gray-400 mt-1">{{ item.description }}</div>
          </div>
        </UCard>
    </ULandingSection>

    <ULandingSection v-for="(section, index) in page.sections" :key="index" v-bind="section">
      <template #title>
        <span v-html="section.title" />
      </template>
      <template #description>
        <span v-html="section.description" />
      </template>
      <div class="py-8 rounded-lg" :class="[section.image_bg_color, section.align == 'left' ? 'pl-8' : 'pr-8']" v-if="section.image">
        <NuxtImg :src="section.image" class="shadow-lg":class="section.align =='left' ? 'rounded-s-lg' : 'rounded-e-lg'"/>
      </div>
      <Placeholder v-else/>
    </ULandingSection>

    <ULandingSection>
      <ULandingLogos :title="page.integrations.title" :ui="{ images: 'justify-center' }">
          <UIcon v-for="icon in page.integrations.icons" :key="icon" :name="icon"
            class="w-16 h-16 flex-shrink-0 text-gray-500 dark:text-gray-400" />
          <NuxtImg v-for="image in page.integrations.images" :key="image" :src="image" class="max-h-20" />
        </ULandingLogos>
    </ULandingSection>

    <ULandingSection :ui="{wrapper: 'bg-green-400/10'}">
      <template #title>
        <span v-html="page.modules.title" />
      </template>
      <template #description>
        <span v-html="page.modules.description" />
      </template>
      <UPageGrid :ui="{ wrapper: 'sm:grid-cols-3 xl:grid-cols-4' }">
        <ULandingCard v-for="(item, index) in sorted_modules" :key="index" v-bind="item" orientation="vertical" />
      </UPageGrid>
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
