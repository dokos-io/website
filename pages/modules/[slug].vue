<script setup lang="ts">
import { joinURL } from 'ufo'
import { canonicalPath } from '#shared/canonical-path.mjs'
/**
 * Product page for one app of the ecosystem. Every app answers the same five
 * questions, in the same order: what is it, who is it for, how does it fit in
 * my Dokos site, what does it do, how do I get it. The YAML in
 * content/<locale>/modules/<slug>.yml provides the blocks; a missing block is
 * simply not rendered.
 */
// 2026 design: cream header and footer, light only.
definePageMeta({ design2026: true, colorMode: 'light' })

const { params: { slug } } = useRoute()
const { t, locale } = useI18n({ useScope: 'local' })
const localePath = useLocalePath()

const path = `/${locale.value}/modules/${slug}`

const { data: module } = await useAsyncData<any>(path, () =>
  queryCollection('modules').path(path).first(),
)

if (!module.value) {
  throw createError({ statusCode: 404, statusMessage: 'module not found', fatal: true })
}

// Apps this one works with, resolved from the `related:` slug list.
const { data: related } = await useAsyncData<any[]>(`${path}-related`, async () => {
  const slugs: string[] = module.value?.related ?? []
  if (!slugs.length) return []
  const docs = await queryCollection('modules')
    .where('path', 'IN', slugs.map(s => `/${locale.value}/modules/${s}`))
    .select('path', 'title', 'description', 'icon', 'logo')
    .all()
  // Keep the order of the YAML list.
  return slugs.map(s => docs.find(d => d.path.endsWith(`/${s}`))).filter(Boolean) as any[]
})

const title = module.value.title
const description = module.value.description

useSeoMeta({
  titleTemplate: '%s · Dokos',
  title,
  description,
  ogDescription: description,
  ogTitle: `${title} · Dokos`,
})

defineOgImage('OgImageSaas' as any, { title, description })

const site = useSiteConfig()
useHead({
  script: [{
    key: 'ld-module',
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: title,
      description,
      url: joinURL(site.url, canonicalPath(path)),
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      publisher: { '@id': `${site.url}/#organization` },
    }),
  }],
})

// The per-app route (/marketplace/apps/<app>) answers 417 on the Press
// instance, so every button opens the listing; `marketplace:` keeps the app
// id for the day the route works.
const marketplaceUrl = computed(() => 'https://cloud.dokos.io/marketplace')

// The facts strip is derived from the top-level fields so each YAML states
// them once. `facts.items` can still add rows.
const facts = computed(() => {
  const m = module.value
  const publisherLabel: Record<string, string> = {
    dokos: t('publisher_dokos'),
    frappe: t('publisher_frappe'),
    community: t('publisher_community'),
  }
  const items: { label: string, value: string, to?: string }[] = []
  if (m.publisher) items.push({ label: t('publisher'), value: publisherLabel[m.publisher] ?? m.publisher })
  if (m.licence) items.push({ label: t('licence'), value: m.licence })
  if (m.version) items.push({ label: t('version'), value: m.version })
  if (m.marketplace) items.push({ label: t('availability'), value: t('on_marketplace'), to: marketplaceUrl.value })
  if (m.docs) items.push({ label: t('documentation'), value: t('read_docs'), to: m.docs })
  return [...items, ...(m.facts?.items ?? [])]
})

// Features with a screenshot get their own section; the others share a grid
// of cards, so a page without screenshots does not show empty halves.
const shownFeatures = computed<any[]>(() => (module.value.features ?? []).filter((f: any) => f.image || f.video))
const textFeatures = computed<any[]>(() => (module.value.features ?? []).filter((f: any) => !f.image && !f.video))

const heroLinks = computed(() => {
  if (module.value.hero?.links) return module.value.hero.links
  const links: any[] = []
  if (module.value.marketplace) {
    links.push({ label: t('install_from_marketplace'), to: marketplaceUrl.value, target: '_blank', size: 'xl', color: 'primary', icon: 'i-heroicons-rocket-launch' })
  }
  if (module.value.docs) {
    links.push({ label: t('documentation'), to: module.value.docs, target: '_blank', size: 'xl', color: 'neutral', variant: 'outline', icon: 'i-heroicons-book-open' })
  }
  return links
})
</script>

<template>
  <div v-if="module" class="h26 overflow-x-clip bg-paper text-dokos-500">
    <Landing2026Hero
      :headline="{ label: `← ${t('back_to_ecosystem')}`, to: localePath('/modules') }"
      :title="module.hero?.title || module.title"
      :description="module.hero?.description || module.description"
      :links="heroLinks"
      :logo="module.logo?.light"
    />

    <!-- Facts strip: publisher, licence, version, availability, docs. -->
    <section v-if="facts.length" class="mx-auto max-w-[1360px] px-4 pt-16 sm:px-8">
      <dl class="h26-reveal grid grid-cols-2 gap-x-8 sm:grid-cols-3 lg:grid-cols-5">
        <div v-for="(item, i) in facts" :key="i" class="flex flex-col gap-1.5 border-t-[1.5px] border-dokos-500 py-5">
          <dt class="font-typed text-sm text-stone-600">{{ item.label }}</dt>
          <dd class="font-bold">
            <NuxtLink v-if="item.to" :to="item.to" target="_blank" class="underline underline-offset-4">{{ item.value }}</NuxtLink>
            <template v-else>{{ item.value }}</template>
          </dd>
        </div>
      </dl>
    </section>

    <!-- Hero screenshot, on its own under the facts. -->
    <section v-if="module.hero?.image" class="mx-auto max-w-[1360px] px-4 pt-16 sm:px-8">
      <AppImage :src="module.hero.image" :alt="module.title" loading="eager" fetchpriority="high" class="h26-reveal w-full rounded-xl shadow-[0_18px_40px_rgba(43,42,39,0.16)]" />
    </section>

    <!-- Who it is for: situations, not personas. -->
    <section v-if="module.for_whom" class="mx-auto flex max-w-[1360px] flex-col gap-12 px-4 py-24 sm:px-8 sm:py-32">
      <Landing2026Heading :title="module.for_whom.title || t('for_whom_title')" :description="module.for_whom.description" />
      <ol class="h26-reveal grid gap-x-10 lg:grid-cols-3">
        <li v-for="(item, i) in module.for_whom.items" :key="i" class="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t-[1.5px] border-dokos-500 py-6">
          <span class="font-typed text-lg text-accent">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="flex flex-col gap-2">
            <b class="text-2xl font-extrabold tracking-[-0.02em]">{{ item.title }}</b>
            <span class="text-lg leading-relaxed text-stone-600">{{ item.description }}</span>
          </span>
        </li>
      </ol>
    </section>

    <!-- How it fits in a Dokos site, in the deep blue card. -->
    <section v-if="module.fit" class="px-2 pb-10 sm:px-6 sm:pb-14 lg:px-14">
      <div class="rounded-2xl bg-dokos-900 text-white">
        <div class="mx-auto flex max-w-[1360px] flex-wrap items-center gap-12 px-4 py-20 sm:px-8 sm:py-24" :class="{ 'flex-row-reverse': module.fit.align === 'left' }">
          <div class="flex min-w-0 flex-col gap-6" :class="module.fit.image ? 'flex-[1_1_480px]' : 'flex-[1_1_100%]'">
            <h2 class="h26-reveal-x text-[clamp(2.25rem,4.5vw,3.75rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] [&_.text-primary]:text-inherit">
              <span v-html="module.fit.title || t('fit_title')" /><span class="text-accent">.</span>
            </h2>
            <p v-if="module.fit.description" class="h26-reveal text-lg leading-relaxed text-dokos-100" v-html="module.fit.description" />
            <dl class="h26-reveal grid gap-8 sm:grid-cols-2">
              <div v-if="module.fit.reads?.length" class="border-t-[1.5px] border-white/40 pt-4">
                <dt class="font-typed text-sm text-dokos-100">{{ t('fit_reads') }}</dt>
                <dd>
                  <ul class="mt-3 flex flex-col gap-2">
                    <li v-for="(item, i) in module.fit.reads" :key="i" v-html="item" />
                  </ul>
                </dd>
              </div>
              <div v-if="module.fit.adds?.length" class="border-t-[1.5px] border-white/40 pt-4">
                <dt class="font-typed text-sm text-dokos-100">{{ t('fit_adds') }}</dt>
                <dd>
                  <ul class="mt-3 flex flex-col gap-2">
                    <li v-for="(item, i) in module.fit.adds" :key="i" v-html="item" />
                  </ul>
                </dd>
              </div>
              <div v-if="module.fit.depends?.length" class="border-t-[1.5px] border-white/40 pt-4 sm:col-span-2">
                <dt class="font-typed text-sm text-dokos-100">{{ t('fit_depends') }}</dt>
                <dd class="mt-3">{{ module.fit.depends.join(' · ') }}</dd>
              </div>
            </dl>
          </div>
          <div v-if="module.fit.image" class="h26-reveal min-w-0 flex-[1_1_420px]">
            <AppImage :src="module.fit.image" :alt="module.fit.title || ''" class="w-full rounded-xl" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <!-- What it does: one section per feature with a screenshot, alternating sides. -->
    <section
      v-for="(feature, i) in shownFeatures"
      :key="`feature-${i}`"
      class="mx-auto flex max-w-[1360px] flex-wrap items-center gap-x-16 gap-y-12 px-4 py-20 sm:px-8 sm:py-24"
      :class="{ 'flex-row-reverse': feature.align ? feature.align === 'left' : i % 2 === 1 }"
    >
      <div class="flex min-w-0 flex-[1_1_420px] flex-col gap-5">
        <span v-if="feature.badge" class="h26-reveal font-typed text-sm">{{ typeof feature.badge === 'string' ? feature.badge : feature.badge.label }}</span>
        <h2 class="h26-reveal-x text-[clamp(2rem,3.8vw,3.25rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] [&_.text-primary]:text-inherit">
          <span v-html="feature.title" /><span class="text-accent">.</span>
        </h2>
        <p class="h26-reveal max-w-2xl text-lg leading-relaxed text-stone-600" v-html="feature.description" />
      </div>
      <div class="h26-reveal min-w-0 flex-[1_1_520px]">
        <AppImage v-if="feature.image" :src="feature.image" :alt="feature.title" class="w-full rounded-xl shadow-[0_18px_40px_rgba(43,42,39,0.16)]" loading="lazy" />
        <InViewVideo v-else class="w-full rounded-xl shadow-[0_18px_40px_rgba(43,42,39,0.16)]" :src="feature.video" />
      </div>
    </section>

    <!-- Features without a screenshot, as a ruled list. -->
    <section v-if="textFeatures.length" class="mx-auto flex max-w-[1360px] flex-col gap-12 px-4 py-24 sm:px-8">
      <Landing2026Heading v-if="!shownFeatures.length" :title="t('features_title')" />
      <ol class="h26-reveal grid gap-x-10 lg:grid-cols-3">
        <li v-for="(feature, i) in textFeatures" :key="i" class="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t-[1.5px] border-dokos-500 py-6">
          <span class="font-typed text-lg text-accent">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="flex flex-col gap-2">
            <span v-if="feature.badge" class="font-typed text-sm">{{ typeof feature.badge === 'string' ? feature.badge : feature.badge.label }}</span>
            <b class="text-2xl font-extrabold tracking-[-0.02em]" v-html="feature.title" />
            <span class="text-lg leading-relaxed text-stone-600" v-html="feature.description" />
          </span>
        </li>
      </ol>
    </section>

    <!-- How to get it: numbered steps, prerequisites on a white sheet. -->
    <section v-if="module.install" class="mx-auto flex max-w-[1360px] flex-col gap-12 px-4 py-24 sm:px-8 sm:py-32">
      <Landing2026Heading :title="module.install.title || t('install_title')" :description="module.install.description" />
      <div class="grid items-start gap-10 lg:grid-cols-3">
        <ol class="h26-reveal grid gap-x-10 sm:grid-cols-2 lg:col-span-2">
          <li v-for="(step, i) in (module.install.steps as any[])" :key="i" class="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t-[1.5px] border-dokos-500 py-6">
            <span class="font-typed text-lg text-accent">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="flex flex-col gap-2">
              <b class="text-xl font-extrabold">{{ step.title }}</b>
              <span class="leading-relaxed text-stone-600" v-html="step.description" />
            </span>
          </li>
        </ol>
        <div v-if="module.install.prerequisites?.length" class="h26-reveal bg-white px-7 py-7 shadow-[0_18px_40px_rgba(43,42,39,0.16)]">
          <p class="font-typed text-sm">{{ t('prerequisites') }}</p>
          <ul class="mt-4 flex flex-col gap-3 text-stone-600">
            <li v-for="(item, i) in module.install.prerequisites" :key="i" class="border-t border-dokos-500/20 pt-3" v-html="item" />
          </ul>
        </div>
      </div>
    </section>

    <Landing2026Faq v-if="module.faq" :title="module.faq.title || t('faq_title')" :description="module.faq.description" :items="module.faq.items" />

    <!-- Apps this one works with, each on a white sheet. -->
    <section v-if="related?.length" class="mx-auto flex max-w-[1360px] flex-col gap-12 px-4 py-24 sm:px-8">
      <Landing2026Heading :title="t('related_title')" />
      <div class="h26-reveal grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="item in related"
          :key="item.path"
          :to="canonicalPath(item.path)"
          class="h26-lift flex flex-col gap-3 bg-white p-6 shadow-[0_12px_30px_rgba(43,42,39,0.12)]"
        >
          <span class="flex items-center gap-3">
            <img v-if="item.logo" :src="item.logo.light" alt="" class="size-10 rounded-sm" loading="lazy">
            <UIcon v-else :name="item.icon || 'i-heroicons-cube'" class="size-9 shrink-0" />
            <b class="text-2xl font-extrabold tracking-[-0.02em]">{{ item.title }}</b>
          </span>
          <span class="leading-relaxed text-stone-600">{{ item.description }}</span>
        </NuxtLink>
      </div>
    </section>

    <Landing2026Cta
      v-if="module.bottom_cta"
      :title="module.bottom_cta.title"
      :description="module.bottom_cta.description"
      :links="module.bottom_cta.links"
    />
  </div>
</template>

<i18n lang="yaml">
en:
  back_to_ecosystem: The Dokos ecosystem
  publisher: Publisher
  publisher_dokos: Dokos SAS
  publisher_frappe: Frappe
  publisher_community: Community
  licence: Licence
  version: Dokos version
  availability: Availability
  on_marketplace: Dokos Cloud marketplace
  documentation: Documentation
  read_docs: Read the documentation
  install_from_marketplace: Install from the marketplace
  for_whom_title: Who it is for
  features_title: What you do with it
  fit_title: How it fits in your Dokos site
  fit_reads: Documents it reads and writes
  fit_adds: What it adds to your site
  fit_depends: Works with
  install_title: How to get it
  prerequisites: Prerequisites
  faq_title: Frequently asked questions
  related_title: Works with
fr:
  back_to_ecosystem: L'écosystème Dokos
  publisher: Éditeur
  publisher_dokos: Dokos SAS
  publisher_frappe: Frappe
  publisher_community: Communauté
  licence: Licence
  version: Version Dokos
  availability: Disponibilité
  on_marketplace: Marketplace Dokos Cloud
  documentation: Documentation
  read_docs: Lire la documentation
  install_from_marketplace: Installer depuis la marketplace
  for_whom_title: Pour qui
  features_title: Ce que vous faites avec l'application
  fit_title: Comment l'application s'intègre à votre site Dokos
  fit_reads: Les documents qu'elle lit et écrit
  fit_adds: Ce qu'elle ajoute à votre site
  fit_depends: Fonctionne avec
  install_title: Comment l'obtenir
  prerequisites: Prérequis
  faq_title: Questions fréquentes
  related_title: Fonctionne avec
</i18n>
