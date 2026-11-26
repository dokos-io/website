<script setup lang="ts">
// 2026 opening for the content-driven pages: the deep blue card of the homepage
// hero, without the video. The small line above the title can link back (a
// module page links to the ecosystem); an optional logo sits before the title.

const props = defineProps<{
    headline?: { label: string; to?: string };
    title: string;
    description?: string;
    links?: { label: string; to: string; target?: string }[];
    logo?: string;
}>()

const NuxtLink = resolveComponent('NuxtLink')
const isExternal = (to: string) => /^https?:/.test(to)
// YAML titles may end with a period; the coral dot replaces it.
const title = computed(() => (props.title || '').trim().replace(/\.(\s*(<\/[a-z]+>)*)$/i, '$1'))
// Hero titles are sentences: long ones get a smaller size so they stay on a few lines.
const size = computed(() => title.value.replace(/<[^>]+>/g, '').length > 60
    ? 'text-[clamp(2.25rem,5.2vw,4.75rem)]'
    : 'text-[clamp(2.75rem,7vw,6.5rem)]')
</script>

<template>
    <section class="px-2 sm:px-4">
        <div class="relative isolate flex min-h-[clamp(420px,58vh,600px)] flex-col justify-end overflow-hidden rounded-2xl bg-dokos-900 text-white">
            <div class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_30%,var(--color-dokos-800),var(--color-dokos-900)_60%)]" aria-hidden="true" />
            <div class="flex flex-col gap-5 px-6 pt-24 pb-10 sm:px-12 sm:pb-14">
                <component
                    :is="headline.to ? NuxtLink : 'p'"
                    v-if="headline"
                    :to="headline.to"
                    class="w-fit text-xl font-semibold sm:text-2xl"
                    :class="{ 'hover:underline': headline.to }"
                >
                    {{ headline.label }}
                </component>
                <h1 class="flex max-w-6xl items-center gap-5 font-extrabold uppercase leading-[0.9] tracking-[-0.045em] [&_.text-primary]:text-inherit" :class="size">
                    <img v-if="logo" :src="logo" alt="" class="size-[0.9em] shrink-0 rounded-xl bg-white p-[0.08em]">
                    <span><span v-html="title" /><span class="text-accent">.</span></span>
                </h1>
                <div class="flex flex-wrap items-end justify-between gap-6 pt-2">
                    <p v-if="description" class="max-w-2xl text-lg leading-relaxed text-stone-200" v-html="description" />
                    <div v-if="links?.length" class="flex flex-wrap gap-3">
                        <NuxtLink
                            v-for="(link, i) in links"
                            :key="link.label"
                            :to="link.to"
                            :target="link.target || (isExternal(link.to) ? '_blank' : undefined)"
                            class="h26-lift rounded-lg px-6 py-3.5 font-bold"
                            :class="i === 0 ? 'bg-paper text-dokos-500' : 'border-[1.5px] border-white text-white'"
                        >
                            {{ link.label }}
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
