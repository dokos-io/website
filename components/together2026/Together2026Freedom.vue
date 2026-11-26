<script setup lang="ts">
// « Comment nous travaillons ensemble »: a title, an optional introduction and
// a numbered ruled list. In the deep blue card of the homepage AI block by
// default (the rights the licence gives); `tone="paper"` lays it on the cream
// (what we do for you). An optional photo sits beside the list, which then
// stacks in one column; an optional link closes the block.

defineProps<{
    block: {
        title: string;
        description?: string;
        items: { title: string; text: string }[];
        image?: { src: string; alt: string };
        link?: { label: string; to: string };
    };
    tone?: 'navy' | 'paper';
}>()
</script>

<template>
    <section class="bg-paper" :class="tone === 'paper' ? '' : 'px-2 pb-10 sm:px-6 sm:pb-14 lg:px-14'">
        <div :class="tone === 'paper' ? 'text-dokos-500' : 'rounded-2xl bg-dokos-900 text-white'">
            <div class="mx-auto flex max-w-[1360px] flex-col gap-12 px-4 sm:px-8" :class="tone === 'paper' ? 'py-24 sm:py-32' : 'py-24 sm:py-28'">
                <div class="flex flex-wrap items-end gap-x-16 gap-y-6">
                    <h2 class="h26-reveal-x flex-[1_1_640px] text-[clamp(2.75rem,6vw,5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]">
                        {{ block.title }}<span class="text-accent">.</span>
                    </h2>
                    <p v-if="block.description" class="h26-reveal flex-[1_1_360px] text-lg leading-relaxed" :class="tone === 'paper' ? 'text-stone-600' : 'text-dokos-100'">{{ block.description }}</p>
                </div>
                <div :class="block.image ? 'grid items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]' : ''">
                <img v-if="block.image" :src="block.image.src" :alt="block.image.alt" class="h26-reveal aspect-[4/3] w-full rounded-2xl object-cover object-[50%_25%] shadow-[0_18px_40px_rgba(43,42,39,0.16)]" loading="lazy">
                <!-- Beside a photo, one column; otherwise two items share the row in halves, three in thirds. -->
                <ol class="h26-reveal grid gap-x-10" :class="block.image ? '' : block.items.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'">
                    <li v-for="(item, i) in block.items" :key="item.title" class="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t-[1.5px] py-6" :class="tone === 'paper' ? 'border-dokos-500' : 'border-white/40'">
                        <span class="font-typed text-lg text-accent">{{ String(i + 1).padStart(2, '0') }}</span>
                        <span class="flex flex-col gap-2">
                            <b class="text-2xl font-extrabold tracking-[-0.02em]">{{ item.title }}</b>
                            <span class="text-lg leading-relaxed" :class="tone === 'paper' ? 'text-stone-600' : 'text-dokos-100'">{{ item.text }}</span>
                        </span>
                    </li>
                </ol>
                </div>
                <NuxtLink v-if="block.link" :to="block.link.to" class="h26-reveal w-fit py-2 font-bold hover:underline">{{ block.link.label }} →</NuxtLink>
            </div>
        </div>
    </section>
</template>
