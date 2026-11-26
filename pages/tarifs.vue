<script setup lang="ts">
// Pricing page in the 2026 design, from the same content as before
// (content/<locale>/tarifs.yml): the title and promise like the homepage
// blocks, a guide on how to choose (components/tarifs2026/), one section per offer (components/tarifs2026/), engineering priced
// per project as a ruled list, the questions as a ruled list that opens one
// answer at a time, and a closing Dokos blue card. French and English; light
// only (no dark version).
definePageMeta({ design2026: true, colorMode: 'light' })

const { locale } = useI18n()

const { data: page } = await useAsyncData<any>('tarifs', () =>
    queryCollection('pages').path(`/${locale.value}/tarifs`).first()
)

if (!page.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page not found',
        fatal: true,
    })
}

useSeoMeta({
    title: page.value.title,
    ogTitle: page.value.title,
    description: page.value.description,
    ogDescription: page.value.description,
})

defineOgImage('OgImageSaas' as any, {
    title: page.value.title,
    description: page.value.description,
})

const isExternal = (to: string) => /^https?:/.test(to)
</script>

<template>
    <div v-if="page" class="h26 overflow-x-clip bg-paper text-dokos-500">
        <section class="mx-auto flex max-w-[1360px] flex-col gap-6 px-4 pt-20 pb-12 sm:px-8 sm:pt-28 sm:pb-16">
            <p v-if="page.hero.headline?.label" class="h26-reveal font-typed text-dokos-500">{{ page.hero.headline.label }}</p>
            <div class="flex flex-wrap items-end gap-x-16 gap-y-6">
                <h1 class="h26-reveal-x flex-[1_1_640px] text-[clamp(3rem,7vw,6rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]">
                    {{ page.hero.title }}<span class="text-accent">.</span>
                </h1>
                <p class="h26-reveal flex-[1_1_420px] text-lg leading-relaxed text-stone-600">{{ page.hero.description }}</p>
            </div>
        </section>

        <Tarifs2026Guide v-if="page.guide" :guide="page.guide" :note="page.hero.note" />
        <p v-else-if="page.hero.note" class="mx-auto max-w-[1360px] px-4 pb-12 font-typed text-sm text-stone-600 sm:px-8">{{ page.hero.note }}</p>

        <Tarifs2026Lane v-for="lane in page.lanes?.items" :key="lane.id" :lane="lane" />

        <section v-if="page.scope" class="mx-auto flex max-w-[1360px] flex-col gap-12 px-4 py-24 sm:px-8 sm:py-32">
            <div class="flex flex-wrap items-end gap-x-16 gap-y-6">
                <h2 class="h26-reveal-x flex-[1_1_640px] text-[clamp(2.75rem,6vw,5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]">
                    {{ page.scope.title }}<span class="text-accent">.</span>
                </h2>
                <p class="h26-reveal flex-[1_1_360px] text-lg leading-relaxed text-stone-600">{{ page.scope.description }}</p>
            </div>
            <ol class="h26-reveal grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
                <li v-for="(item, i) in page.scope.items" :key="item.title" class="flex flex-col gap-2 border-t-[1.5px] border-dokos-500 py-6">
                    <span class="font-typed text-lg text-accent">{{ String(i + 1).padStart(2, '0') }}</span>
                    <b class="text-2xl font-extrabold tracking-[-0.02em]">{{ item.title }}</b>
                    <span class="leading-relaxed text-stone-600">{{ item.description }}</span>
                </li>
            </ol>
            <div v-if="page.scope.links?.length" class="h26-reveal flex flex-wrap gap-x-6 gap-y-2 font-bold">
                <NuxtLink v-for="link in page.scope.links" :key="link.to" :to="link.to" class="py-2 hover:underline">{{ link.label }} →</NuxtLink>
            </div>
        </section>

        <section v-if="page.faq" class="mx-auto flex max-w-[1360px] flex-col gap-12 px-4 pb-24 sm:px-8 sm:pb-32">
            <h2 class="h26-reveal-x text-[clamp(2.75rem,6vw,5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]">
                {{ page.faq.title }}<span class="text-accent">.</span>
            </h2>
            <!-- Native disclosure: one question opens its answer, no script needed. -->
            <div class="h26-reveal border-b-[1.5px] border-dokos-500">
                <details v-for="item in page.faq.items" :key="item.label" class="group border-t-[1.5px] border-dokos-500">
                    <summary class="flex cursor-pointer list-none items-baseline justify-between gap-6 py-6 text-xl font-extrabold tracking-[-0.01em] sm:text-2xl">
                        <span>{{ item.label }}</span>
                        <span class="font-typed text-2xl font-normal text-accent transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                    </summary>
                    <p class="max-w-3xl pb-7 text-lg leading-relaxed text-stone-600">{{ item.content }}</p>
                </details>
            </div>
        </section>

        <section v-if="page.cta" class="bg-paper px-2 pb-2 sm:px-6 sm:pb-6 lg:px-14 lg:pb-14">
            <div class="rounded-2xl bg-dokos-500 text-white">
                <div class="mx-auto flex max-w-[1360px] flex-wrap items-end justify-between gap-x-16 gap-y-8 px-4 py-20 sm:px-8 sm:py-24">
                    <div class="flex max-w-3xl flex-col gap-5">
                        <h2 class="h26-reveal-x text-[clamp(2.5rem,5vw,4.25rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em]">
                            {{ page.cta.title }}<span class="text-accent">.</span>
                        </h2>
                        <p class="h26-reveal text-lg leading-relaxed text-dokos-100">{{ page.cta.description }}</p>
                    </div>
                    <div class="h26-reveal flex flex-wrap gap-3">
                        <NuxtLink
                            v-for="(link, i) in page.cta.links"
                            :key="link.to"
                            :to="link.to"
                            :target="isExternal(link.to) ? '_blank' : undefined"
                            class="h26-lift rounded-lg px-6 py-3.5 font-bold"
                            :class="i === 0 ? 'bg-paper text-dokos-500' : 'border-[1.5px] border-white text-white'"
                        >
                            {{ link.label }}
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
