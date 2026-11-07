<script setup lang="ts">
// Homepage: how Dokos adapts to a company. Three levels, from customising
// without code to custom business applications. `state: soon` marks a level
// that is not released yet (Studio).

defineProps<{
    block: {
        label: string;
        title: string;
        description?: string;
        levels: {
            title: string;
            status: string;
            state?: 'ok' | 'soon';
            description: string;
            items?: string[];
            link?: { label: string; to: string; target?: string };
        }[];
        note?: string;
    };
}>()
</script>

<template>
    <UPageSection class="bg-sand-200/60 dark:bg-stone-900">
        <div>
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{{ block.label }}</p>
            <h2 class="mt-2 max-w-4xl text-3xl sm:text-4xl lg:text-[44px] font-bold leading-tight text-highlighted">{{ block.title }}</h2>
            <p v-if="block.description" class="mt-4 max-w-3xl text-lg text-muted">{{ block.description }}</p>

            <ol class="mt-10 grid gap-5 lg:grid-cols-3">
                <li
                    v-for="(level, i) in block.levels"
                    :key="level.title"
                    class="dk-slab flex flex-col p-6"
                    :class="level.state === 'soon' ? '!border-dashed' : ''"
                >
                    <div class="flex items-center gap-3">
                        <span class="grid place-items-center size-10 shrink-0 rounded-lg border-[2.5px] border-dokos-500 dark:border-dokos-300 bg-white dark:bg-stone-900 font-bold text-highlighted">{{ i + 1 }}</span>
                        <span
                            class="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                            :class="level.state === 'soon'
                                ? 'bg-[#FFF1DA] text-[#8A5A00] dark:bg-[#3a2c12] dark:text-[#F3C77A]'
                                : 'bg-[#E3F2EF] text-[#2F6F69] dark:bg-[#1f3533] dark:text-[#A6D6D2]'"
                        >{{ level.status }}</span>
                    </div>
                    <h3 class="mt-4 text-xl font-bold text-highlighted">{{ level.title }}</h3>
                    <p class="mt-2 text-muted">{{ level.description }}</p>
                    <ul v-if="level.items?.length" class="mt-4 flex flex-wrap gap-1.5">
                        <li
                            v-for="item in level.items"
                            :key="item"
                            class="rounded-full border-2 border-dokos-500 dark:border-dokos-300 bg-white dark:bg-stone-900 px-2.5 py-0.5 text-sm font-medium text-highlighted"
                        >{{ item }}</li>
                    </ul>
                    <ULink
                        v-if="level.link"
                        :to="level.link.to"
                        :target="level.link.target"
                        class="dk-link mt-auto pt-5"
                    >{{ level.link.label }} →</ULink>
                </li>
            </ol>
            <p v-if="block.note" class="mt-6 max-w-3xl text-sm text-muted">{{ block.note }}</p>
        </div>
    </UPageSection>
</template>
