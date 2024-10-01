<script setup lang="ts">

const { locale } = useI18n()
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
            :to="localePath(module._path)"
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

            <template #footer>
              <UBadge :label="module.application" color="gray" />
            </template>
          </UPageCard>
        </UPageGrid>
      </UPageBody>
    </UPage>
  </UContainer>
</template>