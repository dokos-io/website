<script setup lang="ts">
import { canonicalPath } from '#shared/canonical-path.mjs'
// 2026 design: cream header and footer, light only.
definePageMeta({ design2026: true, colorMode: 'light' })

const { t, locale } = useI18n({
    useScope: 'local',
})

const { Partners, fetchList } = usePartners()

const { data: page } = await useAsyncData<any>('partners', () =>
    queryCollection('pages').path(`/${locale.value}/partners`).first()
)

const title = page.value?.title
const description = page.value?.description
useSeoMeta({
    titleTemplate: '%s · Partenaires',
    title,
    description,
    ogDescription: description,
    ogTitle: `${title} · Partenaires`,
})

await fetchList()
</script>

<template>
    <div class="h26 overflow-x-clip bg-paper text-dokos-500">
        <Landing2026Header :title="page?.title" :description="page?.description">
            <div v-if="page?.links?.length" class="flex flex-wrap gap-3 pt-2">
                <NuxtLink
                    v-for="link in page.links"
                    :key="link.label"
                    :to="link.to"
                    :target="link.target"
                    class="h26-lift rounded-lg bg-dokos-500 px-6 py-3.5 font-bold text-white"
                >
                    {{ link.label }}
                </NuxtLink>
            </div>
        </Landing2026Header>

        <!-- One white sheet per partner: logo, name, region. -->
        <section class="mx-auto max-w-[1360px] px-4 pb-24 sm:px-8">
            <div v-if="Partners?.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <NuxtLink
                    v-for="(agency, index) in Partners"
                    :key="index"
                    :to="canonicalPath(agency.path)"
                    class="h26-lift group flex flex-col gap-4 bg-white p-6 shadow-[0_12px_30px_rgba(43,42,39,0.12)]"
                >
                    <span class="flex items-center gap-4">
                        <img v-if="agency.logo?.light" :src="agency.logo.light" alt="" class="size-12 shrink-0 rounded-sm object-contain" loading="lazy">
                        <b class="text-2xl font-extrabold tracking-[-0.02em] group-hover:underline">{{ agency.title }}</b>
                    </span>
                    <span class="line-clamp-3 leading-relaxed text-stone-600">{{ agency.description }}</span>
                    <span v-if="agency.location" class="mt-auto font-typed text-sm">{{ agency.location.label || agency.location }}</span>
                </NuxtLink>
            </div>
            <p v-else class="font-typed text-lg">{{ t('empty_page') }}</p>
        </section>
    </div>
</template>

<i18n lang="yaml">
  en:
      empty_page: "We don't have any english speaking partner yet."
  fr:
      empty_page: "Nous n'avons pas encore de partenaire francophone."
</i18n>
