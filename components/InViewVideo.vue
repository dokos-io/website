<script setup lang="ts">
// A muted looping demo video that downloads nothing until it scrolls into view,
// then plays while it is visible. Replaces `<video autoplay>`, which makes the
// browser fetch every video of the page at load, in competition with the first
// paint. Visitors who ask for reduced motion get the controls instead of autoplay.
defineProps<{ src: string; type?: string }>()

const video = ref<HTMLVideoElement | null>(null)
const reducedPref = usePreferredReducedMotion()
const reduced = computed(() => reducedPref.value === 'reduce')

useIntersectionObserver(video, (entries) => {
    const el = video.value
    if (!el || reduced.value) return
    if (entries.some(e => e.isIntersecting)) {
        el.preload = 'auto'
        el.play().catch(() => { /* playback refused: the first frame stays */ })
    } else {
        el.pause()
    }
}, { threshold: 0.25 })
</script>

<template>
    <video ref="video" preload="none" loop muted playsinline :controls="reduced">
        <source :src="src" :type="type || 'video/mp4'">
    </video>
</template>
