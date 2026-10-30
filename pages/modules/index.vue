<script setup lang="ts">
import { THEMES } from '~/utils/themes'

const { t, locale } = useI18n({ useScope: 'local' })
const localePath = useLocalePath()

const { Modules, fetchList } = useModules()
await fetchList()

// The intro and the three app families come from content/<locale>/modules.yml
// when it exists (FR today); the local i18n block is the fallback.
const { data: page } = await useAsyncData<any>(`ecosystem-${locale.value}`, () =>
  queryCollection('pages').path(`/${locale.value}/modules`).first(),
)

const title = page.value?.title || t('hero_title')
const description = page.value?.description || t('hero_description')
useSeoMeta({
  titleTemplate: '%s · Dokos',
  title,
  description,
  ogDescription: description,
  ogTitle: `${title} · Dokos`,
})
defineOgImage('OgImageSaas' as any, { title, description })

const { data: themeDocs } = await useAsyncData(`ecosystem-themes-${locale.value}`, () =>
  Promise.all(THEMES.map(theme =>
    queryCollection('pages').path(`/${locale.value}/ecosysteme/${theme.slug}`).first(),
  )),
)

const lang = (locale.value === 'en' ? 'en' : 'fr') as 'fr' | 'en'
const themes = computed(() => THEMES.map((theme, i) => ({
  ...theme,
  title: theme.label[lang],
  description: (themeDocs.value?.[i] as any)?.description,
  to: localePath(`/ecosysteme/${theme.slug}`),
})))

// The base (Dodock, Dokos) first, then the rest alphabetically.
const BASE = ['dokos', 'dodock']
const sortedModules = computed(() => {
  const all = [...(Modules.value ?? [])] as any[]
  const rank = (m: any) => {
    const slug = m.path.split('/').pop()
    const i = BASE.indexOf(slug)
    return i === -1 ? BASE.length : i
  }
  return all.sort((a, b) => rank(a) - rank(b) || a.title.localeCompare(b.title))
})
</script>

<template>
  <UPage>
    <UPageHero
      :links="page?.hero?.links"
      orientation="vertical"
    >
      <template v-if="page?.hero?.headline" #headline>
        <UBadge variant="subtle" size="lg" class="font-medium">
          <UIcon v-if="page.hero.headline.icon" :name="page.hero.headline.icon" class="mr-1.5 size-4" />
          {{ page.hero.headline.label }}
        </UBadge>
      </template>
      <template #title>
        <span v-html="page?.hero?.title || t('hero_title')" />
      </template>
      <template #description>
        <span v-html="page?.hero?.description || t('hero_description')" />
      </template>
    </UPageHero>

    <UPageSection
      v-if="page?.scope"
      :title="page.scope.title"
      :description="page.scope.description"
      class="bg-sand-200/60 dark:bg-stone-900"
    >
      <UPageGrid class="sm:grid-cols-2 lg:grid-cols-3">
        <UPageCard
          v-for="(item, i) in page.scope.items"
          :key="i"
          :title="item.title"
          :description="item.description"
          :icon="item.icon"
          variant="subtle"
        >
          <template v-if="item.badge" #footer>
            <UBadge :label="item.badge" variant="subtle" size="sm" />
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageSection>

    <UPageSection :title="t('themes_title')" :description="t('themes_description')">
      <UPageGrid class="sm:grid-cols-2 lg:grid-cols-3">
        <UPageCard
          v-for="theme in themes"
          :key="theme.slug"
          :title="theme.title"
          :description="theme.description"
          :to="theme.to"
          :icon="theme.icon"
          variant="subtle"
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection :title="t('all_modules_title')" :description="t('all_modules_description')">
      <UPageGrid class="sm:grid-cols-2 lg:grid-cols-3">
        <UPageCard
          v-for="module in sortedModules"
          :key="module.path"
          :title="module.title"
          :description="module.description"
          :to="module.path"
          variant="outline"
        >
          <template #leading>
            <UColorModeAvatar
              v-if="module.logo"
              :light="module.logo.light"
              :dark="module.logo.dark"
              size="lg"
              class="rounded-sm"
            />
            <UIcon v-else :name="module.icon || 'i-heroicons-cube'" class="size-8 text-primary" />
          </template>
          <template v-if="module.application" #footer>
            <UBadge :label="module.application as string" color="neutral" variant="subtle" size="sm" />
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageSection>

    <UPageSection v-if="page?.cta">
      <UPageCTA
        :title="page.cta.title"
        :description="page.cta.description"
        :links="page.cta.links"
        variant="subtle"
        class="bg-sand-200 dark:bg-stone-900 ring ring-default"
      />
    </UPageSection>
  </UPage>
</template>

<i18n lang="yaml">
en:
  hero_title: The Dokos ecosystem
  hero_description: One database, and the apps that plug into it.
  themes_title: By business area
  themes_description: Each area groups the apps that share the same documents.
  all_modules_title: All applications
  all_modules_description: The base first, then every app in alphabetical order.
fr:
  hero_title: L'écosystème Dokos
  hero_description: Une seule base de données, et les applications qui s'y branchent.
  themes_title: Par domaine métier
  themes_description: Chaque domaine regroupe les applications qui partagent les mêmes documents.
  all_modules_title: Toutes les applications
  all_modules_description: La base d'abord, puis chaque application par ordre alphabétique.
</i18n>
