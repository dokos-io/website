<script setup lang="ts">

const { locale } = useI18n()

const { data: page } = await useAsyncData('tiers-lieux', () => queryContent(`/${locale.value}/tiers-lieux`).findOne())
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
          v-if="page.hero.image"
        />
        <Placeholder v-else />

      </template>
    </ULandingHero>

            <!-- <UPageGrid :ui="{'wrapper': 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-8'}">
              <UCard v-for="(card, index) in page.cards" :key="index" v-bind="card" target="_blank" :ui="{
                header: { base: card.color + ' rounded-t-xl'},
                base: 'text-center'
              }">
                <template #header>
                  <p class="text-gray-900 dark:text-white text-base font-semibold truncate gap-1.5">{{  card.title }}</p>
                </template>

                <template #footer>
                    <div class="text-[15px] text-gray-500 dark:text-gray-400 mt-1 mb-6">{{  card.description }}</div>
                    <UButton v-bind="card.button" />
                </template>
              </UCard>
            </UPageGrid> -->

          <ULandingSection :v-bind="page.faq" v-if="page.faq">
            <ULandingFAQ :items="page.faq.items" multiple :class="page.faq" />
          </ULandingSection>
        </UContainer>
      </UPageBody>
    </UPage>
  </div>
</template>