<script setup lang="ts">
// import type { application } from '~/types'

const route = useRoute();
const {
  params: { slug },
} = useRoute();
const { locale } = useI18n()

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
            :to="localePath('/applications')"
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
        <ULandingHero :links="application.hero.links" orientation="vertical" :ui="{wrapper: 'pt-0 sm:pt-0 md:pt-0'}">
          <template #headline>
            <UBadge v-if="application.hero.headline" variant="subtle" size="lg" class="relative rounded-full font-semibold">
              <UIcon v-if="application.hero.headline.left_icon" :name="application.hero.headline.left_icon" class="mr-1 w-4 h-4 pointer-events-none" />
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
            <NuxtImg
              :src="'/home/' + application.hero.image"
              class="w-full rounded-md bg-white/75"
              placeholder
              v-if="application.hero.image"
            />
            <Placeholder v-else/>
          </template>
        </ULandingHero>

        <ULandingSection v-bind="application.bridge" />

        <ULandingSection>
          <ULandingGrid>
            <ULandingCard v-for="(feat, index) in application.features" :key="index" v-bind="feat" />
          </ULandingGrid>
        </ULandingSection>


        <ULandingCTA v-bind="application.bottom_cta" class="bg-sky-600/10 dark:bg-sky-800/10"/>
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