<script setup lang="ts">
// Homepage, layer 1 of the stack: people and AI agents work under the same
// rules. The invoice on the right is example data from `access.example`.

interface Entry {
    kind: 'person' | 'ai' | 'mcp';
    who: string;
    what: string;
    time: string;
}

defineProps<{
    block: {
        label: string;
        title: string;
        rules: { title: string; description: string }[];
        link?: { label: string; to: string };
        assistants?: { title: string; description?: string; note?: string; items: { name: string; logo: string }[] };
        example: {
            title: string;
            status: string;
            fields: { label: string; value: string }[];
            history: Entry[];
            ask: string;
            confirm: string;
            cancel: string;
        };
    };
}>()

const AVATAR: Record<Entry['kind'], { icon: string; class: string }> = {
    person: { icon: 'i-heroicons-user-solid', class: 'rounded-full bg-[#76B7B2]' },
    ai: { icon: 'i-heroicons-sparkles-solid', class: 'rounded-lg bg-accent' },
    mcp: { icon: 'i-heroicons-command-line', class: 'rounded-lg bg-accent' },
}
</script>

<template>
    <UPageSection>
        <div class="grid gap-12 lg:grid-cols-[5fr_6fr] lg:gap-14 items-center">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{{ block.label }}</p>
                <h2 class="mt-2 text-3xl sm:text-4xl lg:text-[44px] font-bold leading-tight text-highlighted">{{ block.title }}</h2>
                <ol class="mt-8 grid gap-4">
                    <li v-for="(rule, i) in block.rules" :key="rule.title" class="grid grid-cols-[2.5rem_1fr] gap-3.5">
                        <span class="grid place-items-center size-10 rounded-lg border-[2.5px] border-dokos-500 dark:border-dokos-300 bg-white dark:bg-stone-900 font-bold text-highlighted">{{ i + 1 }}</span>
                        <span>
                            <b class="block text-lg text-highlighted">{{ rule.title }}</b>
                            <span class="text-muted">{{ rule.description }}</span>
                        </span>
                    </li>
                </ol>
                <AiAssistants v-if="block.assistants" :block="block.assistants" class="mt-8" />
                <ULink v-if="block.link" :to="block.link.to" class="dk-link mt-8 inline-block">{{ block.link.label }} →</ULink>
            </div>

            <!-- Example document: one invoice, written by a person and by agents. -->
            <figure class="dk-slab overflow-hidden" :aria-label="block.example.title">
                <div class="flex items-center gap-3 px-5 py-3 border-b-2 border-sand-300 dark:border-stone-800">
                    <b class="text-lg text-highlighted">{{ block.example.title }}</b>
                    <span class="rounded-full border-[1.5px] border-[#76B7B2] bg-[#E3F2EF] dark:bg-[#1f3533] px-2.5 text-xs font-semibold text-[#2F6F69] dark:text-[#A6D6D2]">{{ block.example.status }}</span>
                </div>
                <div class="grid sm:grid-cols-2">
                    <dl class="grid content-start gap-2.5 p-5 sm:border-r-2 border-sand-300 dark:border-stone-800">
                        <div v-for="field in block.example.fields" :key="field.label">
                            <dt class="text-xs text-muted">{{ field.label }}</dt>
                            <dd class="mt-0.5 rounded-md border border-default bg-sand-100 dark:bg-stone-800 px-2.5 py-1.5 text-sm font-medium text-highlighted">{{ field.value }}</dd>
                        </div>
                    </dl>
                    <ol class="grid content-start gap-3 p-5">
                        <li v-for="entry in block.example.history" :key="entry.time + entry.who" class="grid grid-cols-[2rem_1fr_auto] gap-2.5 text-sm">
                            <span class="grid place-items-center size-8 border-2 border-dokos-500 dark:border-dokos-300 text-white" :class="AVATAR[entry.kind].class">
                                <UIcon :name="AVATAR[entry.kind].icon" class="size-4" />
                            </span>
                            <span>
                                <b class="block text-highlighted">{{ entry.who }}</b>
                                <span class="text-muted">{{ entry.what }}</span>
                            </span>
                            <time class="text-xs text-muted">{{ entry.time }}</time>
                        </li>
                    </ol>
                </div>
                <figcaption class="mx-5 mb-5 flex flex-wrap items-center gap-3 rounded-xl border-[2.5px] border-accent bg-[#FFF6F5] dark:bg-[#2b1a1a] px-4 py-3 text-sm text-highlighted">
                    <span class="grid place-items-center size-8 rounded-lg border-2 border-dokos-500 bg-accent text-white">
                        <UIcon name="i-heroicons-sparkles-solid" class="size-4" />
                    </span>
                    {{ block.example.ask }}
                    <span class="ml-auto flex gap-1.5" aria-hidden="true">
                        <span class="rounded-md border-2 border-[#0F2A3A] bg-[#0F2A3A] px-3 py-1 text-xs font-bold text-white">{{ block.example.confirm }}</span>
                        <span class="rounded-md border-2 border-[#0F2A3A] bg-white px-3 py-1 text-xs font-bold text-[#0F2A3A]">{{ block.example.cancel }}</span>
                    </span>
                </figcaption>
            </figure>
        </div>
    </UPageSection>
</template>
