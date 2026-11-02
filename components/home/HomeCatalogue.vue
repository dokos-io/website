<script setup lang="ts">
// Homepage, layer 2 of the stack: the apps, filterable by business domain.
// The cards come from `hero.stack.apps`, the same list the hero draws, so the
// two never disagree.

interface App {
    title: string;
    domain?: string;
    to?: string;
    publisher?: string;
    note?: string;
}

const props = defineProps<{
    block: {
        label: string;
        title: string;
        description?: string;
        all: string;
        domains: Record<string, string>;
        publishers?: Record<string, string>;
        link?: { label: string; to: string };
    };
    apps: App[];
}>()

// Same dot colours as HomeStack.
const DOMAIN_COLOURS: Record<string, string> = {
    sales: 'bg-[#FF6B6B]',
    // Dark text on the light finance tile in dark mode, for contrast.
    finance: 'bg-dokos-500 dark:bg-dokos-300 dark:text-[#0F2A3A]',
    ops: 'bg-[#E0A43A]',
    people: 'bg-[#76B7B2]',
    collab: 'bg-[#8C7AE6]',
    web: 'bg-[#4AA3DF]',
    ai: 'bg-[#FF6B6B]',
}

const current = ref<string | null>(null)

// Only offer filters for domains that have at least one app.
const filters = computed(() =>
    Object.entries(props.block.domains).filter(([key]) =>
        props.apps.some((app) => app.domain === key)
    )
)

const shown = computed(() =>
    props.apps.filter((app) => !current.value || app.domain === current.value)
)

const filterClass = (active: boolean) =>
    active
        ? 'bg-[#0F2A3A] text-white border-[#0F2A3A] shadow-[3px_3px_0_var(--color-accent)] dark:bg-white dark:text-[#0F2A3A] dark:border-white'
        : 'bg-white text-[#0F2A3A] border-[#0F2A3A] hover:bg-sand-200 dark:bg-stone-900 dark:text-white dark:border-dokos-200 dark:hover:bg-stone-800'
</script>

<template>
    <UPageSection class="bg-sand-200/60 dark:bg-stone-900/60">
        <div>
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{{ block.label }}</p>
            <h2 class="mt-2 text-3xl sm:text-4xl lg:text-[44px] font-bold leading-tight text-highlighted">{{ block.title }}</h2>
            <p v-if="block.description" class="mt-4 max-w-3xl text-lg text-muted">{{ block.description }}</p>

            <div class="mt-8 flex flex-wrap gap-2" role="group" :aria-label="block.label">
                <button
                    type="button"
                    class="rounded-full border-[2.5px] px-4 py-1.5 font-semibold transition"
                    :class="filterClass(current === null)"
                    :aria-pressed="current === null"
                    @click="current = null"
                >
                    {{ block.all }}
                </button>
                <button
                    v-for="[key, label] in filters"
                    :key="key"
                    type="button"
                    class="inline-flex items-center gap-2 rounded-full border-[2.5px] px-4 py-1.5 font-semibold transition"
                    :class="filterClass(current === key)"
                    :aria-pressed="current === key"
                    @click="current = key"
                >
                    <span class="size-2.5 rounded-full" :class="DOMAIN_COLOURS[key]" aria-hidden="true" />
                    {{ label }}
                </button>
            </div>

            <ul class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
                <li v-for="app in shown" :key="app.title">
                    <ULink
                        :to="app.to"
                        class="dk-slab grid h-full content-start gap-1.5 p-4 transition hover:-translate-x-0.5 hover:-translate-y-0.5"
                    >
                        <span class="flex items-center gap-2.5">
                            <span class="grid place-items-center size-9 rounded-lg font-bold text-white" :class="DOMAIN_COLOURS[app.domain ?? 'collab']" aria-hidden="true">{{ app.title.charAt(0) }}</span>
                            <b class="text-lg text-highlighted">{{ app.title }}</b>
                        </span>
                        <span v-if="app.note" class="text-sm text-muted">{{ app.note }}</span>
                        <span v-if="app.publisher" class="text-xs font-semibold uppercase tracking-wide text-muted">{{ block.publishers?.[app.publisher] ?? app.publisher }}</span>
                    </ULink>
                </li>
            </ul>

            <ULink v-if="block.link" :to="block.link.to" class="dk-link mt-8">{{ block.link.label }} →</ULink>
        </div>
    </UPageSection>
</template>
