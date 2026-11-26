<script setup lang="ts">
// « Comment nous travaillons ensemble »: a statement, its title on the left and
// its paragraphs on the right, the first one larger. On the cream by default;
// `tone="blue"` lays it in a Dokos blue card, for the block that should stand out.

defineProps<{
    block: { title: string; paragraphs: string[] };
    tone?: 'paper' | 'blue';
}>()
</script>

<template>
    <section class="bg-paper" :class="tone === 'blue' ? 'px-2 pb-10 sm:px-6 sm:pb-14 lg:px-14' : ''">
        <div :class="tone === 'blue' ? 'rounded-2xl bg-dokos-500 text-white' : 'text-dokos-500'">
            <div class="mx-auto flex max-w-[1360px] flex-wrap items-start gap-x-16 gap-y-8 px-4 sm:px-8" :class="tone === 'blue' ? 'py-24 sm:py-28' : 'py-24 sm:py-32'">
                <h2 class="h26-reveal-x flex-[1_1_520px] text-[clamp(2.75rem,6vw,5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]">
                    {{ block.title }}<span class="text-accent">.</span>
                </h2>
                <div class="flex flex-[1_1_440px] flex-col gap-6 lg:pt-3">
                    <p
                        v-for="(paragraph, i) in block.paragraphs"
                        :key="i"
                        class="h26-reveal leading-relaxed"
                        :class="[
                            i === 0 ? 'text-2xl font-bold leading-snug' : 'text-lg',
                            tone === 'blue' ? (i === 0 ? 'text-white' : 'text-dokos-100') : (i === 0 ? 'text-dokos-500' : 'text-stone-600'),
                        ]"
                    >
                        {{ paragraph }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>
