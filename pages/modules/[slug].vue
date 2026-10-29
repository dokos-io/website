<script setup lang="ts">
/**
 * Product page for one app of the ecosystem. Every app answers the same five
 * questions, in the same order: what is it, who is it for, how does it fit in
 * my Dokos site, what does it do, how do I get it. The YAML in
 * content/<locale>/modules/<slug>.yml provides the blocks; a missing block is
 * simply not rendered.
 */
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
  <UPage v-if="module">
    <UPageHero
      :links="heroLinks"
      orientation="horizontal"
    >
      <template #headline>
        <NuxtLink :to="localePath('/modules')" class="inline-flex">
          <UBadge variant="subtle" size="lg" class="font-medium" icon="i-heroicons-arrow-left-20-solid">
            {{ t('back_to_ecosystem') }}
          </UBadge>
        </NuxtLink>
      </template>
      <template #title>
        <span class="flex items-center gap-4">
          <UColorModeAvatar
            v-if="module.logo"
            :light="module.logo.light"
            :dark="module.logo.dark"
            size="3xl"
            class="rounded-md shrink-0"
          />
          <span v-html="module.hero?.title || module.title" />
        </span>
      </template>
      <template #description>
        <span v-html="module.hero?.description || module.description" />
      </template>
      <AppImage
        v-if="module.hero?.image"
        :src="module.hero.image"
        :alt="module.title"
        class="w-full rounded-lg ring ring-default"
      />
      <Placeholder v-else class="aspect-video" />
    </UPageHero>

    <!-- Facts strip: publisher, licence, version, availability, docs. -->
    <UPageSection v-if="facts.length" class="py-6 sm:py-8">
      <dl class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-default/10 rounded-lg overflow-hidden ring ring-default">
        <div v-for="(item, i) in facts" :key="i" class="bg-sand-100 dark:bg-stone-900 px-5 py-4">
          <dt class="text-xs uppercase tracking-wide text-muted">{{ item.label }}</dt>
          <dd class="mt-1 font-medium text-highlighted">
            <NuxtLink v-if="item.to" :to="item.to" target="_blank" class="text-primary underline underline-offset-4">
              {{ item.value }}
            </NuxtLink>
            <template v-else>{{ item.value }}</template>
          </dd>
        </div>
      </dl>
    </UPageSection>

    <!-- Who it is for: situations, not personas. -->
    <UPageSection
      v-if="module.for_whom"
      :title="module.for_whom.title || t('for_whom_title')"
      :description="module.for_whom.description"
    >
      <UPageGrid class="sm:grid-cols-2 lg:grid-cols-3">
        <UPageCard
          v-for="(item, i) in module.for_whom.items"
          :key="i"
          :title="item.title"
          :description="item.description"
          :icon="item.icon || 'i-heroicons-user'"
          variant="subtle"
        />
      </UPageGrid>
    </UPageSection>

    <!-- How it fits in a Dokos site: the documents it reads and writes, what it adds. -->
    <UPageSection
      v-if="module.fit"
      orientation="horizontal"
      :reverse="module.fit.align === 'left'"
      class="bg-sand-200/60 dark:bg-stone-900"
    >
      <template #title>
        <span v-html="module.fit.title || t('fit_title')" />
      </template>
      <template #description>
        <span v-html="module.fit.description" />
        <dl class="mt-6 grid gap-6 sm:grid-cols-2">
          <div v-if="module.fit.reads?.length">
            <dt class="text-sm font-semibold text-highlighted">{{ t('fit_reads') }}</dt>
            <dd>
              <ul class="mt-2 space-y-1.5 text-sm text-muted">
                <li v-for="(item, i) in module.fit.reads" :key="i" class="flex gap-2">
                  <UIcon name="i-heroicons-arrow-right-circle" class="size-4 mt-0.5 shrink-0 text-primary" />
                  <span v-html="item" />
                </li>
              </ul>
            </dd>
          </div>
          <div v-if="module.fit.adds?.length">
            <dt class="text-sm font-semibold text-highlighted">{{ t('fit_adds') }}</dt>
            <dd>
              <ul class="mt-2 space-y-1.5 text-sm text-muted">
                <li v-for="(item, i) in module.fit.adds" :key="i" class="flex gap-2">
                  <UIcon name="i-heroicons-plus-circle" class="size-4 mt-0.5 shrink-0 text-primary" />
                  <span v-html="item" />
                </li>
              </ul>
            </dd>
          </div>
          <div v-if="module.fit.depends?.length" class="sm:col-span-2">
            <dt class="text-sm font-semibold text-highlighted">{{ t('fit_depends') }}</dt>
            <dd>
              <ul class="mt-2 flex flex-wrap gap-2">
                <li v-for="(item, i) in module.fit.depends" :key="i">
                  <UBadge :label="item" variant="subtle" color="neutral" />
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </template>
      <AppImage
        v-if="module.fit.image"
        :src="module.fit.image"
        :alt="module.fit.title || ''"
        class="rounded-lg ring ring-default"
        loading="lazy"
      />
      <Placeholder v-else class="aspect-video" />
    </UPageSection>

    <!-- What it does: one feature per section, alternating sides. -->
    <UPageSection
      v-for="(feature, i) in (module.features as any[])"
      :key="i"
      orientation="horizontal"
      :reverse="feature.align ? feature.align === 'left' : i % 2 === 1"
    >
      <template v-if="feature.badge" #headline>
        <UBadge :label="typeof feature.badge === 'string' ? feature.badge : feature.badge.label" variant="subtle" />
      </template>
      <template #title>
        <span v-html="feature.title" />
      </template>
      <template #description>
        <span v-html="feature.description" />
      </template>
      <AppImage
        v-if="feature.image"
        :src="feature.image"
        :alt="feature.title"
        class="rounded-lg ring ring-default"
        loading="lazy"
      />
      <video
        v-else-if="feature.video"
        class="w-full rounded-lg ring ring-default"
        autoplay
        loop
        muted
        playsinline
      >
        <source :src="feature.video" type="video/mp4">
      </video>
      <Placeholder v-else class="aspect-video" />
    </UPageSection>

    <!-- How to get it. -->
    <UPageSection
      v-if="module.install"
      :title="module.install.title || t('install_title')"
      :description="module.install.description"
      class="bg-sand-200/60 dark:bg-stone-900"
    >
      <div class="grid gap-10 lg:grid-cols-3">
        <ol class="lg:col-span-2 grid gap-6 sm:grid-cols-2">
          <li v-for="(step, i) in (module.install.steps as any[])" :key="i" class="flex gap-4">
            <span class="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-inverted text-sm font-semibold">
              {{ i + 1 }}
            </span>
            <div>
              <p class="font-medium text-highlighted">{{ step.title }}</p>
              <p class="mt-1 text-sm text-muted" v-html="step.description" />
            </div>
          </li>
        </ol>
        <div v-if="module.install.prerequisites?.length" class="rounded-lg ring ring-default bg-default p-5">
          <p class="text-sm font-semibold text-highlighted">{{ t('prerequisites') }}</p>
          <ul class="mt-3 space-y-2 text-sm text-muted">
            <li v-for="(item, i) in module.install.prerequisites" :key="i" class="flex gap-2">
              <UIcon name="i-heroicons-check-circle" class="size-4 mt-0.5 shrink-0 text-primary" />
              <span v-html="item" />
            </li>
          </ul>
        </div>
      </div>
    </UPageSection>

    <UPageSection v-if="module.faq" :title="module.faq.title || t('faq_title')" :description="module.faq.description">
      <UAccordion
        :items="module.faq.items"
        type="multiple"
        :unmount-on-hide="false"
        class="max-w-4xl mx-auto"
        :ui="{ trigger: 'text-base text-highlighted py-4', body: 'text-base text-muted pb-4' }"
      >
        <template #body="{ item }">
          <MDC :value="(item as any).content || ''" class="prose prose-primary dark:prose-invert max-w-none text-muted" />
        </template>
      </UAccordion>
    </UPageSection>

    <!-- Apps this one works with. -->
    <UPageSection v-if="related?.length" :title="t('related_title')">
      <UPageGrid class="sm:grid-cols-2 lg:grid-cols-3">
        <UPageCard
          v-for="item in related"
          :key="item.path"
          :title="item.title"
          :description="item.description"
          :to="item.path"
          variant="subtle"
        >
          <template #leading>
            <UColorModeAvatar
              v-if="item.logo"
              :light="item.logo.light"
              :dark="item.logo.dark"
              size="lg"
              class="rounded-sm"
            />
            <UIcon v-else :name="item.icon || 'i-heroicons-cube'" class="size-8 text-primary" />
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageSection>

    <UPageSection v-if="module.bottom_cta">
      <UPageCTA
        :title="module.bottom_cta.title"
        :description="module.bottom_cta.description"
        :links="module.bottom_cta.links"
        variant="subtle"
        class="bg-sand-200 dark:bg-stone-900 ring ring-default"
      />
    </UPageSection>
  </UPage>
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
  fit_title: Comment l'application s'intègre à votre site Dokos
  fit_reads: Les documents qu'elle lit et écrit
  fit_adds: Ce qu'elle ajoute à votre site
  fit_depends: Fonctionne avec
  install_title: Comment l'obtenir
  prerequisites: Prérequis
  faq_title: Questions fréquentes
  related_title: Fonctionne avec
</i18n>
