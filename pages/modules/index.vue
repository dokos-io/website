<script setup lang="ts">

const { t } = useI18n({
  useScope: 'local'
})

const localePath = useLocalePath()

const { Modules, fetchList } = useModules()

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
    <ULandingHero :title="t('hero_title')" :ui="{ wrapper: 'bg-gradient-to-b from-yellow-400/10 from-90%', title: 'text-amber-500' }">
      <template #description>
        <span v-html="t('hero_description')"></span>
      </template>
    </ULandingHero>
    <UPageBody>
      <UContainer>
        <UPageGrid>
          <UPageCard v-for="(module, index) in Modules" :key="index" v-bind="module" :to="localePath(module._path)"
            :ui="{
              footer: { padding: 'pt-0' },
            }">
            <template #icon>
              <span class="inline-flex p-1 rounded-lg bg-amber-600/5">
                <UIcon :name="module.icon || 'i-heroicons-outline-cube'" class="w-10 h-10 flex-shrink-0 bg-amber-600"/>
              </span>
            </template>

            <template #header>
              <UBadge :label="module.application" color="gray" />
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
    hero_title: "Discover all available modules"
    hero_description: Our ecosystem is composed of a set of modules that can be deployed on your Dokos site
  fr:
    go_to_label: "En savoir plus"
    hero_title: "Découvrez les modules disponibles"
    hero_description: "Notre écosystème est constitué d'un ensemble de modules déployables sur votre site Dokos"
</i18n>