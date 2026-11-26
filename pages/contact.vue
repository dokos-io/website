<script setup lang="ts">
// Contact page in the 2026 design: the title and promise like the homepage
// blocks, the form laid as a white sheet, and the other ways to reach us as a
// ruled list beside it. French and English; light only (no dark version).
definePageMeta({ design2026: true, colorMode: 'light' })

const { locale } = useI18n()

const { data: page } = await useAsyncData<any>('contact', () =>
    queryCollection('pages').path(`/${locale.value}/contact`).first()
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
</script>

<template>
    <div v-if="page" class="h26 overflow-x-clip bg-paper text-dokos-500">
        <section class="mx-auto flex max-w-[1360px] flex-col gap-14 px-4 pt-20 pb-28 sm:px-8 sm:pt-28 sm:pb-36">
            <div class="flex flex-wrap items-end gap-x-16 gap-y-6">
                <h1 class="h26-reveal-x flex-[1_1_640px] text-[clamp(3rem,7vw,6rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]">
                    {{ page.form.title }}<span class="text-accent">.</span>
                </h1>
                <p class="h26-reveal flex-[1_1_360px] text-lg leading-relaxed text-stone-600">{{ page.form.description }}</p>
            </div>

            <div class="grid items-start gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
                <ContactForm :form="page.form" variant="2026" />

                <dl class="h26-reveal border-b-[1.5px] border-dokos-500">
                    <div v-for="info in page.contact_info" :key="info.title" class="flex flex-col gap-1 border-t-[1.5px] border-dokos-500 py-6">
                        <dt class="font-typed text-sm text-stone-600">{{ info.title }}</dt>
                        <dd>
                            <a v-if="info.to" :href="info.to" class="text-2xl font-extrabold tracking-[-0.02em] hover:underline">{{ info.value ?? info.description }}</a>
                            <span v-else class="text-2xl font-extrabold tracking-[-0.02em]">{{ info.value ?? info.description }}</span>
                        </dd>
                    </div>
                </dl>
            </div>
        </section>
    </div>
</template>
