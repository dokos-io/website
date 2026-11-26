<script setup lang="ts">
// 2026 closing call: the Dokos blue card that ends every 2026 page.

const props = defineProps<{
    title: string;
    description?: string;
    links?: { label: string; to: string; target?: string }[];
}>()

const isExternal = (to: string) => /^https?:/.test(to)
const title = computed(() => (props.title || '').trim().replace(/\.(\s*(<\/[a-z]+>)*)$/i, '$1'))
</script>

<template>
    <section class="bg-paper px-2 pt-10 pb-2 sm:px-6 sm:pb-6 lg:px-14 lg:pb-14">
        <div class="rounded-2xl bg-dokos-500 text-white">
            <div class="mx-auto flex max-w-[1360px] flex-wrap items-end justify-between gap-x-16 gap-y-8 px-4 py-20 sm:px-8 sm:py-24">
                <div class="flex max-w-3xl flex-col gap-5">
                    <h2 class="h26-reveal-x text-[clamp(2.25rem,4.5vw,3.75rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] [&_.text-primary]:text-inherit">
                        <span v-html="title" /><span class="text-accent">.</span>
                    </h2>
                    <p v-if="description" class="h26-reveal text-lg leading-relaxed text-dokos-100" v-html="description" />
                </div>
                <div v-if="links?.length" class="h26-reveal flex flex-wrap gap-3">
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
    </section>
</template>
