<script setup lang="ts">
// Open Source Experience 2026: what it gives at Orange, with the SECOIA OI
// project and the Conectt product. Four chapters, one per question a large
// account asks, each told the same way (the need, what the framework allows,
// what we did, the result). The Conectt video answers all four, so it comes
// first, right after the introduction. It is hosted on the site and silent,
// so it starts muted and only loads once the visitor presses play. Passages
// still to write start with "À compléter" and show in coral, so nothing
// unfinished goes unnoticed.

type Chapter = { title: string; need: string; framework: string; done: string; result: string }

defineProps<{
    block: {
        label: string;
        title: string;
        description: string;
        video?: { src: string; poster?: string; title: string };
        steps: { need: string; framework: string; done: string; result: string };
        items: Chapter[];
    };
}>()

const KEYS = ['need', 'framework', 'done', 'result'] as const
const isTodo = (text: string) => text.startsWith('À compléter')
</script>

<template>
    <section class="bg-paper">
        <div class="mx-auto flex max-w-[1360px] flex-col gap-14 px-4 py-24 sm:px-8 sm:py-32">
            <div class="flex flex-col gap-6">
                <p class="h26-reveal font-typed text-dokos-500">{{ block.label }}</p>
                <div class="flex flex-wrap items-end gap-x-16 gap-y-6">
                    <h2 class="h26-reveal-x flex-[1_1_640px] text-[clamp(3rem,7vw,6rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em] text-dokos-500">
                        {{ block.title }}<span class="text-accent">.</span>
                    </h2>
                    <p class="h26-reveal flex-[1_1_360px] text-lg leading-relaxed text-stone-600">{{ block.description }}</p>
                </div>
            </div>

            <div v-if="block.video" class="h26-reveal aspect-video w-full max-w-5xl overflow-hidden rounded-xl bg-dokos-900 shadow-[0_18px_40px_rgba(43,42,39,0.16)]">
                <video
                    class="size-full object-contain"
                    :src="block.video.src"
                    :poster="block.video.poster"
                    :aria-label="block.video.title"
                    controls
                    muted
                    playsinline
                    preload="none"
                />
            </div>

            <div class="border-b-[1.5px] border-dokos-500">
                <article v-for="(chapter, i) in block.items" :key="chapter.title" class="h26-reveal flex flex-col gap-8 border-t-[1.5px] border-dokos-500 py-10">
                    <div class="flex items-baseline gap-5">
                        <span class="font-typed text-lg text-accent">{{ String(i + 1).padStart(2, '0') }} / {{ String(block.items.length).padStart(2, '0') }}</span>
                        <h3 class="text-3xl font-extrabold tracking-[-0.02em] text-dokos-500 sm:text-4xl">{{ chapter.title }}</h3>
                    </div>
                    <dl class="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div v-for="key in KEYS" :key="key" class="flex flex-col gap-2">
                            <dt class="font-typed text-sm text-stone-600">{{ block.steps[key] }}</dt>
                            <dd
                                class="leading-relaxed"
                                :class="isTodo(chapter[key])
                                    ? 'border border-dashed border-accent px-3 py-2 font-typed text-sm text-accent'
                                    : 'text-lg text-stone-700'"
                            >
                                {{ chapter[key] }}
                            </dd>
                        </div>
                    </dl>
                </article>
            </div>
        </div>
    </section>
</template>
