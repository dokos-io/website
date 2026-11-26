<script setup lang="ts">
// 2026 homepage: "Dokos en deux minutes", the story of Dokos and what it does,
// to watch instead of reading the page or to send to a partner. It opens over
// the page from the buttons that point to #presentation (the hero, "Par où
// commencer"), or straight away when the address ends in #presentation, so the
// link can be shared. The page renders it only once the video file exists.

const props = defineProps<{
    block: { title: string; meta?: string; caption?: string; src: string; src_mp4?: string; poster?: string };
}>()

const open = usePresentation()
const dialog = ref<HTMLDialogElement | null>(null)
const video = ref<HTMLVideoElement | null>(null)
const titleWords = computed(() => props.block.title.split(' '))

watch(open, (now) => {
    if (!dialog.value) return
    if (now && !dialog.value.open) {
        dialog.value.showModal()
        video.value?.play().catch(() => {})
    }
    if (!now && dialog.value.open) dialog.value.close()
})

onMounted(() => {
    if (location.hash === '#presentation') open.value = true
})

// Escape, the close button and a click on the backdrop all end here. The hash
// is dropped without the router, which would scroll the page back to the top.
function onClose() {
    open.value = false
    video.value?.pause()
    if (location.hash === '#presentation') history.replaceState(history.state, '', location.pathname + location.search)
}
</script>

<template>
    <dialog
        ref="dialog"
        class="m-auto w-[min(72rem,calc(100vw-2rem))] max-w-none bg-transparent p-0 text-white backdrop:bg-ink/95 backdrop:backdrop-blur-sm"
        :aria-label="block.title"
        @close="onClose"
        @click.self="dialog?.close()"
    >
        <div class="flex flex-col gap-4">
            <div class="flex items-end justify-between gap-6">
                <p class="text-[clamp(1.75rem,4vw,3rem)] font-extrabold uppercase leading-none tracking-[-0.04em]">
                    <template v-for="(word, i) in titleWords" :key="i">{{ word }}{{ i < titleWords.length - 1 ? ' ' : '' }}</template><span class="text-accent">.</span>
                </p>
                <button
                    type="button"
                    class="grid size-11 flex-none place-items-center rounded-lg border-[1.5px] border-white/70 hover:border-white"
                    aria-label="Fermer la vidéo"
                    @click="dialog?.close()"
                >
                    <UIcon name="i-heroicons-x-mark" class="size-5" />
                </button>
            </div>
            <video
                ref="video"
                class="aspect-video w-full rounded-2xl bg-black"
                :poster="block.poster || undefined"
                controls
                playsinline
                preload="none"
            >
                <source :src="block.src" :type="block.src.endsWith('.webm') ? 'video/webm' : 'video/mp4'">
                <source v-if="block.src_mp4" :src="block.src_mp4" type="video/mp4">
            </video>
            <p class="flex flex-wrap justify-between gap-x-6 gap-y-1 font-typed text-sm text-accent-secondary">
                <span v-if="block.meta">{{ block.meta }}</span>
                <span v-if="block.caption">{{ block.caption }}</span>
            </p>
        </div>
    </dialog>
</template>
