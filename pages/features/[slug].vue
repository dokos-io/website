<script setup lang="ts">
// import type { feature } from '~/types'

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

const { data: feature } = await useAsyncData(path_without_locale.path, () => queryContent(`/${locale.value}/features/${slug}`).findOne())

if (!feature.value) {
  throw createError({ statusCode: 404, statusMessage: 'feature not found', fatal: true })
}

const title = feature.value.head?.title || feature.value.title
const description = feature.value.head?.description || feature.value.description
useSeoMeta({
  titleTemplate: '%s · Fonctionnalités Dokos',
  title,
  description,
  ogDescription: description,
  ogTitle: `${title} · Fonctionnalités Dokos`
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
        <ULandingHero :links="feature.hero.links" orientation="vertical" :ui="{wrapper: 'pt-0 sm:pt-0 md:pt-0'}" v-if="feature.hero">
          <template #headline>
            <UBadge v-if="feature.hero.headline" :color="feature.hero.headline.color || 'sky'" :variant="feature.hero.headline.variant || 'subtle'" size="lg" class="relative rounded-full font-semibold">
              <UIcon v-if="feature.hero.headline.left_icon" :name="feature.hero.headline.left_icon" class="mr-1 w-4 h-4 pointer-events-none" />
              <NuxtLink :to="feature.hero.headline.to" target="_blank" class="focus:outline-none" tabindex="-1">
                <span class="absolute inset-0" aria-hidden="true" />
              </NuxtLink>

              {{ feature.hero.headline.label }}

              <UIcon v-if="feature.hero.headline.right_icon" :name="feature.hero.headline.right_icon"
                class="ml-1 w-4 h-4 pointer-events-none" />
            </UBadge>
          </template>
    
          <template #title>
            <span v-html="feature.hero.title"></span>
          </template>

          <template #description>
            <span v-html="feature.hero.description"></span>
          </template>
        </ULandingHero>

        <ULandingSection>
          <ContentRenderer v-if="feature && feature.body" :value="feature" />
        </ULandingSection>

        <ULandingCTA v-bind="feature.bottom_cta" :class="feature.bottom_cta.class" v-if="feature.bottom_cta"/>
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