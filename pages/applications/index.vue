<script setup lang="ts">

const { locale } = useI18n()
const localePath = useLocalePath()

const { Applications, fetchList } = useApplications()


const { data: page } = await useAsyncData('applications', () => queryContent(`/${locale.value}/applications`).findOne())

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
            v-for="(application, index) in Applications"
            :key="index"
            :to="localePath(application._path)"
            :title="application.title"
            :description="application.description"
            :ui="{
              divide: '',
              footer: { padding: 'pt-0' },
              title: 'text-lg',
              description: 'line-clamp-3'
            }"
          >
            <template #icon>
              <UColorModeAvatar :light="application.logo.light" :dark="application.logo.dark" size="lg" :ui="{ rounded: 'rounded-sm' }" />
            </template>

            <template #footer>
              <UBadge :label="application.author" color="gray" />
            </template>
          </UPageCard>
        </UPageGrid>
      </UPageBody>
    </UPage>
  </UContainer>
</template>