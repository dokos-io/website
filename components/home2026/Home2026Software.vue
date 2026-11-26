<script setup lang="ts">
// 2026 homepage, after the plan: what Dokos automates without AI. One deal,
// followed from the quote to the payment, its steps lighting up in turn; under
// each step, what Dokos does there. The "Dokos s'en charge" label
// is written once, over the first step, and kept as a placeholder on the
// others so the lines stay aligned.

defineProps<{
    block: {
        title: string;
        description: string;
        does_label: string;
        steps: { title: string; number: string; does: string }[];
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

            <ol class="h26-reveal grid grid-cols-2 gap-x-8 border-t-[1.5px] border-dokos-500 sm:grid-cols-3 lg:grid-cols-6">
                <li
                    v-for="(step, i) in block.steps"
                    :key="step.title"
                    class="flex flex-col gap-3 border-b border-stone-300 py-6 lg:border-b-0"
                    :style="{ '--d': `${i}s`, '--n': block.steps.length }"
                >
                    <span class="font-typed text-sm text-stone-600">{{ step.number }}</span>
                    <span class="flex items-baseline justify-between gap-2 text-3xl font-extrabold tracking-[-0.02em] text-dokos-500">
                        <span class="h26-step">{{ step.title }}</span>
                        <span v-if="i < block.steps.length - 1" class="hidden text-xl font-normal text-stone-400 lg:inline" aria-hidden="true">→</span>
                    </span>
                    <span
                        class="border-t border-dashed border-stone-300 pt-3 font-typed text-sm font-bold uppercase tracking-[0.06em] text-accent"
                        :class="{ 'select-none text-transparent': i > 0 }"
                        :aria-hidden="i > 0 || undefined"
                    >{{ block.does_label }}</span>
                    <span class="text-lg leading-snug text-stone-700">{{ step.does }}</span>
                </li>
            </ol>
        </div>
    </section>
</template>

<style scoped>
/* Each step glows in turn: 1 s per step over a cycle of n steps. */
.h26-step {
    text-decoration: underline;
    text-decoration-thickness: 3px;
    text-underline-offset: 8px;
    text-decoration-color: transparent;
    animation: h26-step calc(var(--n) * 1s) var(--d) infinite;
}
@keyframes h26-step {
    0%, 12% { color: var(--color-accent); text-decoration-color: var(--color-accent); }
    22%, 100% { color: inherit; text-decoration-color: transparent; }
}
@media (prefers-reduced-motion: reduce) {
    .h26-step { animation: none; }
}
</style>
