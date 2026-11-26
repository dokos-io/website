<script setup lang="ts">
import { THEMES } from '~/utils/themes'
import { canonicalPath } from '#shared/canonical-path.mjs'

// 2026 design: cream header and footer, light only.
definePageMeta({ design2026: true, colorMode: 'light' })

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
  <div class="h26 overflow-x-clip bg-paper text-dokos-500">
    <Landing2026Hero
      :headline="page?.hero?.headline"
      :title="page?.hero?.title || t('hero_title')"
      :description="page?.hero?.description || t('hero_description')"
      :links="page?.hero?.links"
    />

    <!-- The three app families, as a ruled numbered list. -->
    <section v-if="page?.scope" class="mx-auto flex max-w-[1360px] flex-col gap-12 px-4 py-24 sm:px-8 sm:py-32">
      <Landing2026Heading :title="page.scope.title" :description="page.scope.description" />
      <ol class="h26-reveal grid gap-x-10 lg:grid-cols-3">
        <li v-for="(item, i) in page.scope.items" :key="i" class="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t-[1.5px] border-dokos-500 py-6">
          <span class="font-typed text-lg text-accent">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="flex flex-col gap-2">
            <b class="text-2xl font-extrabold tracking-[-0.02em]">{{ item.title }}</b>
            <span class="text-lg leading-relaxed text-stone-600">{{ item.description }}</span>
            <span v-if="item.badge" class="font-typed text-sm">{{ item.badge }}</span>
          </span>
        </li>
      </ol>
    </section>

    <!-- Business areas, in the deep blue card: one ruled link per area. -->
    <section class="px-2 pb-10 sm:px-6 sm:pb-14 lg:px-14">
      <div class="rounded-2xl bg-dokos-900 text-white">
        <div class="mx-auto flex max-w-[1360px] flex-col gap-12 px-4 py-24 sm:px-8 sm:py-28">
          <Landing2026Heading :title="t('themes_title')" :description="t('themes_description')" tone="dark" />
          <ul class="h26-reveal grid gap-x-10 lg:grid-cols-2">
            <li v-for="theme in themes" :key="theme.slug" class="border-t-[1.5px] border-white/40">
              <NuxtLink :to="theme.to" class="group flex flex-col gap-2 py-6">
                <b class="text-2xl font-extrabold tracking-[-0.02em] group-hover:underline">{{ theme.title }} →</b>
                <span class="leading-relaxed text-dokos-100">{{ theme.description }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Every app, each on a white sheet. -->
    <section class="mx-auto flex max-w-[1360px] flex-col gap-12 px-4 py-24 sm:px-8 sm:py-32">
      <Landing2026Heading :title="t('all_modules_title')" :description="t('all_modules_description')" />
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="module in sortedModules"
          :key="module.path"
          :to="canonicalPath(module.path)"
          class="h26-lift flex flex-col gap-3 bg-white p-6 shadow-[0_12px_30px_rgba(43,42,39,0.12)]"
        >
          <span class="flex items-center gap-3">
            <img v-if="module.logo" :src="module.logo.light" alt="" class="size-10 rounded-sm" loading="lazy">
            <UIcon v-else :name="module.icon || 'i-heroicons-cube'" class="size-9 shrink-0" />
            <b class="text-2xl font-extrabold tracking-[-0.02em]">{{ module.title }}</b>
          </span>
          <span class="leading-relaxed text-stone-600">{{ module.description }}</span>
          <span v-if="module.application" class="mt-auto font-typed text-sm">{{ module.application }}</span>
        </NuxtLink>
      </div>
    </section>

    <Landing2026Cta v-if="page?.cta" :title="page.cta.title" :description="page.cta.description" :links="page.cta.links" />
  </div>
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
