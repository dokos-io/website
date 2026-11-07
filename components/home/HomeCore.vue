<script setup lang="ts">
// Homepage: Dokos itself. A chain of linked documents (example numbers), each
// with what Dokos does at that step, then the two regulatory facts.

defineProps<{
    block: {
        label: string;
        title: string;
        description?: string;
        chain: { title: string; number: string; does?: string }[];
        does_label?: string;
        facts: {
            label: string;
            value: string;
            status?: string;
            state?: 'ok' | 'wip';
            note?: string;
            link?: { label: string; to: string };
        }[];
    };
}>()
</script>

<template>
    <UPageSection>
        <div>
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{{ block.label }}</p>
            <h2 class="mt-2 max-w-4xl text-3xl sm:text-4xl lg:text-[44px] font-bold leading-tight text-highlighted">{{ block.title }}</h2>
            <p v-if="block.description" class="mt-4 max-w-3xl text-lg text-muted">{{ block.description }}</p>

            <ol class="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:flex lg:items-stretch lg:gap-0">
                <template v-for="(doc, i) in block.chain" :key="doc.number">
                    <li
                        class="dk-slab lg:flex-1 px-3 py-3.5 text-center"
                        :class="i === block.chain.length - 1 ? '!bg-[#E3F2EF] dark:!bg-[#1f3533]' : ''"
                    >
                        <small class="block font-mono text-xs text-muted">{{ doc.number }}</small>
                        <b class="text-highlighted">{{ doc.title }}</b>
                        <span v-if="doc.does" class="mt-2.5 block border-t-2 border-dashed border-sand-300 dark:border-stone-700 pt-2 text-left text-[13px] leading-snug text-muted">
                            <span v-if="block.does_label" class="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#2F6F69] dark:text-[#A6D6D2]">{{ block.does_label }}</span>
                            {{ doc.does }}
                        </span>
                    </li>
                    <li
                        v-if="i < block.chain.length - 1"
                        class="hidden lg:block relative self-center h-1.5 w-8 shrink-0 bg-dokos-500 dark:bg-dokos-300 after:absolute after:inset-x-0 after:top-0.5 after:border-t-2 after:border-dashed after:border-sand-100 dark:after:border-stone-950"
                        aria-hidden="true"
                    />
                </template>
            </ol>

            <div class="mt-10 grid gap-5 md:grid-cols-2">
                <div v-for="fact in block.facts" :key="fact.label" class="dk-slab p-6">
                    <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{{ fact.label }}</p>
                    <p class="mt-1 flex flex-wrap items-center gap-2 text-2xl font-bold text-highlighted">
                        {{ fact.value }}
                        <span
                            v-if="fact.status"
                            class="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                            :class="fact.state === 'wip'
                                ? 'bg-[#FFF1DA] text-[#8A5A00] dark:bg-[#3a2c12] dark:text-[#F3C77A]'
                                : 'bg-[#E3F2EF] text-[#2F6F69] dark:bg-[#1f3533] dark:text-[#A6D6D2]'"
                        >{{ fact.status }}</span>
                    </p>
                    <p v-if="fact.note" class="mt-2 text-muted">{{ fact.note }}</p>
                    <ULink v-if="fact.link" :to="fact.link.to" class="dk-link mt-3">{{ fact.link.label }} →</ULink>
                </div>
            </div>
        </div>
    </UPageSection>
</template>
