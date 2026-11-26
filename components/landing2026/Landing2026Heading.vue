<script setup lang="ts">
// 2026 section heading for the content-driven pages: the huge uppercase title
// with its coral dot, and the introduction beside it. Titles come from YAML and
// may hold inline HTML; a trailing period is dropped, the dot replaces it.

const props = defineProps<{
    title?: string;
    description?: string;
    tone?: 'paper' | 'dark';
}>()

const title = computed(() => (props.title || '').trim().replace(/\.(\s*(<\/[a-z]+>)*)$/i, '$1'))
</script>

<template>
    <div v-if="title || description" class="flex flex-wrap items-end gap-x-16 gap-y-6">
        <h2
            v-if="title"
            class="h26-reveal-x flex-[1_1_640px] text-[clamp(2.5rem,5.5vw,4.75rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em] [&_.text-primary]:text-inherit"
        >
            <span v-html="title" /><span class="text-accent">.</span>
        </h2>
        <p
            v-if="description"
            class="h26-reveal flex-[1_1_360px] text-lg leading-relaxed"
            :class="tone === 'dark' ? 'text-dokos-100' : 'text-stone-600'"
            v-html="description"
        />
    </div>
</template>
