<script setup lang="ts">
// Homepage: the company behind the project, with the positioning sentence
// verbatim and the three ways we work.

defineProps<{
    block: {
        label: string;
        title: string;
        description?: string;
        items: { title: string; description: string; to: string }[];
    };
}>()
</script>

<template>
    <UPageSection>
        <div class="grid gap-12 lg:grid-cols-[5fr_6fr] items-start">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{{ block.label }}</p>
                <p class="mt-3 text-2xl sm:text-3xl font-semibold leading-snug text-highlighted">{{ block.title }}</p>
                <p v-if="block.description" class="mt-4 text-muted">{{ block.description }}</p>
            </div>
            <ol class="grid gap-3">
                <li v-for="(item, i) in block.items" :key="item.title">
                    <ULink
                        :to="item.to"
                        class="dk-slab group grid grid-cols-[2.75rem_1fr_auto] items-center gap-4 px-5 py-4 transition hover:bg-sand-100 dark:hover:bg-stone-800"
                    >
                        <span class="grid place-items-center size-11 rounded-full border-[2.5px] border-dokos-500 dark:border-dokos-300 font-bold text-highlighted">{{ i + 1 }}</span>
                        <span>
                            <b class="block text-lg text-highlighted">{{ item.title }}</b>
                            <span class="text-sm text-muted">{{ item.description }}</span>
                        </span>
                        <span class="grid place-items-center size-9 rounded-full bg-dokos-500 text-white transition group-hover:bg-accent group-hover:text-[#0F2A3A]" aria-hidden="true">
                            <UIcon name="i-heroicons-arrow-right-20-solid" class="size-5" />
                        </span>
                    </ULink>
                </li>
            </ol>
        </div>
    </UPageSection>
</template>
