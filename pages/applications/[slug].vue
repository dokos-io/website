<script setup lang="ts">
// import type { application } from '~/types'

const route = useRoute();

const {
  params: { slug },
} = useRoute();

const { t, locale } = useI18n({
  useScope: 'local'
})

const localePath = useLocalePath()

const path_without_locale = route
path_without_locale.path.replace(`/^(/${locale}\.)/,"")`, '')

const { data: application } = await useAsyncData(path_without_locale.path, () => queryContent(`/${locale.value}/applications/${slug}`).findOne())

if (!application.value) {
  throw createError({ statusCode: 404, statusMessage: 'application not found', fatal: true })
}

const title = application.value.head?.title || application.value.title
const description = application.value.head?.description || application.value.description
// useSeoMeta({
//   titleTemplate: '%s · Nuxt Agencies',
//   title,
//   description,
//   ogDescription: description,
//   ogTitle: `${title} · Nuxt Agencies`
// })

</script>

<template>
  <UContainer>
    <UPageHeader :ui="{ wrapper: 'border-none' }">
      <div class="absolute top-[68px] hidden lg:flex">
        <UTooltip :text="t('back_button')">
          <UButton :to="localePath('/applications')" icon="i-ph-caret-left" color="gray"
            :ui="{ rounded: 'rounded-full' }" size="lg" class="" />
        </UTooltip>
      </div>

    </UPageHeader>

    <UPage>
      <UPageBody prose class="prose-lg dark:text-gray-300">
        <ULandingHero :links="application.hero.links" orientation="vertical" :ui="{ wrapper: 'pt-0 sm:pt-0 md:pt-0' }"
          v-if="application.hero">
          <template #headline>
            <UBadge v-if="application.hero.headline" :variant="application.hero.headline.variant || 'subtle'"
              :size="application.hero.headline.size || 'lg'" :color="application.hero.headline.color || 'primary'"
              class="relative rounded-full font-semibold">
              <UIcon v-if="application.hero.headline.left_icon" :name="application.hero.headline.left_icon"
                class="mr-1 w-4 h-4 pointer-events-none" />
              <NuxtLink :to="application.hero.headline.to" target="_blank" class="focus:outline-none" tabindex="-1">
                <span class="absolute inset-0" aria-hidden="true" />
              </NuxtLink>

              {{ application.hero.headline.label }}

              <UIcon v-if="application.hero.headline.right_icon" :name="application.hero.headline.right_icon"
                class="ml-1 w-4 h-4 pointer-events-none" />
            </UBadge>
          </template>

          <template #title>
            <span v-html="application.hero.title"></span>
          </template>

          <template #description>
            <span v-html="application.hero.description"></span>
          </template>

          <template #default>
            <NuxtImg :src="application.hero.image" class="w-full rounded-md bg-white/75" placeholder
              v-if="application.hero.image" />
            <Placeholder v-else />
          </template>
        </ULandingHero>

        <ULandingSection v-bind="application.bridge_before_colored_section"
          v-if="application.bridge_before_colored_section" />

        <ULandingSection v-bind="application.features_before_colored_section"
          v-if="application.features_before_colored_section">
          <ULandingGrid>
            <ULandingCard v-for="(feat, index) in application.features_before_colored_section.cards" :key="index"
              v-bind="feat" v-if="application.features_before_colored_section.cards" />
          </ULandingGrid>
        </ULandingSection>

        <ULandingSection v-bind="application.colored_section" v-if="application.colored_section"
          :ui="{ container: 'bg-blue-950 rounded-3xl p-5', title: 'mt-2 text-green-500', description: 'text-white' }">
          <template #headline>
            <UBadge v-if="application.colored_section.badge"
              :variant="application.colored_section.badge.variant || 'subtle'"
              :size="application.colored_section.badge.size || 'lg'"
              :color="application.colored_section.badge.color || 'primary'" class="relative rounded-full font-semibold">
              <UIcon v-if="application.colored_section.badge.left_icon"
                :name="application.colored_section.badge.left_icon" class="mr-1 w-4 h-4 pointer-events-none" />
              <NuxtLink :to="application.colored_section.badge.to" target="_blank" class="focus:outline-none"
                tabindex="-1">
                <span class="absolute inset-0" aria-hidden="true" />
              </NuxtLink>

              {{ application.colored_section.badge.label }}

              <UIcon v-if="application.colored_section.badge.right_icon"
                :name="application.colored_section.badge.right_icon" class="ml-1 w-4 h-4 pointer-events-none" />
            </UBadge>
          </template>

          <div class="py-8 rounded-lg"
            :class="[application.colored_section.image_bg_color, application.colored_section.align == 'left' ? 'pl-8' : 'pr-8']"
            v-if="application.colored_section.image">
            <NuxtImg :src="application.colored_section.image" class="shadow-lg"
              :class="application.colored_section.align == 'left' ? 'rounded-s-lg' : 'rounded-e-lg'" />
          </div>
          <Placeholder v-else class="bg-green-500" />
        </ULandingSection>

        <ULandingSection v-for="(section, index) in application.main_features" :key="index" v-bind="section"
          v-if="application.main_features">
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

        <ULandingSection v-bind="application.bridge" v-if="application.bridge" />

        <ULandingSection v-bind="application.carousel" v-if="application.carousel">
          <UCarousel v-slot="{ item }" :items="application.carousel"
            :ui="{ item: 'w-full', container: 'rounded-3xl bg-sky-50' }" indicators>
            <div class="text-center mx-auto">
              <h2><span v-html="item.title"></span></h2>
              <p class="pb-8"><span v-html="item.description"></span></p>
            </div>
          </UCarousel>
        </ULandingSection>

        <ULandingSection v-bind="application.bridge_after_carousel" v-if="application.bridge_after_carousel" />

        <ULandingSection v-bind="application.features" v-if="application.features">
          <ULandingGrid>
            <ULandingCard v-for="(feat, index) in application.features.cards" :key="index" v-bind="feat"
              v-if="application.features.cards" />
          </ULandingGrid>
        </ULandingSection>

        <ULandingSection v-bind="application.bridge_after_features" v-if="application.bridge_after_features" />

        <ULandingCTA v-bind="application.bottom_cta" class="bg-sky-600/10 dark:bg-sky-800/10"
          v-if="application.bottom_cta" />
      </UPageBody>
    </UPage>
  </UContainer>
</template>

<i18n lang="yaml">
  en:
    back_button: "Back to applications"
    applications: Applications
    website: Website
    useful_links: Liens utiles
    resources: Resources
  fr:
    back_button: "Retour aux applications"
    applications: Applications
    website: Site web
    useful_links: Liens utiles
    resources: Ressources
</i18n>