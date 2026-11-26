<script setup lang="ts">
// 2026 page heading on the cream paper, for pages that open on reading rather
// than on a pitch (blog, articles, legal pages, partners): a typed line above,
// the huge uppercase title with its coral dot, and the introduction.

const props = defineProps<{
    kicker?: string;
    kickerTo?: string;
    title: string;
    description?: string;
}>()

const NuxtLink = resolveComponent('NuxtLink')
const title = computed(() => (props.title || '').trim().replace(/[.?!]$/, ''))
const end = computed(() => /[?!]$/.test((props.title || '').trim()) ? (props.title || '').trim().slice(-1) : '.')
// Long titles (articles) get a smaller size.
const size = computed(() => title.value.length > 50
    ? 'text-[clamp(2.25rem,4.8vw,4.25rem)]'
    : 'text-[clamp(3rem,7vw,6rem)]')
</script>

<template>
    <header class="mx-auto flex max-w-[1360px] flex-col gap-6 px-4 pt-16 pb-10 sm:px-8 sm:pt-24">
        <component
            :is="kickerTo ? NuxtLink : 'p'"
            v-if="kicker || $slots.kicker"
            :to="kickerTo"
            class="w-fit font-typed text-stone-600"
            :class="{ 'hover:underline': kickerTo }"
        >
            <slot name="kicker">{{ kicker }}</slot>
        </component>
        <h1 class="max-w-6xl font-extrabold uppercase leading-[0.92] tracking-[-0.045em] text-dokos-500" :class="size">
            <slot name="before" />{{ title }}<span class="text-accent">{{ end }}</span>
        </h1>
        <p v-if="description" class="max-w-3xl text-lg leading-relaxed text-stone-600" v-html="description" />
        <slot />
    </header>
</template>
