<script setup lang="ts">
// Open Source Experience 2026, the closing card in Dokos blue, like "Par où
// commencer" on the homepage: where and when (a ruled cartouche), the two talks
// as white sheets, the demos on Orange's stand, then an invitation to drop by
// (no booking: we do not run a schedule) and links to the previous editions.
// The hero's "Nous retrouver sur le stand" points here (#stand).

defineProps<{
    block: {
        title: string;
        info: { label: string; value: string }[];
        talks_title: string;
        talks: { title: string; when: string; room: string; format: string; description: string; to: string }[];
        demos_title: string;
        demos: string[];
        cta: { title: string; text: string; links: { label: string; to: string; target?: string }[] };
        previous?: { label: string; links: { label: string; to: string }[] };
    };
}>()
</script>

<template>
    <section id="stand" class="scroll-mt-20 bg-paper px-2 pb-2 sm:px-6 sm:pb-6 lg:px-14 lg:pb-14">
        <div class="rounded-2xl bg-dokos-500 text-white">
            <div class="mx-auto flex max-w-[1360px] flex-col gap-16 px-4 pt-24 pb-16 sm:px-8 sm:pt-28 sm:pb-20">
                <h2 class="h26-reveal-x text-[clamp(3rem,7vw,6rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]">
                    {{ block.title }}<span class="text-accent">.</span>
                </h2>

                <div class="grid items-start gap-12 lg:grid-cols-[22rem_1fr]">
                    <dl class="h26-reveal border-b-[1.5px] border-white/40">
                        <div v-for="row in block.info" :key="row.label" class="flex flex-col gap-1 border-t-[1.5px] border-white/40 py-4">
                            <dt class="font-typed text-sm text-accent-secondary">{{ row.label }}</dt>
                            <dd class="text-lg font-bold">{{ row.value }}</dd>
                        </div>
                    </dl>

                    <div class="flex flex-col gap-5">
                        <p class="h26-reveal font-typed text-accent-secondary">{{ block.talks_title }}</p>
                        <div class="grid gap-6 xl:grid-cols-2">
                            <a
                                v-for="talk in block.talks"
                                :key="talk.to"
                                :href="talk.to"
                                target="_blank"
                                class="h26-reveal h26-lift flex flex-col gap-3 bg-white px-7 pt-6 pb-7 text-ink shadow-[0_24px_60px_rgba(0,0,0,0.3)]"
                            >
                                <span class="font-typed text-sm text-stone-600">{{ talk.format }} · {{ talk.when }} · {{ talk.room }}</span>
                                <b class="text-2xl font-extrabold leading-tight tracking-[-0.02em] text-dokos-500">{{ talk.title }}</b>
                                <span class="text-stone-600">{{ talk.description }}</span>
                                <span class="mt-auto pt-2 font-bold text-dokos-500">Le programme →</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="h26-reveal flex flex-col gap-4">
                    <p class="font-typed text-accent-secondary">{{ block.demos_title }}</p>
                    <ul class="grid gap-x-10 lg:grid-cols-3">
                        <li v-for="demo in block.demos" :key="demo" class="border-t-[1.5px] border-white/40 py-5 text-lg">{{ demo }}</li>
                    </ul>
                </div>

                <div class="h26-reveal flex flex-wrap items-end justify-between gap-x-12 gap-y-6 border-t-[1.5px] border-white/40 pt-10">
                    <div class="flex max-w-2xl flex-col gap-3">
                        <p class="text-3xl font-extrabold tracking-[-0.02em]">{{ block.cta.title }}</p>
                        <p class="text-lg leading-relaxed text-dokos-100">{{ block.cta.text }}</p>
                    </div>
                    <div class="flex flex-wrap gap-3">
                        <NuxtLink
                            v-for="(link, i) in block.cta.links"
                            :key="link.label"
                            :to="link.to"
                            :target="link.target"
                            class="h26-lift rounded-lg px-6 py-3.5 font-bold"
                            :class="i === 0 ? 'bg-paper text-dokos-500' : 'border-[1.5px] border-white text-white'"
                        >
                            {{ link.label }}
                        </NuxtLink>
                    </div>
                </div>

                <p v-if="block.previous" class="h26-reveal flex flex-wrap items-center gap-x-3 gap-y-1 font-typed">
                    <span class="text-accent-secondary">{{ block.previous.label }} :</span>
                    <template v-for="(link, i) in block.previous.links" :key="link.to">
                        <NuxtLink :to="link.to" class="py-1 font-bold underline underline-offset-4 hover:text-accent-secondary">{{ link.label }}</NuxtLink>
                        <span v-if="i < block.previous.links.length - 1" class="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                    </template>
                </p>
            </div>
        </div>
    </section>
</template>
