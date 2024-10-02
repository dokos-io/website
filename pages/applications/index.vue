<script setup lang="ts">

const { t } = useI18n()
const localePath = useLocalePath()

const { Applications, fetchList } = useApplications()


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
      :ui="{ wrapper: 'bg-gradient-to-b from-teal-400/10 from-90%', title: 'text-teal-500' }">
      <template #description>
        <span v-html="t('hero_description')"></span>
      </template>
    </ULandingHero>
    <UPageBody>
      <UContainer>
        <UPageGrid>
          <UPageCard v-for="(application, index) in Applications" :key="index" :to="localePath(application._path)"
            :title="application.title" :description="application.description" :ui="{
              divide: '',
              footer: { padding: 'pt-0' },
              title: 'text-lg',
              description: 'line-clamp-3'
            }">
            <template #icon>
              <UColorModeAvatar :light="application.logo.light" :dark="application.logo.dark" size="lg"
                :ui="{ rounded: 'rounded-sm' }" />
            </template>

            <template #footer>
              <UBadge :label="application.author" color="gray" />
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
    hero_title: "All application"
    hero_description: Discover all applications developped by the community and compatible with your Dokos website
  fr:
    go_to_label: "En savoir plus"
    hero_title: "Les applications de l'écosystème"
    hero_description: "Découvrez les applications développées par la communauté et compatibles avec votre site Dokos"
</i18n>