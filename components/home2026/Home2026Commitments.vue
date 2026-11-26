<script setup lang="ts">
// 2026 homepage: what you can expect from us, one large line per commitment.
// A line fills with Dokos blue on hover and its picture tilts.

defineProps<{
    block: {
        label: string;
        link?: { label: string; to: string };
        items: { title: string; description: string; image?: string }[];
    };
}>()
</script>

<template>
    <section class="bg-paper">
        <div class="mx-auto max-w-[1360px] px-4 pb-24 sm:px-8 sm:pb-32">
            <div class="h26-reveal flex flex-wrap items-end justify-between gap-4 pb-7">
                <h2 class="font-typed text-base text-stone-600">{{ block.label }}</h2>
                <NuxtLink v-if="block.link" :to="block.link.to" class="py-2 font-bold text-dokos-500 hover:underline">{{ block.link.label }}</NuxtLink>
            </div>
            <ul class="border-b-[1.5px] border-dokos-500">
                <li v-for="item in block.items" :key="item.title" class="h26-reveal border-t-[1.5px] border-dokos-500">
                    <div class="h26-row flex flex-wrap items-center gap-x-12 gap-y-4 rounded-2xl py-7 text-dokos-500">
                        <h3 class="flex-[1_1_520px] text-[clamp(2rem,4.6vw,3.75rem)] font-extrabold uppercase leading-none tracking-[-0.035em]">{{ item.title }}</h3>
                        <p class="h26-row-text flex-[1_1_280px] text-stone-600">{{ item.description }}</p>
                        <img
                            v-if="item.image"
                            :src="item.image"
                            alt=""
                            class="h26-thumb h-[150px] w-[240px] flex-none rounded-lg object-cover object-[50%_30%]"
                            loading="lazy"
                        >
                        <span v-else class="hidden w-[240px] flex-none lg:block" />
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<style scoped>
.h26-row { transition: background-color 0.35s ease, color 0.35s ease, padding 0.35s ease; }
.h26-row-text { transition: color 0.35s ease; }
.h26-thumb { transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1); }
.h26-row:hover { background: var(--color-dokos-500); color: var(--color-paper); padding-inline: 28px; }
.h26-row:hover .h26-row-text { color: var(--color-dokos-100); }
.h26-row:hover .h26-thumb { transform: rotate(-4deg) scale(1.08); }
@media (prefers-reduced-motion: reduce) {
    .h26-row, .h26-row-text, .h26-thumb { transition: none; }
}
</style>
