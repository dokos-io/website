<script setup lang="ts">
// « Comment nous travaillons ensemble »: the course of a project, in Dokos
// blue like the homepage plan, as numbered steps in a row on large screens,
// joined by arrows, one under the other on a phone.

defineProps<{
    block: {
        title: string;
        items: { title: string; text: string }[];
    };
}>()
</script>

<template>
    <section class="bg-paper px-2 sm:px-6 lg:px-14">
        <div class="rounded-2xl bg-dokos-500 text-white">
            <div class="mx-auto flex max-w-[1360px] flex-col gap-14 px-4 py-24 sm:px-8 sm:py-28">
                <h2 class="h26-reveal-x text-[clamp(2.75rem,6vw,5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]">
                    {{ block.title }}<span class="text-accent">.</span>
                </h2>
                <ol class="h26-reveal grid gap-x-8 sm:grid-cols-2 lg:grid-cols-5">
                    <li v-for="(step, i) in block.items" :key="step.title" class="flex flex-col gap-3 border-t-[1.5px] border-white/40 py-6">
                        <span class="flex items-baseline justify-between font-typed text-accent-secondary">
                            <span>{{ String(i + 1).padStart(2, '0') }}</span>
                            <span v-if="i < block.items.length - 1" class="hidden text-white/50 lg:inline" aria-hidden="true">→</span>
                        </span>
                        <b class="text-2xl font-extrabold leading-tight tracking-[-0.02em]">{{ step.title }}</b>
                        <span class="leading-relaxed text-dokos-100">{{ step.text }}</span>
                    </li>
                </ol>
            </div>
        </div>
    </section>
</template>
