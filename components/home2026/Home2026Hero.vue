<script setup lang="ts">
// 2026 homepage, opening: an optional background video, the kicker, then the
// title typed letter by letter behind a coral cursor. The full title is rendered
// on the server and kept for screen readers; only the visual copy is typed, and
// not at all for visitors who ask for reduced motion.
// The video is composed for this frame: the Dokos window on the right and the
// typed request at the bottom left. From 1280px the card is 16:9 like the video
// (up to 880px high) and the text sits above the request, in the empty top left corner; below that
// the video plays in its own frame under the text, cropped on the window. The
// card is in the deepest Dokos blue, like the AI card; the video is to be shot
// on that blue so its edges never show (the current file has a grey background).

const props = defineProps<{
    block: {
        kicker: string;
        title: string;
        description: string;
        links: { label: string; to: string; target?: string }[];
        note?: string;
        video?: string;
        video_mp4?: string;
        poster?: string;
    };
}>()

const reducedPref = usePreferredReducedMotion()
const reduced = computed(() => reducedPref.value === 'reduce')

const shown = ref(props.block.title.length)
const typing = ref(false)
let timer: ReturnType<typeof setInterval> | undefined
let delay: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
    if (reduced.value) return
    shown.value = 0
    typing.value = true
    delay = setTimeout(() => {
        timer = setInterval(() => {
            if (shown.value >= props.block.title.length) {
                clearInterval(timer)
                typing.value = false
                return
            }
            shown.value++
        }, 70)
    }, 700)
})

onBeforeUnmount(() => {
    clearTimeout(delay)
    clearInterval(timer)
})

const typed = computed(() => props.block.title.slice(0, shown.value))
const rest = computed(() => props.block.title.slice(shown.value))
const done = computed(() => shown.value >= props.block.title.length)
const hasVideo = computed(() => !!(props.block.video || props.block.poster))

// The button to "Dokos en deux minutes" opens it over the page, and waits for the video to exist.
const NuxtLink = resolveComponent('NuxtLink')
const presentation = usePresentation()
const ready = usePresentationReady()
const links = computed(() => props.block.links.filter(link => link.to !== PRESENTATION || ready.value))
</script>

<template>
    <section class="px-2 sm:px-4">
        <div
            class="relative isolate flex flex-col overflow-hidden rounded-2xl text-white"
            :class="hasVideo
                ? 'bg-dokos-900 xl:h-[min(calc((100vw-2rem)*0.5625),880px)] xl:justify-start'
                : 'min-h-[clamp(440px,62vh,640px)] justify-end bg-dokos-900'"
        >
            <template v-if="hasVideo">
                <!-- Under the text on small screens, behind it on large ones. -->
                <div class="relative order-last aspect-[4/3] w-full sm:aspect-video xl:absolute xl:inset-0 xl:-z-10 xl:aspect-auto">
                    <video
                        v-if="block.video && !reduced"
                        class="absolute inset-0 size-full object-cover object-right sm:object-center"
                        :poster="block.poster || undefined"
                        autoplay
                        muted
                        loop
                        playsinline
                        aria-hidden="true"
                    >
                        <source :src="block.video" :type="block.video.endsWith('.webm') ? 'video/webm' : 'video/mp4'">
                        <source v-if="block.video_mp4" :src="block.video_mp4" type="video/mp4">
                    </video>
                    <img v-else-if="block.poster" :src="block.poster" alt="" class="absolute inset-0 size-full object-cover object-right sm:object-center">
                    <!-- Blends the top of the frame into the card when the video sits under the text. -->
                    <div class="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-dokos-900 to-transparent xl:hidden" aria-hidden="true" />
                </div>
                <!-- Keeps the white text readable on the left without darkening the request below it. -->
                <div class="absolute inset-y-0 left-0 -z-10 hidden w-1/2 bg-gradient-to-r from-dokos-900/80 to-transparent xl:block" aria-hidden="true" />
            </template>
            <template v-else>
                <div class="h26-zoom absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_30%,var(--color-dokos-800),var(--color-dokos-900)_60%)]" aria-hidden="true" />
                <!-- Keeps the white title readable over any image. -->
                <div class="absolute inset-0 -z-10 bg-gradient-to-t from-dokos-900/85 via-dokos-900/30 to-transparent" aria-hidden="true" />
            </template>

            <div
                class="flex flex-col gap-5 px-6 sm:px-12"
                :class="hasVideo ? 'pt-10 pb-8 sm:pt-14 xl:max-w-[42%] xl:pr-0 xl:pb-14' : 'pb-10 sm:pb-14'"
            >
                <p class="h26-fade text-xl font-semibold sm:text-3xl">{{ block.kicker }}</p>
                <h1
                    :aria-label="`${block.title}.`"
                    class="font-extrabold uppercase leading-[0.88] tracking-[-0.045em]"
                    :class="hasVideo ? 'text-[clamp(3rem,9.5vw,8rem)] xl:text-[clamp(3.5rem,5.4vw,6rem)]' : 'max-w-6xl text-[clamp(3rem,9.5vw,8rem)]'"
                >
                    <span aria-hidden="true">{{ typed }}<span v-if="typing" class="h26-cursor" /><span class="text-transparent">{{ rest }}</span><span :class="done ? 'text-accent' : 'text-transparent'">.</span></span>
                </h1>
                <div
                    class="h26-fade-late flex flex-wrap items-end justify-between gap-6 pt-2"
                    :class="{ 'xl:flex-col xl:items-start': hasVideo }"
                >
                    <p class="max-w-xl text-lg leading-relaxed text-stone-200" :class="{ 'xl:max-w-md': hasVideo }">{{ block.description }}</p>
                    <div class="flex flex-col items-start gap-2.5">
                        <div class="flex flex-wrap gap-3">
                            <component
                                :is="link.to === PRESENTATION ? 'button' : NuxtLink"
                                v-for="(link, i) in links"
                                :key="link.label"
                                v-bind="link.to === PRESENTATION ? { type: 'button', onClick: () => (presentation = true) } : { to: link.to, target: link.target }"
                                class="h26-lift rounded-lg px-6 py-3.5 font-bold"
                                :class="i === 0 ? 'bg-paper text-dokos-500' : 'border-[1.5px] border-white text-white'"
                            >
                                {{ link.label }}
                            </component>
                        </div>
                        <span v-if="block.note" class="font-typed text-sm text-stone-300">{{ block.note }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.h26-cursor {
    display: inline-block;
    width: 0.08em;
    height: 0.8em;
    margin-left: 0.04em;
    vertical-align: -0.03em;
    background: var(--color-accent);
    animation: h26-blink 1s steps(1) infinite;
}
.h26-zoom { animation: h26-zoom 24s ease-in-out infinite alternate; }
.h26-fade { animation: h26-fade 0.9s ease-out both; }
.h26-fade-late { animation: h26-fade 0.9s ease-out 2.4s both; }

@keyframes h26-blink { 50% { opacity: 0; } }
@keyframes h26-zoom { to { transform: scale(1.08); } }
@keyframes h26-fade { from { opacity: 0; transform: translateY(16px); } }

@media (prefers-reduced-motion: reduce) {
    .h26-zoom, .h26-fade, .h26-fade-late { animation: none; }
}
</style>
