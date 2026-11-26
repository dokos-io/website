<script setup lang="ts">
// « Comment nous travaillons ensemble »: two ruled columns side by side, for
// the blocks that set one thing against another (what we bring and what we
// ask; what works well with us and what works less well). The second column's
// marks are coral when `contrast` is set, so the less good side reads apart.

defineProps<{
    block: {
        title: string;
        description?: string;
        columns: { label: string; items: string[] }[];
    };
    contrast?: boolean;
}>()
</script>

<template>
    <section class="bg-paper">
        <div class="mx-auto flex max-w-[1360px] flex-col gap-12 px-4 py-24 sm:px-8 sm:py-32">
            <div class="flex flex-wrap items-end gap-x-16 gap-y-6">
                <h2 class="h26-reveal-x flex-[1_1_640px] text-[clamp(2.75rem,6vw,5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em] text-dokos-500">
                    {{ block.title }}<span class="text-accent">.</span>
                </h2>
                <p v-if="block.description" class="h26-reveal flex-[1_1_360px] text-lg leading-relaxed text-stone-600">{{ block.description }}</p>
            </div>
            <div class="h26-reveal grid gap-x-16 gap-y-10 lg:grid-cols-2">
                <div v-for="(column, c) in block.columns" :key="column.label" class="flex flex-col gap-4">
                    <p class="font-typed text-dokos-500">{{ column.label }}</p>
                    <ul class="border-b-[1.5px] border-dokos-500">
                        <li v-for="item in column.items" :key="item" class="flex gap-4 border-t-[1.5px] border-dokos-500 py-5 text-lg leading-relaxed text-stone-700">
                            <span
                                class="mt-2.5 size-2 flex-none rounded-full"
                                :class="contrast && c === 1 ? 'border-[1.5px] border-accent' : 'bg-accent'"
                                aria-hidden="true"
                            />
                            <span>{{ item }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>
