<script setup lang="ts">
// 2026 homepage, the closing block: where to start. A Dokos blue card shaped
// like the hero and the AI block, so the page ends on an action. The two minute
// video, then three doors, the last one (our team) as a paper button, and the
// prices; small structures are sent to partners in plain words.

const props = defineProps<{
    block: {
        title: string;
        description: string;
        items: { title: string; description: string; label: string; to: string; highlight?: boolean }[];
        link?: { label: string; to: string };
    };
}>()

const isExternal = (to: string) => /^https?:/.test(to)

// "Regarder Dokos en deux minutes" opens the video over the page, once it exists.
const NuxtLink = resolveComponent('NuxtLink')
const presentation = usePresentation()
const ready = usePresentationReady()
const items = computed(() => props.block.items.filter(item => item.to !== PRESENTATION || ready.value))
</script>

<template>
    <!-- Inset from the edges like the AI card, so the cream frames it. -->
    <section class="bg-paper px-2 pb-2 sm:px-6 sm:pb-6 lg:px-14 lg:pb-14">
        <div class="rounded-2xl bg-dokos-500 text-white">
            <div class="mx-auto flex max-w-[1360px] flex-col gap-10 px-4 pt-24 pb-16 sm:px-8 sm:pt-28 sm:pb-20">
                <h2 class="h26-reveal-x text-[clamp(3rem,7vw,6rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]">
                    {{ block.title }}<span class="text-accent">.</span>
                </h2>
                <p class="h26-reveal max-w-2xl text-lg leading-relaxed text-dokos-100">{{ block.description }}</p>
                <ul class="h26-reveal border-b-[1.5px] border-white/40">
                    <li v-for="item in items" :key="item.title" class="border-t-[1.5px] border-white/40">
                        <component
                            :is="item.to === PRESENTATION ? 'button' : NuxtLink"
                            v-bind="item.to === PRESENTATION
                                ? { type: 'button', onClick: () => (presentation = true) }
                                : { to: item.to, target: isExternal(item.to) ? '_blank' : undefined }"
                            class="h26-door grid w-full items-baseline gap-x-10 gap-y-2 py-7 text-left lg:grid-cols-[26rem_1fr_auto]"
                        >
                            <span class="text-3xl font-extrabold tracking-[-0.02em]">{{ item.title }}</span>
                            <span class="max-w-2xl text-dokos-100">{{ item.description }}</span>
                            <span
                                class="font-bold"
                                :class="item.highlight ? 'rounded-lg bg-paper px-5 py-3 text-dokos-500' : ''"
                            >{{ item.label }}<template v-if="!item.highlight"> →</template></span>
                        </component>
                    </li>
                </ul>
                <NuxtLink v-if="block.link" :to="block.link.to" class="h26-reveal w-fit py-2 font-bold hover:underline">{{ block.link.label }} →</NuxtLink>
            </div>
        </div>
    </section>
</template>

<style scoped>
.h26-door { transition: padding 0.3s ease; }
.h26-door:hover { padding-left: 20px; }
@media (prefers-reduced-motion: reduce) {
    .h26-door { transition: none; }
}
</style>
