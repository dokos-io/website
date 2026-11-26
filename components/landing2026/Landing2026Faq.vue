<script setup lang="ts">
// 2026 questions block: a ruled list that opens in place, answers in Markdown.

defineProps<{
    title?: string;
    description?: string;
    items: { label: string; content?: string }[];
}>()
</script>

<template>
    <section class="mx-auto flex max-w-[1360px] flex-col gap-12 px-4 py-24 sm:px-8 sm:py-32">
        <Landing2026Heading :title="title" :description="description" />
        <div class="h26-reveal border-b-[1.5px] border-dokos-500">
            <details v-for="(item, i) in items" :key="i" class="group border-t-[1.5px] border-dokos-500">
                <summary class="flex cursor-pointer list-none items-baseline justify-between gap-6 py-5 text-xl font-extrabold tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                    {{ item.label }}
                    <span class="font-typed text-2xl text-accent transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <MDC :value="item.content || ''" class="max-w-3xl pb-6 text-lg leading-relaxed text-stone-600 [&_a]:font-bold [&_a]:text-dokos-500 [&_a]:underline [&_p]:mb-3" />
            </details>
        </div>
    </section>
</template>
