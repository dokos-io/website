<script setup lang="ts">
// 2026 homepage, after the chain of documents: Dokos AI at work, in a card
// shaped like the hero, in the deepest Dokos blue: the same family as the plan
// and the closing card, darker to mark the step from the software to the AI.
// The two parts are tabs, both titles always in sight, one panel open at a time
// with its text and its proof, each laid as a white sheet: "Au quotidien" (open
// first) with one invoice, whose history lines appear one by one before the
// assistant's question is typed; "Quand votre métier le demande" with the
// Studio video, in light mode. Only the open panel moves. Then the rules that
// keep people in control, across the width, and the assistants that connect
// over MCP, their logos on white tiles since several are black.
// Develops the end of the hero ("il prépare le travail avec vous").

interface Entry {
    kind: 'person' | 'ai' | 'mcp';
    who: string;
    what: string;
    time: string;
}

const props = defineProps<{
    block: {
        title: string;
        description: string;
        // A part shows either the invoice example or a looping video beside its text.
        parts: { title: string; text: string; example?: boolean; video?: { src: string; src_mp4?: string; poster?: string } }[];
        rules_title: string;
        rules: { title: string; description: string }[];
        example: {
            title: string;
            status: string;
            fields: { label: string; value: string }[];
            history: Entry[];
            ask: string;
            confirm: string;
            cancel: string;
        };
        assistants?: { title: string; description?: string; note?: string; items: { name: string; logo: string }[] };
        links: { label: string; to: string }[];
    };
}>()

const AVATAR: Record<Entry['kind'], { icon: string; class: string }> = {
    person: { icon: 'i-heroicons-user-solid', class: 'bg-[#76B7B2]' },
    ai: { icon: 'i-heroicons-sparkles-solid', class: 'bg-accent' },
    mcp: { icon: 'i-heroicons-command-line', class: 'bg-accent' },
}

// Each history line takes 0.7 s; the question is typed once the last one is in.
const STEP = 0.7
const askDelay = computed(() => 0.4 + props.block.example.history.length * STEP)

const ask = computed(() => props.block.example.ask)
const shown = ref(ask.value.length)
const typing = ref(false)
let delay: ReturnType<typeof setTimeout> | undefined
let typer: ReturnType<typeof setInterval> | undefined

const sheet = ref<HTMLElement | null>(null)
const started = ref(false)
const { reduced } = useInViewOnce(sheet, () => {
    started.value = true
    if (reduced.value) return
    shown.value = 0
    delay = setTimeout(() => {
        typing.value = true
        typer = setInterval(() => {
            if (shown.value >= ask.value.length) {
                clearInterval(typer)
                typing.value = false
                return
            }
            shown.value++
        }, 40)
    }, askDelay.value * 1000)
}, 0.3)

// Tabs: the visitor switches; nothing rotates on its own. Arrow keys move
// between tabs, as in any tab list.
const tab = ref(0)
const uid = useId()
function onTabKey(event: KeyboardEvent) {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    event.preventDefault()
    tab.value = (tab.value + step + props.block.parts.length) % props.block.parts.length
    document.getElementById(`${uid}-tab-${tab.value}`)?.focus()
}

// Each tab may hold a video: only the open tab's video plays, and only once the
// tabs have come into view (the first tab is open from the start).
const clips: (HTMLVideoElement | null)[] = []
// The panels are a v-for, where a plain template ref would collect an array.
const setSheet = (el: unknown) => { sheet.value = el as HTMLElement | null }
const setClip = (p: number) => (el: unknown) => { clips[p] = el as HTMLVideoElement | null }
const panels = ref<HTMLElement | null>(null)
const { seen: panelsSeen } = useInViewOnce(panels, () => playOpen(), 0.3)
function playOpen() {
    clips.forEach((c, i) => {
        if (!c) return
        if (i === tab.value && panelsSeen.value && !reduced.value) c.play().catch(() => {})
        else c.pause()
    })
}
watch(tab, playOpen)

onBeforeUnmount(() => {
    clearTimeout(delay)
    clearInterval(typer)
})
</script>

<template>
    <!-- Inset from the edges, unlike the hero: the cream around it lets the page breathe. -->
    <section class="bg-paper px-2 sm:px-6 lg:px-14" :class="{ 'is-started': started, 'is-static': reduced }">
        <div class="rounded-2xl bg-dokos-900 text-white">
            <div class="mx-auto flex max-w-[1360px] flex-col gap-20 px-4 py-24 sm:px-8 sm:py-32">
                <div class="flex flex-wrap items-end gap-x-16 gap-y-6">
                    <!-- Longer than the other titles: it takes more of the row and a slightly smaller size, so it holds on three lines at most. -->
                    <h2 class="h26-reveal-x flex-[2_1_640px] text-[clamp(3rem,6vw,5.25rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]">
                        {{ block.title }}<span class="text-accent">.</span>
                    </h2>
                    <p class="h26-reveal flex-[1_1_360px] text-lg leading-relaxed text-dokos-100">{{ block.description }}</p>
                </div>

                <!-- Two tabs, both titles in sight; the open panel holds the text and, on its right, the proof. -->
                <div ref="panels" class="h26-reveal flex flex-col gap-12">
                    <div role="tablist" :aria-label="block.title" class="flex flex-wrap gap-x-10 gap-y-2 border-b-[1.5px] border-white/25">
                        <button
                            v-for="(part, i) in block.parts"
                            :id="`${uid}-tab-${i}`"
                            :key="part.title"
                            type="button"
                            role="tab"
                            :aria-selected="i === tab"
                            :aria-controls="`${uid}-panel-${i}`"
                            :tabindex="i === tab ? 0 : -1"
                            class="-mb-[1.5px] border-b-[3px] pb-4 text-left text-2xl font-extrabold tracking-[-0.02em] transition-colors sm:text-3xl"
                            :class="i === tab ? 'border-accent text-white' : 'border-transparent text-dokos-300 hover:text-white'"
                            @click="tab = i"
                            @keydown="onTabKey"
                        >
                            {{ part.title }}
                        </button>
                    </div>

                    <div
                        v-for="(part, p) in block.parts"
                        v-show="p === tab"
                        :id="`${uid}-panel-${p}`"
                        :key="part.title"
                        role="tabpanel"
                        :aria-labelledby="`${uid}-tab-${p}`"
                        class="flex flex-wrap items-center gap-x-16 gap-y-10"
                    >
                        <p class="max-w-xl flex-[1_1_380px] text-lg leading-relaxed text-dokos-100">{{ part.text }}</p>

                        <div class="flex min-w-0 flex-[1_1_560px] justify-center">
                            <!-- Example document, laid on the card: one invoice, written by a person and by agents. Capped
                                 at about the width of the window in the video, so both tabs weigh the same. -->
                            <figure
                                v-if="part.example"
                                :ref="setSheet"
                                class="flex w-full max-w-[27rem] flex-col bg-white text-ink shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
                                :aria-label="block.example.title"
                            >
                                <div class="flex flex-wrap items-baseline justify-between gap-3 border-b border-sand-300 px-7 pt-7 pb-5">
                                    <b class="text-2xl font-extrabold tracking-[-0.02em] text-dokos-500">{{ block.example.title }}</b>
                                    <span class="font-typed text-sm text-[#2F6F69]">{{ block.example.status }}</span>
                                </div>
                                <div class="grid gap-8 px-7 py-6 sm:grid-cols-[2fr_3fr]">
                                    <dl class="grid content-start gap-4">
                                        <div v-for="field in block.example.fields" :key="field.label" class="border-b border-dashed border-sand-400 pb-2">
                                            <dt class="font-typed text-xs text-stone-500">{{ field.label }}</dt>
                                            <dd class="mt-1 font-semibold text-dokos-500">{{ field.value }}</dd>
                                        </div>
                                    </dl>
                                    <ol class="grid content-start gap-4">
                                        <li
                                            v-for="(entry, i) in block.example.history"
                                            :key="entry.time + entry.who"
                                            class="h26-entry grid grid-cols-[1.75rem_1fr_auto] items-start gap-3 text-sm"
                                            :style="{ '--d': `${0.4 + i * STEP}s` }"
                                        >
                                            <span class="grid size-7 place-items-center rounded-full text-white" :class="AVATAR[entry.kind].class">
                                                <UIcon :name="AVATAR[entry.kind].icon" class="size-3.5" />
                                            </span>
                                            <span>
                                                <b class="block text-dokos-500">{{ entry.who }}</b>
                                                <span class="text-stone-600">{{ entry.what }}</span>
                                            </span>
                                            <time class="font-typed text-xs text-stone-500">{{ entry.time }}</time>
                                        </li>
                                    </ol>
                                </div>
                                <figcaption class="h26-entry mx-7 mb-7 flex flex-col gap-4 border-l-[3px] border-accent bg-paper px-5 py-4" :style="{ '--d': `${askDelay}s` }">
                                    <span :aria-label="ask" class="font-typed text-dokos-500">
                                        <span aria-hidden="true">{{ ask.slice(0, shown) }}<span v-if="typing" class="h26-caret" /><span class="text-transparent">{{ ask.slice(shown) }}</span></span>
                                    </span>
                                    <span class="flex items-center gap-5 text-sm font-bold" aria-hidden="true">
                                        <span class="rounded-lg bg-dokos-500 px-4 py-2 text-white">{{ block.example.confirm }}</span>
                                        <span class="text-dokos-500 underline underline-offset-4">{{ block.example.cancel }}</span>
                                    </span>
                                </figcaption>
                            </figure>

                            <!-- A white sheet like the invoice of the other tab: the video shows the software in light
                                 mode on a light background, zoomed on the window, which sits in the middle of the frame. -->
                            <div v-else-if="part.video" class="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-white shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                                <video
                                    v-if="!reduced"
                                    :ref="setClip(p)"
                                    class="absolute inset-0 size-full scale-[1.25] object-cover"
                                    :poster="part.video.poster || undefined"
                                    muted
                                    loop
                                    playsinline
                                    preload="none"
                                    aria-hidden="true"
                                >
                                    <source :src="part.video.src" :type="part.video.src.endsWith('.webm') ? 'video/webm' : 'video/mp4'">
                                    <source v-if="part.video.src_mp4" :src="part.video.src_mp4" type="video/mp4">
                                </video>
                                <img v-else-if="part.video.poster" :src="part.video.poster" alt="" class="absolute inset-0 size-full scale-[1.25] object-cover">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="h26-reveal flex flex-col gap-4">
                    <p class="font-typed text-accent-secondary">{{ block.rules_title }}</p>
                    <ol class="grid gap-x-10 lg:grid-cols-3">
                        <li v-for="(rule, i) in block.rules" :key="rule.title" class="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t-[1.5px] border-white/40 py-5">
                            <span class="font-typed text-lg text-accent">{{ String(i + 1).padStart(2, '0') }}</span>
                            <span class="flex flex-col gap-1">
                                <b class="text-lg">{{ rule.title }}</b>
                                <span class="text-dokos-100">{{ rule.description }}</span>
                            </span>
                        </li>
                    </ol>
                </div>

                <div class="h26-reveal flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
                    <div v-if="block.assistants" class="flex max-w-4xl flex-col gap-4">
                        <p class="text-2xl font-extrabold tracking-[-0.02em]">{{ block.assistants.title }}</p>
                        <p v-if="block.assistants.description" class="max-w-2xl text-dokos-100">{{ block.assistants.description }}</p>
                        <ul class="flex flex-wrap items-center gap-x-5 gap-y-3">
                            <li v-for="(item, i) in block.assistants.items" :key="item.name" class="flex items-center gap-5">
                                <span class="flex items-center gap-2 font-semibold">
                                    <span class="grid size-8 place-items-center rounded-md bg-white">
                                        <img :src="item.logo" alt="" class="size-5" loading="lazy">
                                    </span>
                                    {{ item.name }}
                                </span>
                                <span v-if="i < block.assistants.items.length - 1" class="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                            </li>
                        </ul>
                        <p v-if="block.assistants.note" class="font-typed text-sm text-dokos-100">{{ block.assistants.note }}</p>
                    </div>
                    <div class="flex flex-wrap gap-x-6 gap-y-2 font-bold">
                        <NuxtLink v-for="link in block.links" :key="link.to" :to="link.to" class="py-2 hover:underline">{{ link.label }} →</NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* History lines, then the assistant's question, appear one after another. */
.h26-entry { opacity: 0; transform: translateY(8px); }
.is-started .h26-entry { opacity: 1; transform: none; transition: opacity 0.5s ease var(--d), transform 0.5s ease var(--d); }
.is-static .h26-entry { opacity: 1; transform: none; transition: none; }

/* Same caret as the typed letter further down. */
.h26-caret {
    display: inline-block; width: 0.5em; height: 1em; vertical-align: -0.15em;
    background: var(--color-dokos-500);
    animation: h26-blink 1s steps(1) infinite;
}
@keyframes h26-blink { 50% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) {
    .h26-caret { animation: none; }
}
</style>
