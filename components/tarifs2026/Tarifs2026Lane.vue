<script setup lang="ts">
// Pricing page, one offer: its precise name in small, its plain name, its promise,
// the advice on which formula to start with (when given), what it covers, the price
// table and its call to action. The highlighted offer sits in a Dokos blue card
// like the homepage's key blocks; the others lie on the cream with ruled
// tables. Long tables scroll sideways on a phone instead of squeezing.

type Link = { label: string; to: string; target?: string }

const props = defineProps<{
    lane: {
        id: string;
        kicker?: string;
        name: string;
        tagline: string;
        highlight?: boolean;
        caution?: string;
        advice?: string;
        columns: string[];
        rows: string[][];
        footnote?: string;
        cta?: Link;
    };
}>()

const isExternal = (to: string) => /^https?:/.test(to)
const dark = computed(() => !!props.lane.highlight)
</script>

<template>
    <section :id="lane.id" class="scroll-mt-24 bg-paper" :class="dark ? 'px-2 sm:px-6 lg:px-14' : ''">
        <div :class="dark ? 'rounded-2xl bg-dokos-500 text-white' : 'text-dokos-500'">
            <div class="mx-auto flex max-w-[1360px] flex-col gap-10 px-4 sm:px-8" :class="dark ? 'py-20 sm:py-24' : 'py-16 sm:py-20'">
                <p v-if="lane.kicker" class="h26-reveal -mb-6 font-typed" :class="dark ? 'text-accent-secondary' : 'text-stone-600'">{{ lane.kicker }}</p>
                <div class="flex flex-wrap items-end gap-x-16 gap-y-4">
                    <h2 class="h26-reveal-x flex-[1_1_560px] text-[clamp(2.25rem,4.5vw,3.75rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.035em]">
                        {{ lane.name }}<span class="text-accent">.</span>
                    </h2>
                    <p class="h26-reveal flex-[1_1_360px] text-xl font-bold leading-snug">{{ lane.tagline }}</p>
                </div>

                <p v-if="lane.caution" class="h26-reveal max-w-3xl text-lg leading-relaxed" :class="dark ? 'text-dokos-100' : 'text-stone-600'">{{ lane.caution }}</p>

                <p
                    v-if="lane.advice"
                    class="h26-reveal max-w-3xl border-l-4 border-accent pl-5 text-lg font-bold leading-relaxed"
                >
                    {{ lane.advice }}
                </p>

                <div class="h26-reveal -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
                    <table class="w-full min-w-[40rem] border-b-[1.5px] text-left" :class="dark ? 'border-white/40' : 'border-dokos-500'">
                        <thead>
                            <tr>
                                <th
                                    v-for="column in lane.columns"
                                    :key="column"
                                    scope="col"
                                    class="pb-3 pr-6 font-typed text-sm font-normal"
                                    :class="dark ? 'text-accent-secondary' : 'text-stone-600'"
                                >
                                    {{ column }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in lane.rows" :key="row.join()" class="border-t-[1.5px]" :class="dark ? 'border-white/40' : 'border-dokos-500'">
                                <td
                                    v-for="(cell, c) in row"
                                    :key="c"
                                    class="py-4 pr-6"
                                    :class="[
                                        c === 0 ? 'whitespace-nowrap text-xl font-extrabold tracking-[-0.01em]' : (dark ? 'text-dokos-100' : 'text-stone-700'),
                                        lane.columns[c] && c === 1 && /Pour qui|Who it is for/.test(lane.columns[c]!) ? 'max-w-[22rem]' : '',
                                    ]"
                                >
                                    {{ cell }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p v-if="lane.footnote" class="h26-reveal max-w-4xl leading-relaxed" :class="dark ? 'text-dokos-100' : 'text-stone-600'">{{ lane.footnote }}</p>

                <NuxtLink
                    v-if="lane.cta"
                    :to="lane.cta.to"
                    :target="lane.cta.target ?? (isExternal(lane.cta.to) ? '_blank' : undefined)"
                    class="h26-reveal h26-lift w-fit rounded-lg px-6 py-3.5 font-bold"
                    :class="dark ? 'bg-paper text-dokos-500' : 'border-[1.5px] border-dokos-500 text-dokos-500'"
                >
                    {{ lane.cta.label }} →
                </NuxtLink>
            </div>
        </div>
    </section>
</template>
