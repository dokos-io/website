<script setup lang="ts">

const { locale } = useI18n()
const localePath = useLocalePath()

const { Features, fetchList } = useFeatures()

const { data: page } = await useAsyncData('features', () => queryContent(`/${locale.value}/features`).findOne())

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
  <UContainer>
    <UPageHero v-bind="page" />

    <UPage id="smooth" class="pt-20 -mt-20">
      <UPageBody>
        <UPageGrid>
          <UPageCard
            v-for="(feature, index) in Features"
            :key="index"
            :to="localePath(feature._path)"
            :title="feature.title"
            :description="feature.description"
            :ui="{
              divide: '',
              footer: { padding: 'pt-0' },
              title: 'text-lg',
              description: 'line-clamp-3'
            }"
          >
            <!-- <template #icon>
              <UColorModeAvatar :light="feature.logo.light" :dark="feature.logo.dark" size="lg" :ui="{ rounded: 'rounded-sm' }" />
            </template> -->

            <template #footer>
              <UBadge :label="feature.application" color="gray" />
            </template>
          </UPageCard>
        </UPageGrid>
      </UPageBody>
    </UPage>
  </UContainer>
</template>