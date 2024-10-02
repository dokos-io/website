<script setup lang="ts">

const { t } = useI18n({
  useScope: 'local'
})

const localePath = useLocalePath()

const { Features, fetchList } = useFeatures()

// const title = page.value.app_name
// const description = page.value.link
// useSeoMeta({
//   titleTemplate: '%s · Enterprise',
//   title,
//   description,
//   ogDescription: description,
//   ogTitle: `${title} · Enterprise`
// })

await fetchList()
</script>

<template>
  <UPage id="smooth" class="pt-20 -mt-20">
    <ULandingHero :title="t('hero_title')"
      :ui="{ wrapper: 'bg-gradient-to-b from-green-400/10 from-90%', title: 'text-emerald-500' }">
      <template #description>
        <span v-html="t('hero_description')"></span>
      </template>
    </ULandingHero>
    <UPageBody>
      <UContainer>
        <UPageGrid>
          <UPageCard v-for="(feature, index) in Features" :key="index" :to="localePath(feature._path)"
            :title="feature.title" :description="feature.description" :ui="{
              divide: '',
              footer: { padding: 'pt-0' },
              title: 'text-lg',
              description: 'line-clamp-3'
            }">
            <!-- <template #icon>
              <UColorModeAvatar :light="feature.logo.light" :dark="feature.logo.dark" size="lg" :ui="{ rounded: 'rounded-sm' }" />
            </template> -->

            <template #footer>
              <UBadge :label="feature.application" color="gray" />
            </template>
          </UPageCard>
        </UPageGrid>
      </UContainer>
    </UPageBody>
  </UPage>
</template>

<i18n lang="yaml">
  en:
    go_to_label: "Read more"
    hero_title: "Available features by module"
    hero_description: "Each module is consituted by a set of features for different needs of any organisation"
  fr:
    go_to_label: "En savoir plus"
    hero_title: "Les fonctionnalités disponibles par module"
    hero_description: "Chaque module est constitué d'un ensemble de fonctionnalités répondant aux différents besoin d'une organisation"
</i18n>