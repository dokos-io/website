// 2026 homepage: runs `start` once, the first time `target` comes into view.
// Visitors who ask for reduced motion get the end state straight away, through
// `reduced`, so every animation of the page can fall back on it.
import type { Ref } from 'vue'

export function useInViewOnce(target: Ref<HTMLElement | null>, start: () => void, threshold = 0.3) {
    const reduced = usePreferredReducedMotion()
    const seen = ref(false)

    const { stop } = useIntersectionObserver(
        target,
        (entries) => {
            if (seen.value || !entries.some(e => e.isIntersecting)) return
            seen.value = true
            stop()
            start()
        },
        { threshold },
    )

    return { reduced: computed(() => reduced.value === 'reduce'), seen }
}
