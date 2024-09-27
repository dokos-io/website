<script setup lang="ts">
// import type { feature } from '~/types'

const route = useRoute();
const {
  params: { slug },
} = useRoute();
const { locale } = useI18n()

const localePath = useLocalePath()

const path_without_locale = route
path_without_locale.path.replace(`/^(/${locale}\.)/,"")`, '')

const { data: module } = await useAsyncData(path_without_locale.path, () => queryContent(`/${locale.value}/features/${slug}`).findOne())

if (!module.value) {
  throw createError({ statusCode: 404, statusMessage: 'feature not found', fatal: true })
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

const { t } = useI18n({
  useScope: 'local'
})

</script>

<template>
  <UContainer>
    <UPageHeader :ui="{wrapper: 'border-none'}">
      <div class="absolute top-[68px] hidden lg:flex">
        <UTooltip :text="t('back_button')">
          <UButton
            :to="localePath('/features')"
            icon="i-ph-caret-left"
            color="gray"
            :ui="{ rounded: 'rounded-full' }"
            size="lg"
            class=""
          />
        </UTooltip>
      </div>

    </UPageHeader>

    <UPage>
      <UPageBody prose class="prose-lg dark:text-gray-300">
        <ULandingHero :links="module.hero.links" orientation="vertical" :ui="{wrapper: 'pt-0 sm:pt-0 md:pt-0'}">
          <template #headline>
            <UBadge v-if="module.hero.headline" :color="module.hero.headline.color || 'green'" :variant="module.hero.headline.variant || 'subtle'" size="lg" class="relative rounded-full font-semibold">
              <UIcon v-if="module.hero.headline.left_icon" :name="module.hero.headline.left_icon" class="mr-1 w-4 h-4 pointer-events-none" />
              <NuxtLink :to="module.hero.headline.to" target="_blank" class="focus:outline-none" tabindex="-1">
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

        <ULandingSection v-for="(feat, index) in module.features" :key="index" v-bind="feat" :ui="{title: 'mt-2'}">
          <template #headline>
            <UBadge v-if="feat.headline" :color="feat.headline.color || 'green'" :variant="feat.headline.variant || 'subtle'" size="lg" class="relative rounded-full font-semibold">
              <UIcon v-if="feat.headline.left_icon" :name="feat.headline.left_icon" class="mr-1 w-4 h-4 pointer-events-none" />
              <NuxtLink :to="feat.headline.to" target="_blank" class="focus:outline-none" tabindex="-1">
                <span class="absolute inset-0" aria-hidden="true" />
              </NuxtLink>

              {{ feat.headline.label }}

              <UIcon v-if="feat.headline.right_icon" :name="feat.headline.right_icon"
                class="ml-1 w-4 h-4 pointer-events-none" />
            </UBadge>
          </template>
          <NuxtImg
              :src="'/home/' + feat.image"
              class="w-full rounded-md bg-white/75"
              placeholder
              v-if="feat.image"
            />
            <Placeholder v-else/>
        </ULandingSection>

        <ULandingSection v-bind="module.bottom_section">
          <ULandingGrid>
            <ULandingCard v-for="(feat, index) in module.bottom_section.cards" :key="index" v-bind="feat" />
          </ULandingGrid>

          <UButton v-if="module.plus_button" v-bind="module.plus_button" class="max-w-fit mx-auto"/>
        </ULandingSection>

        <ULandingCTA v-bind="module.bottom_cta" :class="module.bottom_cta.class"/>
      </UPageBody>
    </UPage>
  </UContainer>
</template>

<i18n lang="yaml">
  en:
    back_button: "Back to features"
    features: Applications
    website: Website
    useful_links: Liens utiles
    resources: Resources
  fr:
    back_button: "Retour aux features"
    features: Applications
    website: Site web
    useful_links: Liens utiles
    resources: Ressources
</i18n>