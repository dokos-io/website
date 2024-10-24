<script setup lang="ts">

const { locale } = useI18n()

const { data: page } = await useAsyncData('production-companies', () => queryContent(`/${locale.value}/production-companies`).findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})

// defineOgImage({
//   component: 'Saas',
//   title: page.value.title,
//   description: page.value.description
// })
</script>

<template>
  <div v-if="page">
    <UPage>
      <UPageBody>
        <UContainer>
          <ULandingHero :links="page.hero.links" orientation="vertical" :ui="{ base: 'relative z-[1]' }">
            <template #headline>
              <UBadge v-if="page.hero.headline" variant="subtle" size="lg" class="relative rounded-full font-semibold">
                <UIcon v-if="page.hero.headline.left_icon" :name="page.hero.headline.left_icon"
                  class="mr-1 w-4 h-4 pointer-events-none" />
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
              <NuxtImg :src="'/home/' + page.hero.image" class="w-full rounded-md bg-white/75" v-if="page.hero.image" />
              <Placeholder v-else />

            </template>
          </ULandingHero>

          <ULandingSection>
            <ULandingLogos :title="page.logos.title" :ui="{ images: 'justify-center' }">
              <UIcon v-for="icon in page.logos.icons" :key="icon" :name="icon"
                class="w-16 h-16 flex-shrink-0 text-gray-500 dark:text-gray-400" />
              <NuxtImg v-for="image in page.logos.images" :key="image" :src="image" class="max-h-20" />
            </ULandingLogos>
          </ULandingSection>

          <ULandingSection v-bind="page.colored_section" v-if="page.colored_section"
            :ui="{ container: 'bg-blue-950 rounded-3xl p-5', title: 'mt-2 text-orange-200', description: 'text-white' }">
            <template #headline>
              <UBadge v-if="page.colored_section.badge" :variant="page.colored_section.badge.variant || 'subtle'"
                :size="page.colored_section.badge.size || 'lg'" :color="page.colored_section.badge.color || 'primary'"
                class="relative rounded-full font-semibold">
                <UIcon v-if="page.colored_section.badge.left_icon" :name="page.colored_section.badge.left_icon"
                  class="mr-1 w-4 h-4 pointer-events-none" />
                <NuxtLink :to="page.colored_section.badge.to" target="_blank" class="focus:outline-none" tabindex="-1">
                  <span class="absolute inset-0" aria-hidden="true" />
                </NuxtLink>

                {{ page.colored_section.badge.label }}

                <UIcon v-if="page.colored_section.badge.right_icon" :name="page.colored_section.badge.right_icon"
                  class="ml-1 w-4 h-4 pointer-events-none" />
              </UBadge>
            </template>

            <div class="py-8 rounded-lg"
              :class="[page.colored_section.image_bg_color, page.colored_section.align == 'left' ? 'pl-8' : 'pr-8']"
              v-if="page.colored_section.image">
              <NuxtImg :src="page.colored_section.image" class="shadow-lg"
                :class="page.colored_section.align == 'left' ? 'rounded-s-lg' : 'rounded-e-lg'" />
            </div>
            <Placeholder v-else class="bg-orange-200" />
          </ULandingSection>


          <ULandingSection v-for="(section, index) in page.sections" :key="index" v-bind="section">
            <template #title>
              <span v-html="section.title" />
            </template>
            <template #description>
              <span v-html="section.description" />
            </template>
            <div class="py-8 rounded-lg" :class="[section.image_bg_color, section.align == 'left' ? 'pl-8' : 'pr-8']"
              v-if="section.image">
              <NuxtImg :src="section.image" class="shadow-lg"
                :class="section.align == 'left' ? 'rounded-s-lg' : 'rounded-e-lg'" />
            </div>
            <Placeholder v-else />
          </ULandingSection>

          <ULandingSection v-bind="page.carousel" v-if="page.carousel">
            <UCarousel v-slot="{ item }" :items="page.carousel"
              :ui="{ item: 'w-full', container: 'rounded-3xl bg-sky-50' }" indicators>
              <div class="text-center mx-auto">
                <h2><span v-html="item.title"></span></h2>
                <p class="pb-8"><span v-html="item.description"></span></p>
              </div>
            </UCarousel>
          </ULandingSection>

          <ULandingSection>
            <ULandingCTA v-bind="page.cta" class="bg-orange-100/50 dark:bg-orange-800/50" />
          </ULandingSection>
        </UContainer>
      </UPageBody>
    </UPage>
  </div>
</template>