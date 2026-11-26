<script setup lang="ts">
// 2026 homepage, between "Ce qu'il y a dessous" and "Par où commencer", where a
// visitor looks for client logos: one typed line on sand, like the news band,
// a wink at business secrecy, then a link to ask us about our references.
// Inset like the cards around it.

defineProps<{
    block: { text?: string; link: { label: string; to: string } };
}>()
</script>

<template>
    <section class="bg-paper px-2 pb-10 sm:px-6 sm:pb-14 lg:px-14">
        <p class="h26-reveal mx-auto flex max-w-[1360px] flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-2xl bg-sand-400 px-6 py-6 text-center font-typed text-dokos-500">
            <span class="size-2.5 flex-none rounded-full bg-accent" aria-hidden="true" />
            <span v-if="block.text">{{ block.text }}</span>
            <NuxtLink :to="block.link.to" class="font-bold underline underline-offset-4 hover:text-dokos-700">{{ block.link.label }} →</NuxtLink>
        </p>
    </section>
</template>
