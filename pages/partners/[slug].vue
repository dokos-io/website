<script setup lang="ts">
// French only: no /en/ copy of this page is generated (no hreflang to a
// French text under lang="en").
defineI18nRoute({ locales: ['fr'] })
// 2026 design: cream header and footer, light only.
definePageMeta({ design2026: true, colorMode: 'light' })

const {
    params: { slug },
} = useRoute()

const { t, locale } = useI18n({
    useScope: 'local',
})

const localePath = useLocalePath()

const path = `/${locale.value}/partners/${slug}`

const { data: partner } = await useAsyncData<any>(path, () =>
    queryCollection('partners').path(path).first()
)

if (!partner.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Partner not found',
        fatal: true,
    })
}

const links = computed(() => [
    {
        label: `${t('visit')} ${partner.value && partner.value.title}`,
        color: 'neutral' as const,
        size: 'md' as const,
        icon: 'i-ph-arrow-square-out',
        trailing: true,
        to: partner.value?.link,
        target: '_blank',
    },
])

const title = partner.value.title
const description = partner.value.description
useSeoMeta({
    titleTemplate: '%s · Partenaires',
    title,
    description,
    ogDescription: description,
    ogTitle: `${title} · Partenaires`,
})
</script>

<template>
    <div v-if="partner" class="h26 overflow-x-clip bg-paper text-dokos-500">
        <Landing2026Header :title="partner.title" :description="partner.description" :kicker="`← ${t('back_button')}`" :kicker-to="localePath('/partners')">
            <template #before>
                <img v-if="partner.logo?.light" :src="partner.logo.light" alt="" class="mr-5 inline-block size-[0.9em] rounded-lg bg-white object-contain p-[0.06em] align-[-0.1em]">
            </template>
            <!-- Region and links, as a typed line. -->
            <div class="flex flex-wrap items-center gap-x-6 gap-y-2 font-typed">
                <span v-if="partner.location">{{ partner.location.label || partner.location }}</span>
                <a v-if="partner.link" :href="partner.link" target="_blank" class="font-bold underline underline-offset-4">{{ t('website') }}</a>
                <a v-if="partner.gitlab" :href="`https://gitlab.com/${partner.gitlab}`" target="_blank" class="underline underline-offset-4">GitLab</a>
                <a v-if="partner.github" :href="`https://github.com/${partner.github}`" target="_blank" class="underline underline-offset-4">GitHub</a>
            </div>
            <div class="pt-2">
                <a
                    v-for="link in links"
                    :key="link.label"
                    :href="link.to"
                    target="_blank"
                    class="h26-lift inline-block rounded-lg bg-dokos-500 px-6 py-3.5 font-bold text-white"
                >
                    {{ link.label }}
                </a>
            </div>
        </Landing2026Header>

        <div class="mx-auto grid max-w-[1360px] items-start gap-12 px-4 pb-24 sm:px-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <article class="h26-prose min-w-0 max-w-3xl">
                <ContentRenderer v-if="partner.body" :value="partner" />
            </article>
            <aside v-if="partner.services?.length || partner.resources?.length" class="flex flex-col gap-6 bg-white px-7 py-7 shadow-[0_18px_40px_rgba(43,42,39,0.16)]">
                <div v-if="partner.services?.length">
                    <p class="font-typed text-sm">{{ t('technical_expertise') }}</p>
                    <ul class="mt-3 flex flex-col gap-2 text-stone-600">
                        <li v-for="(service, index) in partner.services" :key="index" class="border-t border-dokos-500/20 pt-2">{{ service }}</li>
                    </ul>
                </div>
                <div v-if="partner.resources?.length">
                    <p class="font-typed text-sm">{{ t('resources') }}</p>
                    <ul class="mt-3 flex flex-col gap-2">
                        <li v-for="(resource, index) in partner.resources" :key="index" class="border-t border-dokos-500/20 pt-2">
                            <a :href="resource.to" target="_blank" class="font-bold hover:underline">{{ resource.label }} →</a>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    </div>
</template>

<i18n lang="yaml">
  en:
    back_button: "Back to partners"
    visit: Visit
    partners: Partners
    website: Website
    technical_expertise: Technical Expertise
    resources: Resources
  fr:
    back_button: "Retour aux partenaires"
    visit: Aller sur
    partners: Partenaires
    website: Site web
    technical_expertise: Expertise Technique
    resources: Ressources
</i18n>
