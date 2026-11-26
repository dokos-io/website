<script setup lang="ts">
// 2026 homepage, "Nous écrivons Dokos": why the company exists, signed, next to
// a letter that types itself when it comes into view, and the team photo.

const props = defineProps<{
    block: {
        title: string;
        paragraphs: string[];
        signature?: string;
        link?: { label: string; to: string };
        letter: { date: string; subject: string; lines: string[]; sign: string };
        photo?: { src: string; alt: string; caption?: string };
    };
}>()

// The letter as one list of lines; blank space before the subject, the body and the signature.
const lines = computed(() => {
    const l = props.block.letter
    return [
        { text: l.date, gap: false, sign: false },
        { text: l.subject, gap: true, sign: false },
        ...l.lines.map((text, i) => ({ text, gap: i === 0, sign: false })),
        { text: l.sign, gap: true, sign: true },
    ]
})
const total = computed(() => lines.value.reduce((n, l) => n + l.text.length, 0))
const fullText = computed(() => lines.value.map(l => l.text).join(' '))

const letterEl = ref<HTMLElement | null>(null)
const count = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

const { reduced } = useInViewOnce(letterEl, () => {
    if (reduced.value) {
        count.value = total.value
        return
    }
    timer = setInterval(() => {
        if (count.value >= total.value) return clearInterval(timer)
        count.value++
    }, 32)
}, 0.4)

onMounted(() => {
    if (reduced.value) count.value = total.value
})
onBeforeUnmount(() => clearInterval(timer))

const typedLines = computed(() => {
    let left = count.value
    let cursorPlaced = false
    return lines.value.map((line) => {
        const n = Math.max(0, Math.min(line.text.length, left))
        left -= line.text.length
        const cursor = !cursorPlaced && n < line.text.length && count.value > 0
        if (cursor) cursorPlaced = true
        return { ...line, typed: line.text.slice(0, n), rest: line.text.slice(n), cursor }
    })
})
</script>

<template>
    <section class="overflow-hidden bg-paper">
        <div class="mx-auto flex max-w-[1360px] flex-wrap items-center gap-16 px-4 py-24 sm:px-8 sm:py-32">
            <div class="flex min-w-0 flex-[1_1_520px] flex-col gap-7">
                <h2 class="h26-reveal-x text-[clamp(3rem,7vw,6rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em] text-dokos-500">
                    {{ block.title }}<span class="text-accent">.</span>
                </h2>
                <p
                    v-for="(paragraph, i) in block.paragraphs"
                    :key="i"
                    class="h26-reveal max-w-xl text-lg leading-relaxed"
                    :class="i === 0 ? 'text-dokos-500' : 'text-stone-600'"
                >
                    {{ paragraph }}
                </p>
                <div v-if="block.signature || block.link" class="h26-reveal flex flex-wrap items-center gap-x-6 gap-y-2">
                    <span v-if="block.signature" class="font-typed text-dokos-500">{{ block.signature }}</span>
                    <NuxtLink v-if="block.link" :to="block.link.to" class="py-2 font-bold text-dokos-500 hover:underline">{{ block.link.label }}</NuxtLink>
                </div>
            </div>

            <div ref="letterEl" class="relative flex min-w-0 flex-[1_1_320px] justify-center pb-16">
                <div
                    class="h26-paper flex min-h-[420px] w-[440px] max-w-full flex-col bg-white px-11 pt-12 pb-14 font-typed text-lg leading-[1.7] text-ink shadow-[0_18px_40px_rgba(43,42,39,0.16)]"
                    :aria-label="fullText"
                    role="img"
                >
                    <span
                        v-for="(line, i) in typedLines"
                        :key="i"
                        aria-hidden="true"
                        class="block"
                        :class="[line.gap ? 'mt-5' : '', line.sign ? 'font-bold text-dokos-500' : '']"
                    >{{ line.typed }}<span v-if="line.cursor" class="h26-caret" /><span class="text-transparent">{{ line.rest }}</span></span>
                </div>
                <figure
                    v-if="block.photo"
                    class="absolute -bottom-2 right-0 flex w-56 rotate-[5deg] flex-col gap-2 bg-white p-2.5 pb-3 shadow-[0_16px_36px_rgba(43,42,39,0.25)] sm:-right-6"
                >
                    <img :src="block.photo.src" :alt="block.photo.alt" class="h-36 w-full object-cover" loading="lazy">
                    <figcaption v-if="block.photo.caption" class="text-center font-typed text-sm text-ink">{{ block.photo.caption }}</figcaption>
                </figure>
            </div>
        </div>
    </section>
</template>

<style scoped>
.h26-paper { transform: rotate(-2.5deg); transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); }
.h26-paper:hover { transform: rotate(0deg) scale(1.02); }
.h26-caret {
    display: inline-block; width: 0.5em; height: 1em; vertical-align: -0.15em;
    background: var(--color-dokos-500);
    animation: h26-blink 1s steps(1) infinite;
}
@keyframes h26-blink { 50% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) {
    .h26-paper { transition: none; }
    .h26-caret { animation: none; }
}
</style>
