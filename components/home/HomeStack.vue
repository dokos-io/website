<script setup lang="ts">
// The Dokos ecosystem drawn as a stack, from the open source base up to the
// people and AI agents who use it. Content comes from `hero.stack` in
// content/<locale>/index.yml. `focus` dims every layer except one; the hero
// sets it when a visitor hovers one of its three points.

type Layer = "core" | "apps" | "access";

interface Block {
    title: string;
    note?: string;
    to?: string;
}

interface Stack {
    teams: Block;
    agents: Block;
    cli: Block;
    shared?: string;
    apps_label?: string;
    apps_note?: string;
    apps: (Block & { domain?: string })[];
    core: Block & { tags?: string[] };
    base: Block & { tag?: string };
}

const props = defineProps<{ stack: Stack; focus?: Layer | null }>();

// One dot colour per business domain, shared with the hero illustration.
const DOMAIN_COLOURS: Record<string, string> = {
    sales: "bg-[#FF6B6B]",
    finance: "bg-dokos-500 dark:bg-dokos-300",
    ops: "bg-[#E0A43A]",
    people: "bg-[#76B7B2]",
    collab: "bg-[#8C7AE6]",
    web: "bg-[#4AA3DF]",
    ai: "bg-[#FF6B6B]",
};

function layerClass(layer: Layer) {
    if (!props.focus || props.focus === layer) return "";
    return "opacity-30 saturate-50";
}

const slab =
    "rounded-xl border-[2.5px] border-dokos-500 dark:border-dokos-300 shadow-[6px_6px_0_var(--color-dokos-500)] dark:shadow-[6px_6px_0_var(--color-dokos-400)] transition-[opacity,filter] duration-200";
const strap =
    "relative w-[11px] bg-dokos-500 dark:bg-dokos-300 after:absolute after:inset-y-0 after:left-1 after:border-l-2 after:border-dashed after:border-sand-100 dark:after:border-stone-950";
</script>

<template>
    <div class="grid gap-3.5 text-[15px] text-left" role="group" aria-label="L'écosystème Dokos">
        <!-- Who works in Dokos: people, and agents through MCP. -->
        <div
            class="grid grid-cols-2 gap-x-3 sm:gap-x-5"
            :class="layerClass('access')"
        >
            <ULink
                :to="stack.teams.to"
                :class="[slab, 'flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3.5 bg-white dark:bg-stone-900 p-3 sm:p-4']"
            >
                <span class="grid place-items-center size-9 sm:size-11 shrink-0 rounded-full border-[2.5px] border-dokos-500 dark:border-dokos-300 bg-[#76B7B2] text-white">
                    <UIcon name="i-heroicons-user-solid" class="size-5 sm:size-6" />
                </span>
                <span>
                    <b class="block text-base sm:text-lg leading-tight text-highlighted">{{ stack.teams.title }}</b>
                    <small class="block text-xs sm:text-sm text-muted">{{ stack.teams.note }}</small>
                </span>
            </ULink>

            <ULink
                :to="stack.agents.to"
                :class="[slab, 'flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3.5 bg-white dark:bg-stone-900 p-3 sm:p-4']"
            >
                <span class="grid place-items-center size-9 sm:size-11 shrink-0 rounded-[11px] border-[2.5px] border-dokos-500 dark:border-dokos-300 bg-accent text-white">
                    <UIcon name="i-heroicons-sparkles-solid" class="size-5 sm:size-6" />
                </span>
                <span>
                    <b class="block text-base sm:text-lg leading-tight text-highlighted">{{ stack.agents.title }}</b>
                    <small class="block text-xs sm:text-sm text-muted">{{ stack.agents.note }}</small>
                </span>
            </ULink>

            <!-- Teams go straight down to the apps. -->
            <div class="relative flex justify-around" aria-hidden="true">
                <span :class="strap" />
                <span :class="strap" />
                <span
                    v-if="stack.shared"
                    class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] sm:w-auto sm:whitespace-nowrap text-center rounded-full border-2 border-dokos-500 dark:border-dokos-300 bg-sand-200 dark:bg-stone-800 px-2.5 sm:px-3.5 py-1 text-[11px] sm:text-[13px] font-medium text-highlighted"
                >
                    {{ stack.shared }}
                </span>
            </div>

            <!-- Agents go through Dokos CLI. -->
            <div class="flex flex-col">
                <div class="flex justify-around h-4" aria-hidden="true">
                    <span :class="strap" />
                    <span :class="strap" />
                </div>
                <ULink
                    :to="stack.cli.to"
                    :class="[slab, 'flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3.5 bg-[#FFECEA] dark:bg-[#3b2222] p-3 sm:p-4']"
                >
                    <span class="grid place-items-center size-9 shrink-0 rounded-[10px] border-[2.5px] border-dokos-500 dark:border-dokos-300 bg-accent text-white">
                        <UIcon name="i-heroicons-command-line" class="size-5" />
                    </span>
                    <span>
                        <b class="block text-base sm:text-lg leading-tight text-highlighted">{{ stack.cli.title }}</b>
                        <small class="block text-xs sm:text-sm text-muted">{{ stack.cli.note }}</small>
                    </span>
                </ULink>
                <div class="flex justify-around h-4" aria-hidden="true">
                    <span :class="strap" />
                    <span :class="strap" />
                </div>
            </div>
        </div>

        <!-- Apps that plug into Dokos. -->
        <div :class="[slab, layerClass('apps'), 'bg-white dark:bg-stone-900 p-4 sm:px-5']">
            <div class="flex items-baseline justify-between gap-3 mb-3">
                <span class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{{ stack.apps_label }}</span>
                <span class="hidden sm:inline text-[13px] text-muted">{{ stack.apps_note }}</span>
            </div>
            <ul class="grid grid-cols-3 sm:grid-cols-4 gap-1.5 sm:gap-2.5">
                <li v-for="app in stack.apps" :key="app.title">
                    <ULink
                        :to="app.to"
                        class="flex items-center justify-center gap-1.5 sm:gap-2 rounded-full border-2 bg-white dark:bg-stone-900 px-1 sm:px-2 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap text-highlighted transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-sand-200 dark:hover:bg-stone-800 hover:shadow-[3px_3px_0_var(--color-dokos-500)] focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5"
                        :class="app.domain === 'ai' ? 'border-accent' : 'border-dokos-500 dark:border-dokos-300'"
                    >
                        <span class="size-2 shrink-0 rounded-full" :class="DOMAIN_COLOURS[app.domain ?? 'collab']" aria-hidden="true" />
                        {{ app.title }}
                    </ULink>
                </li>
            </ul>
        </div>

        <!-- Dokos itself, on the open source base. -->
        <ULink
            :to="stack.core.to"
            :class="[slab, layerClass('core'), 'flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 bg-dokos-500 dark:bg-dokos-700 p-4 sm:px-5 text-white']"
        >
            <span class="grid place-items-center size-12 sm:size-16 shrink-0 rounded-full bg-white">
                <img src="/dokos_logo_round.svg" alt="" class="size-11 sm:size-14">
            </span>
            <span class="min-w-0">
                <b class="block text-2xl sm:text-[28px] leading-none">{{ stack.core.title }}</b>
                <span class="block mt-1.5 text-sm text-dokos-100">{{ stack.core.note }}</span>
            </span>
            <span v-if="stack.core.tags?.length" class="flex sm:grid gap-2 sm:justify-items-end sm:ml-auto">
                <span
                    v-for="tag in stack.core.tags"
                    :key="tag"
                    class="rounded-full border-[1.5px] border-white px-3 py-0.5 text-xs sm:text-[13px] font-medium whitespace-nowrap"
                >{{ tag }}</span>
            </span>
        </ULink>

        <ULink
            :to="stack.base.to"
            :class="[slab, layerClass('core'), 'flex items-center gap-3.5 bg-sand-200 dark:bg-stone-800 p-4 sm:px-5']"
        >
            <span>
                <b class="block text-base sm:text-[17px] text-highlighted">{{ stack.base.title }}</b>
                <span class="block text-sm text-muted">{{ stack.base.note }}</span>
            </span>
            <span
                v-if="stack.base.tag"
                class="hidden sm:inline ml-auto rounded-full border-2 border-dokos-500 dark:border-dokos-300 bg-white dark:bg-stone-900 px-3 py-0.5 text-[13px] font-semibold text-highlighted"
            >{{ stack.base.tag }}</span>
        </ULink>
    </div>
</template>
