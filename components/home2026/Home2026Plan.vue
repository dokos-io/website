<script setup lang="ts">
// 2026 homepage, "Tout au même endroit": the company drawn as an architect's
// blueprint, white and mint strokes on Dokos blue. Dokos sits in the middle and
// every room of the plan is wired to it. When the plan comes into view, each
// room takes its turn: the visitor's question is typed, the wire to the room
// lights up, then the answer appears, with the apps involved. No screenshot:
// the text and the plan carry the room. One round, then the visitor picks
// rooms by clicking them. Reduced motion shows the first room, finished, and
// keeps the clicks.

type Room = {
    key: string;
    title: string;
    question: string;
    answer: string;
    apps?: string;
    link?: { label: string; to: string };
}

const props = defineProps<{
    block: {
        title: string;
        description: string;
        sheet: { project: string; drawn_by: string; scale: string; number: string; foundations?: string };
        core: { title: string; note?: string };
        rooms: Room[];
        hint?: string;
        connections?: { label: string; title: string; icons?: string[]; images?: string[] };
        soon?: string;
        link?: { label: string; to: string };
    };
}>()

// Rooms sit clockwise around the core, the first one at the top, on a square
// drawing of 100 × 100 units.
const nodes = computed(() => props.block.rooms.map((room, i) => {
    const angle = (-90 + (i * 360) / props.block.rooms.length) * (Math.PI / 180)
    return { ...room, x: 50 + 34 * Math.cos(angle), y: 50 + 38 * Math.sin(angle) }
}))

// How long each answer stays on screen during the tour, once its question is typed.
const READING_TIME = 12000

const active = ref(0)
const shown = ref(props.block.rooms[0]?.question.length ?? 0)
const typing = ref(false)
const autoplay = ref(false)
let typer: ReturnType<typeof setInterval> | undefined
let next: ReturnType<typeof setTimeout> | undefined

const current = computed(() => nodes.value[active.value]!)
const typed = computed(() => current.value.question.slice(0, shown.value))
const rest = computed(() => current.value.question.slice(shown.value))
const number = (i: number) => `P.${String(i + 1).padStart(2, '0')}`

function stop() {
    clearInterval(typer)
    clearTimeout(next)
}

function show(i: number, speed = 35) {
    stop()
    active.value = i
    const length = props.block.rooms[i]!.question.length
    if (reduced.value) {
        shown.value = length
        typing.value = false
        return
    }
    shown.value = 0
    typing.value = true
    typer = setInterval(() => {
        if (shown.value >= length) {
            clearInterval(typer)
            typing.value = false
            if (autoplay.value) next = setTimeout(advance, READING_TIME)
            return
        }
        shown.value++
    }, speed)
}

// The tour stops on the last room; from there the visitor leads.
function advance() {
    if (active.value + 1 >= props.block.rooms.length) {
        autoplay.value = false
        return
    }
    show(active.value + 1)
}

function pick(i: number) {
    autoplay.value = false
    show((i + props.block.rooms.length) % props.block.rooms.length, 22)
}

const glowId = `h26-glow-${useId()}`

const root = ref<HTMLElement | null>(null)
// The tour only runs on wide screens, where the plan sits beside the answer. On
// a phone the answer would change under the visitor's thumb and push the page.
const { reduced } = useInViewOnce(root, () => {
    if (reduced.value || !window.matchMedia('(min-width: 1024px)').matches) return
    autoplay.value = true
    show(0)
}, 0.35)

onBeforeUnmount(stop)
</script>

<template>
    <!-- An inset card like the AI and closing blocks: only the marquee runs from edge to edge. -->
    <section ref="root" class="bg-paper px-2 sm:px-6 lg:px-14 lg:pt-10" :class="{ 'is-static': reduced }">
        <div class="h26-blueprint overflow-hidden rounded-2xl bg-dokos-500 text-white">
            <div class="mx-auto flex max-w-[1360px] flex-col gap-12 px-4 py-24 sm:px-8 sm:py-32">
                <div class="flex flex-wrap items-end gap-x-16 gap-y-6">
                    <h2 class="h26-reveal-x flex-[1_1_640px] text-[clamp(3rem,7vw,6rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]">
                        {{ block.title }}<span class="text-accent">.</span>
                    </h2>
                    <p class="h26-reveal flex-[1_1_360px] text-lg leading-relaxed text-dokos-100">{{ block.description }}</p>
                </div>

                <!-- The sheet: a double frame, as on a printed plan. -->
                <div class="relative border-2 border-white/70 p-1.5">
                    <div class="border border-white/40 px-4 py-8 sm:px-8 sm:py-10">
                        <div class="grid items-center gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
                            <!-- The plan: Dokos in the middle, the rooms wired to it. Wide screens only; a
                                 phone gets the rooms as a row of buttons above the answer. -->
                            <div class="hidden flex-col items-center gap-5 lg:flex">
                                <div class="relative mx-auto aspect-square w-full max-w-[620px]">
                                    <svg viewBox="0 0 100 100" class="absolute inset-0 size-full" aria-hidden="true">
                                        <line
                                            v-for="node in nodes"
                                            :key="node.key"
                                            x1="50"
                                            y1="50"
                                            :x2="node.x"
                                            :y2="node.y"
                                            stroke="currentColor"
                                            stroke-width="0.35"
                                            stroke-dasharray="1.2 1"
                                            class="text-white/45"
                                        />
                                        <line
                                            :key="`wire-${active}`"
                                            x1="50"
                                            y1="50"
                                            :x2="current.x"
                                            :y2="current.y"
                                            pathLength="1"
                                            stroke="currentColor"
                                            stroke-width="0.7"
                                            class="h26-wire text-accent-secondary"
                                        />
                                        <!-- The current: a short bright stroke with a halo, run from Dokos to the room. The
                                             filter works in drawing units, as a vertical wire has a zero-width box. -->
                                        <defs>
                                            <filter :id="glowId" filterUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
                                                <feGaussianBlur stdDeviation="0.9" result="halo" />
                                                <feMerge>
                                                    <feMergeNode in="halo" />
                                                    <feMergeNode in="halo" />
                                                    <feMergeNode in="SourceGraphic" />
                                                </feMerge>
                                            </filter>
                                        </defs>
                                        <line
                                            v-if="!reduced"
                                            :key="`pulse-${active}`"
                                            x1="50"
                                            y1="50"
                                            :x2="current.x"
                                            :y2="current.y"
                                            pathLength="1"
                                            stroke="white"
                                            stroke-width="0.9"
                                            stroke-linecap="round"
                                            :filter="`url(#${glowId})`"
                                            class="h26-pulse"
                                        />
                                    </svg>

                                    <div class="absolute left-1/2 top-1/2 flex w-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 border-[2.5px] border-white bg-dokos-500 px-2 py-4 text-center outline outline-1 outline-offset-4 outline-white/40 sm:py-6">
                                        <span class="text-2xl font-extrabold uppercase tracking-[-0.03em] sm:text-4xl">{{ block.core.title }}</span>
                                        <span v-if="block.core.note" class="font-typed text-[11px] text-accent-secondary sm:text-sm">{{ block.core.note }}</span>
                                    </div>

                                    <button
                                        v-for="(node, i) in nodes"
                                        :key="node.key"
                                        type="button"
                                        class="absolute flex w-[30%] -translate-x-1/2 -translate-y-1/2 flex-col gap-0.5 border-[1.5px] bg-dokos-500 px-2 py-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-secondary sm:px-3 sm:py-3"
                                        :class="i === active ? 'h26-arrive border-accent-secondary bg-dokos-700 text-accent-secondary' : 'border-dashed border-white/55 hover:border-solid hover:border-white hover:bg-dokos-600'"
                                        :style="{ left: `${node.x}%`, top: `${node.y}%` }"
                                        :aria-pressed="i === active"
                                        :aria-label="`${node.title} : ${node.question}`"
                                        @click="pick(i)"
                                    >
                                        <span class="font-typed text-[10px] text-accent-secondary sm:text-xs">{{ number(i) }}</span>
                                        <span class="text-[11px] font-extrabold uppercase leading-tight tracking-[-0.02em] sm:text-base">{{ node.title }}</span>
                                    </button>
                                </div>
                                <p v-if="block.hint" class="font-typed text-sm text-dokos-200">{{ block.hint }}</p>
                            </div>

                            <!-- The visitor's question, then the answer and the apps involved. -->
                            <div class="flex flex-col gap-5 lg:min-h-[36rem]">
                                <div class="flex flex-wrap gap-2 lg:hidden">
                                    <button
                                        v-for="(node, i) in nodes"
                                        :key="node.key"
                                        type="button"
                                        class="rounded-full border-[1.5px] px-3 py-1.5 text-sm font-bold"
                                        :class="i === active ? 'border-accent-secondary bg-dokos-700 text-accent-secondary' : 'border-white/55'"
                                        :aria-pressed="i === active"
                                        @click="pick(i)"
                                    >
                                        {{ node.title }}
                                    </button>
                                </div>
                                <p class="font-typed text-sm text-accent-secondary">
                                    {{ number(active) }} / {{ String(nodes.length).padStart(2, '0') }} · {{ current.title }}
                                </p>
                                <h3 :aria-label="current.question" class="text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold leading-tight tracking-[-0.02em]">
                                    <span aria-hidden="true">{{ typed }}<span v-if="typing" class="h26-cursor" /><span class="text-transparent">{{ rest }}</span></span>
                                </h3>
                                <div class="flex flex-col gap-4 transition duration-500" :class="typing ? 'translate-y-2 opacity-0' : 'opacity-100'">
                                    <p class="text-lg leading-relaxed text-dokos-100">{{ current.answer }}</p>
                                    <p v-if="current.apps" class="font-typed text-sm leading-relaxed text-dokos-200">{{ current.apps }}</p>
                                    <NuxtLink v-if="current.link" :to="current.link.to" class="w-fit font-bold text-accent-secondary hover:underline">{{ current.link.label }} →</NuxtLink>
                                </div>
                                <div class="mt-auto flex flex-wrap items-center gap-3 pt-2">
                                    <button
                                        type="button"
                                        class="grid size-11 place-items-center rounded-lg border-[1.5px] border-white/70 hover:border-white"
                                        aria-label="Question précédente"
                                        @click="pick(active - 1)"
                                    >
                                        <UIcon name="i-heroicons-arrow-left" class="size-5" />
                                    </button>
                                    <button
                                        type="button"
                                        class="grid size-11 place-items-center rounded-lg border-[1.5px] border-white/70 hover:border-white"
                                        aria-label="Question suivante"
                                        @click="pick(active + 1)"
                                    >
                                        <UIcon name="i-heroicons-arrow-right" class="size-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- The connections to the outside, then the cartouche, as on a printed plan; the
                             cartouche's last row names what Dokos is built on. Logos sit on white tiles to
                             keep their colours readable on the blue. -->
                        <div class="mt-10 flex flex-wrap items-end justify-between gap-8 border-t border-white/30 pt-8">
                            <div v-if="block.connections" class="flex max-w-xl flex-col gap-3">
                                <p class="font-typed text-sm text-accent-secondary">{{ block.connections.label }}</p>
                                <p class="text-lg font-bold">{{ block.connections.title }}</p>
                                <ul class="flex flex-wrap gap-2">
                                    <li v-for="icon in block.connections.icons" :key="icon" class="grid size-11 place-items-center rounded-md bg-white">
                                        <UIcon :name="icon" class="size-6" />
                                    </li>
                                    <li v-for="image in block.connections.images" :key="image" class="grid h-11 place-items-center rounded-md bg-white px-2">
                                        <img :src="image" alt="" class="max-h-6" loading="lazy">
                                    </li>
                                </ul>
                            </div>
                            <dl class="grid w-full grid-cols-2 border border-white/60 font-typed text-sm sm:w-[28rem]">
                                <div class="border-r border-b border-white/60 px-3 py-2"><dt class="text-xs text-dokos-200">Projet</dt><dd>{{ block.sheet.project }}</dd></div>
                                <div class="border-b border-white/60 px-3 py-2"><dt class="text-xs text-dokos-200">Dessiné par</dt><dd>{{ block.sheet.drawn_by }}</dd></div>
                                <div class="border-r border-white/60 px-3 py-2"><dt class="text-xs text-dokos-200">Échelle</dt><dd>{{ block.sheet.scale }}</dd></div>
                                <div class="px-3 py-2"><dt class="text-xs text-dokos-200">N°</dt><dd>{{ block.sheet.number }}</dd></div>
                                <div v-if="block.sheet.foundations" class="col-span-2 border-t border-white/60 px-3 py-2"><dt class="text-xs text-dokos-200">Fondations</dt><dd>{{ block.sheet.foundations }}</dd></div>
                            </dl>
                        </div>
                    </div>
                </div>

                <div v-if="block.soon || block.link" class="flex flex-wrap items-center justify-between gap-x-12 gap-y-5">
                    <p v-if="block.soon" class="font-typed text-accent-secondary">{{ block.soon }}</p>
                    <NuxtLink v-if="block.link" :to="block.link.to" class="py-2 font-bold text-accent-secondary hover:underline">
                        {{ block.link.label }} →
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.h26-blueprint {
    background-image:
        linear-gradient(rgba(168, 230, 207, 0.14) 1px, transparent 1px),
        linear-gradient(90deg, rgba(168, 230, 207, 0.14) 1px, transparent 1px),
        linear-gradient(rgba(168, 230, 207, 0.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(168, 230, 207, 0.06) 1px, transparent 1px);
    background-size: 120px 120px, 120px 120px, 24px 24px, 24px 24px;
}

/* The lit wire draws itself from Dokos to the room. */
.h26-wire { stroke-dasharray: 1; animation: h26-wire 0.7s ease-out both; }
@keyframes h26-wire { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }

/*
 * Once the wire is drawn, the current runs in three beats on a 2.4 s cycle, for
 * as long as the room is selected: a pulse runs along the wire (one dash of
 * 0.14 in a pattern longer than the wire, moved from just before its start to
 * just past its end), then the room answers with a single flash and a ring that
 * widens and fades, then a short rest.
 */
.h26-pulse {
    stroke-dasharray: 0.14 1.2;
    stroke-dashoffset: 0.14;
    animation: h26-pulse 2.4s cubic-bezier(0.5, 0, 0.3, 1) 0.7s infinite;
}
@keyframes h26-pulse {
    0% { stroke-dashoffset: 0.14; opacity: 1; }
    40% { stroke-dashoffset: -1; opacity: 1; }
    41%, 100% { stroke-dashoffset: -1; opacity: 0; }
}
.h26-arrive { animation: h26-arrive 2.4s ease-out 0.7s infinite; }
/* The flash is an inset shadow over the opaque background, so the wire under the room never shows. */
@keyframes h26-arrive {
    0%, 40% { box-shadow: inset 0 0 0 999px rgba(168, 230, 207, 0), 0 0 0 0 rgba(168, 230, 207, 0); }
    46% { box-shadow: inset 0 0 0 999px rgba(168, 230, 207, 0.22), 0 0 30px 6px rgba(168, 230, 207, 0.65); }
    70%, 100% { box-shadow: inset 0 0 0 999px rgba(168, 230, 207, 0), 0 0 0 0 rgba(168, 230, 207, 0); }
}
.h26-arrive::after {
    content: '';
    position: absolute;
    inset: -1.5px;
    border: 2px solid var(--color-accent-secondary);
    opacity: 0;
    pointer-events: none;
    animation: h26-ring 2.4s ease-out 0.7s infinite;
}
@keyframes h26-ring {
    0%, 40% { opacity: 0; transform: scale(1); }
    42% { opacity: 1; transform: scale(1); }
    72%, 100% { opacity: 0; transform: scale(1.3); }
}

.h26-cursor {
    display: inline-block;
    width: 0.08em;
    height: 0.8em;
    margin-left: 0.04em;
    vertical-align: -0.03em;
    background: var(--color-accent);
    animation: h26-blink 1s steps(1) infinite;
}
@keyframes h26-blink { 50% { opacity: 0; } }

/* Reduced motion: everything is drawn at once. */
.is-static .h26-wire,
.is-static .h26-arrive { animation: none; }
.is-static .h26-arrive::after { display: none; }
</style>
