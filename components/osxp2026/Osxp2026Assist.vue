<script setup lang="ts">
// Open Source Experience 2026: why AI can plug into Dokos, in the same deep
// blue card as the homepage AI block, kept short: the same rights and API for
// people and agents, the MCP server, and the same mechanism for any size.

defineProps<{
    block: {
        title: string;
        paragraphs: string[];
        link?: { label: string; to: string };
    };
}>()
</script>

<template>
    <section class="bg-paper px-2 pb-10 sm:px-6 sm:pb-14 lg:px-14">
        <div class="rounded-2xl bg-dokos-900 text-white">
            <div class="mx-auto flex max-w-[1360px] flex-wrap items-start gap-x-16 gap-y-8 px-4 py-24 sm:px-8 sm:py-28">
                <h2 class="h26-reveal-x flex-[1_1_480px] text-[clamp(3rem,7vw,6rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]">
                    {{ block.title }}<span class="text-accent">.</span>
                </h2>
                <div class="flex flex-[1_1_440px] flex-col gap-5 lg:pt-4">
                    <p v-for="(paragraph, i) in block.paragraphs" :key="i" class="h26-reveal max-w-xl text-lg leading-relaxed" :class="i === 0 ? 'text-white' : 'text-dokos-100'">
                        {{ paragraph }}
                    </p>
                    <NuxtLink v-if="block.link" :to="block.link.to" class="h26-reveal w-fit py-2 font-bold hover:underline">{{ block.link.label }} →</NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>
