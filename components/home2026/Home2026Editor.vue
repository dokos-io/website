<script setup lang="ts">
// 2026 homepage, "Ce qu'il y a dessous": what Dokos rests on, for the visitor
// who wonders what happens if the publisher disappears. On the left, ERPNext,
// what we add to it and the dated facts; on the right, the layers as a ruled
// list, like "Par où commencer", each saying who writes it. The team's letter
// and our commitments belong to the page on how we work together.

defineProps<{
    block: {
        title: string;
        paragraphs: string[];
        facts?: string[];
        layers: { title: string; by?: string; note: string; to?: string }[];
        links?: { label: string; to: string; target?: string }[];
    };
}>()
</script>

<template>
    <section class="bg-paper">
        <div class="mx-auto flex max-w-[1360px] flex-wrap items-start gap-16 px-4 py-24 sm:px-8 sm:py-32">
            <div class="flex min-w-0 flex-[1_1_520px] flex-col gap-7">
                <h2 class="h26-reveal-x text-[clamp(3rem,7vw,6rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em] text-dokos-500">
                    {{ block.title }}<span class="text-accent">.</span>
                </h2>
                <p
                    v-for="(paragraph, i) in block.paragraphs"
                    :key="i"
                    class="h26-reveal max-w-xl text-lg leading-relaxed"
                    :class="i === 0 ? 'text-dokos-500' : 'text-stone-600'"
                >
                    {{ paragraph }}
                </p>
                <ul v-if="block.facts?.length" class="h26-reveal flex flex-wrap items-center gap-x-4 gap-y-2 font-typed text-dokos-500">
                    <li v-for="(fact, i) in block.facts" :key="fact" class="flex items-center gap-4">
                        <span>{{ fact }}</span>
                        <span v-if="i < block.facts.length - 1" class="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                    </li>
                </ul>
                <div v-if="block.links?.length" class="h26-reveal flex flex-wrap gap-x-6 gap-y-2 font-bold">
                    <NuxtLink
                        v-for="link in block.links"
                        :key="link.to"
                        :to="link.to"
                        :target="link.target"
                        class="py-2 text-dokos-500 hover:underline"
                    >
                        {{ link.label }} →
                    </NuxtLink>
                </div>
            </div>

            <ul class="h26-reveal min-w-0 flex-[1_1_420px] border-b-[1.5px] border-dokos-500 lg:mt-6">
                <li v-for="layer in block.layers" :key="layer.title" class="border-t-[1.5px] border-dokos-500">
                    <component
                        :is="layer.to ? resolveComponent('NuxtLink') : 'div'"
                        :to="layer.to"
                        class="flex flex-col gap-1 py-6 text-dokos-500"
                        :class="layer.to ? 'hover:text-dokos-700' : ''"
                    >
                        <span class="text-3xl font-extrabold tracking-[-0.02em]">{{ layer.title }}</span>
                        <span v-if="layer.by" class="font-typed text-sm text-stone-600">{{ layer.by }}</span>
                        <span class="mt-1 text-stone-600">{{ layer.note }}<span v-if="layer.to" class="ml-1.5 font-bold text-dokos-500">→</span></span>
                    </component>
                </li>
            </ul>
        </div>
    </section>
</template>
