<script setup lang="ts">

const { t, locale } = useI18n({
  useScope: 'local'
})

const localePath = useLocalePath()

const { Modules, fetchList } = useModules()

const { data: page } = await useAsyncData('modules', () => queryContent(`/${locale.value}/modules`).findOne())

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
            v-for="(module, index) in Modules"
            :key="index"
            :title="module.title"
            :description="module.description"
            :ui="{
              divide: '',
              footer: { padding: 'pt-0' },
              title: 'text-lg',
              description: 'line-clamp-3'
            }"
          >
            <!-- <template #icon>
              <UColorModeAvatar :light="module.logo.light" :dark="module.logo.dark" size="lg" :ui="{ rounded: 'rounded-sm' }" />
            </template> -->
            <template #header>
              <UBadge :label="module.application" color="gray" />
            </template>

            <template #footer>
              <UButton :label="t('go_to_label')" color="white" variant="ghost" :to="module._path">
                <template #trailing>
                  <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
                </template>
              </UButton>
            </template>
          </UPageCard>
        </UPageGrid>
      </UPageBody>
    </UPage>
  </UContainer>
</template>

<i18n lang="yaml">
  en:
    go_to_label: "Read more"
  fr:
    go_to_label: "En savoir plus"
</i18n>