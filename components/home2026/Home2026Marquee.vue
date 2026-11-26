<script setup lang="ts">
// 2026 homepage: the band that scrolls under the opening. The list is
// rendered twice so the loop has no seam; the copy is hidden from screen
// readers, which read the list once. Pauses on hover; still for visitors who
// ask for reduced motion. A strip of paper above and below keeps it apart from
// the hero and from the plan, which shares its blue.

defineProps<{
    block: { label: string; items: string[] };
}>()
</script>

<template>
    <section class="my-2 overflow-hidden bg-dokos-500 font-typed text-lg text-accent-secondary sm:my-4" :aria-label="block.label">
        <ul class="sr-only">
            <li v-for="item in block.items" :key="item">{{ item }}</li>
        </ul>
        <div class="h26-marquee" aria-hidden="true">
            <div class="h26-track flex w-max py-4">
                <template v-for="pass in 2" :key="pass">
                    <span v-for="item in block.items" :key="`${pass}-${item}`" class="flex items-center gap-7 pr-7 whitespace-nowrap" :class="{ 'h26-copy': pass === 2 }">
                        <span>{{ item }}</span>
                        <span class="size-2 rounded-full bg-accent" />
                    </span>
                </template>
            </div>
        </div>
    </section>
</template>

<style scoped>
.h26-track { animation: h26-marquee 45s linear infinite; }
.h26-marquee:hover .h26-track { animation-play-state: paused; }
@keyframes h26-marquee { to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) {
    .h26-track { animation: none; flex-wrap: wrap; width: auto; justify-content: center; }
    .h26-copy { display: none; }
}
</style>
