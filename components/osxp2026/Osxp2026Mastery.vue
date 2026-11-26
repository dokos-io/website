<script setup lang="ts">
// Open Source Experience 2026, right after the band: the entry ticket for a
// large group (read the code, know where the data is, be free to leave), dealt
// with quickly, as three facts in a ruled list on the cream.

defineProps<{
    block: {
        title: string;
        description: string;
        items: { title: string; text: string }[];
        link?: { label: string; to: string };
    };
}>()
</script>

<template>
    <section class="bg-paper">
        <div class="mx-auto flex max-w-[1360px] flex-col gap-14 px-4 py-24 sm:px-8 sm:py-32">
            <div class="flex flex-wrap items-end gap-x-16 gap-y-6">
                <h2 class="h26-reveal-x flex-[1_1_640px] text-[clamp(3rem,7vw,6rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em] text-dokos-500">
                    {{ block.title }}<span class="text-accent">.</span>
                </h2>
                <p class="h26-reveal flex-[1_1_360px] text-lg leading-relaxed text-stone-600">{{ block.description }}</p>
            </div>
            <ol class="h26-reveal grid gap-x-10 lg:grid-cols-3">
                <li v-for="(item, i) in block.items" :key="item.title" class="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t-[1.5px] border-dokos-500 py-6">
                    <span class="font-typed text-lg text-accent">{{ String(i + 1).padStart(2, '0') }}</span>
                    <span class="flex flex-col gap-2">
                        <b class="text-2xl font-extrabold tracking-[-0.02em] text-dokos-500">{{ item.title }}</b>
                        <span class="text-lg leading-relaxed text-stone-600">{{ item.text }}</span>
                    </span>
                </li>
            </ol>
            <NuxtLink v-if="block.link" :to="block.link.to" class="h26-reveal w-fit py-2 font-bold text-dokos-500 hover:underline">{{ block.link.label }} →</NuxtLink>
        </div>
    </section>
</template>
