<script setup lang="ts">
// import type { module } from '~/types'

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

const { data: module } = await useAsyncData(path_without_locale.path, () => queryContent(`/${locale.value}/modules/${slug}`).findOne())

if (!module.value) {
  throw createError({ statusCode: 404, statusMessage: 'module not found', fatal: true })
}

// const title = module.value.head?.title || module.value.title
// const description = module.value.head?.description || module.value.description
// useSeoMeta({
//   titleTemplate: '%s · Nuxt Agencies',
//   title,
//   description,
//   ogDescription: description,
//   ogTitle: `${title} · Nuxt Agencies`
// })

</script>

<template>

  <UPage>
    <UPageHeader :ui="{ wrapper: 'border-none bg-green-400/5' }">
      <div class="absolute top-[24px] left-[12px] hidden lg:flex">
        <UTooltip :text="t('back_button')">
          <UButton :to="localePath('/modules')" icon="i-ph-caret-left" color="gray" :ui="{ rounded: 'rounded-full' }"
            size="lg" class="" />
        </UTooltip>
      </div>

    </UPageHeader>
    <UPageBody prose class="prose-lg dark:text-gray-300 mt-0">
      <ULandingHero :links="module.hero.links" orientation="vertical"
        :ui="{ wrapper: 'pt-0 sm:pt-0 md:pt-0 bg-gradient-to-b from-green-400/5 from-90%' }" v-if="module.hero">
        <template #headline>
          <UBadge v-if="module.hero.headline" :color="module.hero.headline.color || 'green'"
            :variant="module.hero.headline.variant || 'subtle'" size="lg" class="relative rounded-full font-semibold">
            <UIcon v-if="module.hero.headline.left_icon" :name="module.hero.headline.left_icon"
              class="mr-1 w-4 h-4 pointer-events-none" />
            <NuxtLink :to="module.hero.headline.to" :target="module.hero.headline.target || '_self'" class="focus:outline-none" tabindex="-1">
              <span class="absolute inset-0" aria-hidden="true" />
            </NuxtLink>

            {{ module.hero.headline.label }}

            <UIcon v-if="module.hero.headline.right_icon" :name="module.hero.headline.right_icon"
              class="ml-1 w-4 h-4 pointer-events-none" />
          </UBadge>
        </template>

        <template #title>
          <span v-html="module.hero.title"></span>
        </template>

        <template #description>
          <span v-html="module.hero.description"></span>
        </template>
      </ULandingHero>

      <ULandingSection v-for="(feat, index) in module.features" :key="index" v-bind="feat" :ui="{ title: 'mt-2' }"
        v-if="module.features">
        <template #headline>
          <UBadge v-if="feat.headline" :color="feat.headline.color || 'green'"
            :variant="feat.headline.variant || 'subtle'" size="lg" class="relative rounded-full font-semibold">
            <UIcon v-if="feat.headline.left_icon" :name="feat.headline.left_icon"
              class="mr-1 w-4 h-4 pointer-events-none" />
            <NuxtLink :to="feat.headline.to" target="_blank" class="focus:outline-none" tabindex="-1">
              <span class="absolute inset-0" aria-hidden="true" />
            </NuxtLink>

            {{ feat.headline.label }}

            <UIcon v-if="feat.headline.right_icon" :name="feat.headline.right_icon"
              class="ml-1 w-4 h-4 pointer-events-none" />
          </UBadge>
        </template>
        <NuxtImg :src="'/home/' + feat.image" class="w-full rounded-md bg-white/75" placeholder v-if="feat.image" />
        <Placeholder v-else />
      </ULandingSection>

      <ULandingSection v-bind="module.bottom_section">
        <ULandingGrid v-if="module.bottom_section.cards">
          <ULandingCard v-for="(feat, index) in module.bottom_section.cards" :key="index" v-bind="feat"/>
        </ULandingGrid>

        <UButton v-bind="module.plus_button" class="max-w-fit mx-auto" v-if="module.plus_button" />
      </ULandingSection>

      <UContainer>
        <ULandingCTA v-bind="module.bottom_cta" :class="module.bottom_cta.class" v-if="module.bottom_cta" />
      </UContainer>
    </UPageBody>
  </UPage>
</template>

<i18n lang="yaml">
  en:
    back_button: "Back to modules"
    modules: Applications
    website: Website
    useful_links: Liens utiles
    resources: Resources
  fr:
    back_button: "Retour aux modules"
    modules: Applications
    website: Site web
    useful_links: Liens utiles
    resources: Ressources
</i18n>