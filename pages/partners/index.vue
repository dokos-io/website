<script setup lang="ts">

const { locale } = useI18n()
const localePath = useLocalePath()

const { Partners, fetchList } = usePartners()


const { data: page } = await useAsyncData('partners', () => queryContent(`/${locale.value}/partners`).findOne())

const title = page.value.head?.title || page.value.title
const description = page.value.head?.description || page.value.description
useSeoMeta({
  titleTemplate: '%s · Enterprise',
  title,
  description,
  ogDescription: description,
  ogTitle: `${title} · Enterprise`
})

const { t } = useI18n({
  useScope: 'local'
})

await fetchList()
</script>

<template>
  <UContainer>
    <UPageHero v-bind="page" />

    <UPage id="smooth" class="pt-20 -mt-20">
      <UPageBody>
        <UPageGrid v-if="Partners?.length">
          <UPageCard
            v-for="(agency, index) in Partners"
            :key="index"
            :to="localePath(agency._path)"
            :title="agency.title"
            :description="agency.description"
            :ui="{
              divide: '',
              footer: { padding: 'pt-0' },
              title: 'text-lg',
              description: 'line-clamp-3'
            }"
          >
            <template #icon>
              <UColorModeAvatar :light="agency.logo.light" :dark="agency.logo.dark" size="lg" :ui="{ rounded: 'rounded-sm' }" />
            </template>

            <template #footer>
              <UBadge :label="agency.location.label" color="gray" />
            </template>
          </UPageCard>
        </UPageGrid>

        <EmptyCard v-else :label="t('empty_page')" />
      </UPageBody>
    </UPage>
  </UContainer>
</template>

<i18n lang="yaml">
  en:
      empty_page: "We don't have any english speaking partner yet."
  fr:
      empty_page: "Nous n'avons pas encore de partenaire francophone."
</i18n>