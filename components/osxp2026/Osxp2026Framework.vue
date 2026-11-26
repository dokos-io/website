<script setup lang="ts">
// Open Source Experience 2026, the heart of the page: why the way Frappe is
// built matters to a CIO. On a blueprint card, like the homepage plan: on the
// left, one business object described once, as a white sheet; on the right,
// everything the framework then provides, lighting up one after the other.

defineProps<{
    block: {
        title: string;
        description: string;
        example: { label: string; title: string; fields: string[] };
        outputs_label: string;
        outputs: string[];
    };
}>()
</script>

<template>
    <section class="bg-paper px-2 sm:px-6 lg:px-14">
        <div class="osx-blueprint overflow-hidden rounded-2xl bg-dokos-500 text-white">
            <div class="mx-auto flex max-w-[1360px] flex-col gap-16 px-4 py-24 sm:px-8 sm:py-32">
                <div class="flex flex-wrap items-end gap-x-16 gap-y-6">
                    <h2 class="h26-reveal-x flex-[1_1_640px] text-[clamp(3rem,7vw,6rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]">
                        {{ block.title }}<span class="text-accent">.</span>
                    </h2>
                    <p class="h26-reveal flex-[1_1_360px] text-lg leading-relaxed text-dokos-100">{{ block.description }}</p>
                </div>

                <div class="h26-reveal grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_auto_minmax(0,7fr)]">
                    <figure class="bg-white px-7 pt-6 pb-7 text-ink shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                        <figcaption class="flex flex-col gap-1 border-b border-sand-300 pb-4">
                            <span class="font-typed text-sm text-stone-600">{{ block.example.label }}</span>
                            <b class="text-2xl font-extrabold tracking-[-0.02em] text-dokos-500">{{ block.example.title }}</b>
                        </figcaption>
                        <ul class="mt-2">
                            <li v-for="field in block.example.fields" :key="field" class="border-b border-dashed border-sand-400 py-2.5 font-typed text-dokos-500">
                                {{ field }}
                            </li>
                        </ul>
                    </figure>

                    <UIcon name="i-heroicons-arrow-right" class="hidden size-10 justify-self-center text-accent-secondary lg:block" aria-hidden="true" />
                    <UIcon name="i-heroicons-arrow-down" class="size-10 justify-self-center text-accent-secondary lg:hidden" aria-hidden="true" />

                    <div class="flex flex-col gap-4">
                        <p class="font-typed text-accent-secondary">{{ block.outputs_label }}</p>
                        <ol class="grid gap-x-8 sm:grid-cols-2">
                            <li
                                v-for="(output, i) in block.outputs"
                                :key="output"
                                class="osx-output border-t-[1.5px] border-white/30 py-4 text-lg font-bold"
                                :style="{ '--d': `${i * 0.8}s`, '--n': block.outputs.length }"
                            >
                                {{ output }}
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Same drawing paper as the homepage plan. */
.osx-blueprint {
    background-image:
        linear-gradient(rgba(168, 230, 207, 0.14) 1px, transparent 1px),
        linear-gradient(90deg, rgba(168, 230, 207, 0.14) 1px, transparent 1px),
        linear-gradient(rgba(168, 230, 207, 0.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(168, 230, 207, 0.06) 1px, transparent 1px);
    background-size: 120px 120px, 120px 120px, 24px 24px, 24px 24px;
}
/* Each output lights up in turn, 0.8 s apart, over one cycle of n outputs. */
.osx-output { animation: osx-output calc(var(--n) * 0.8s) var(--d) infinite; }
@keyframes osx-output {
    0%, 14% { color: var(--color-accent); border-top-color: var(--color-accent); }
    24%, 100% { color: inherit; }
}
@media (prefers-reduced-motion: reduce) {
    .osx-output { animation: none; }
}
</style>
