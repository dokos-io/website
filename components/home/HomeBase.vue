<script setup lang="ts">
// Homepage, layer 4 of the stack: the open source base, with the tools Dokos
// connects to (icons from the `integrations` block).

defineProps<{
    block: {
        label: string;
        title: string;
        description?: string;
        link?: { label: string; to: string };
        layers: { title: string; note?: string; to?: string }[];
    };
    integrations?: { title?: string; icons?: string[]; images?: string[] };
}>()
</script>

<template>
    <UPageSection class="bg-sand-200/60 dark:bg-stone-900/60">
        <div class="grid gap-12 lg:grid-cols-[6fr_5fr] items-center">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{{ block.label }}</p>
                <h2 class="mt-2 text-3xl sm:text-4xl lg:text-[44px] font-bold leading-tight text-highlighted">{{ block.title }}</h2>
                <p v-if="block.description" class="mt-4 text-lg text-muted">{{ block.description }}</p>
                <ULink v-if="block.link" :to="block.link.to" target="_blank" class="dk-link mt-6">{{ block.link.label }} →</ULink>

                <div v-if="integrations?.icons?.length" class="mt-10">
                    <p class="text-sm font-semibold text-highlighted">{{ integrations.title }}</p>
                    <div class="mt-3 flex flex-wrap items-center gap-4">
                        <UIcon
                            v-for="icon in integrations.icons"
                            :key="icon"
                            :name="icon"
                            class="size-9 text-muted dark:rounded-md dark:bg-sand-100 dark:p-1"
                        />
                        <AppImage
                            v-for="image in integrations.images"
                            :key="image"
                            :src="image"
                            class="max-h-8 dark:rounded-md dark:bg-sand-100 dark:p-1"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>

            <ol class="grid gap-2.5">
                <li v-for="layer in block.layers" :key="layer.title">
                    <component
                        :is="layer.to ? resolveComponent('ULink') : 'div'"
                        :to="layer.to"
                        class="dk-slab flex items-center justify-between gap-3 px-5 py-3.5"
                        :class="layer.to ? 'transition hover:-translate-x-0.5 hover:-translate-y-0.5' : ''"
                    >
                        <b class="text-highlighted">{{ layer.title }}</b>
                        <span class="text-sm text-muted text-right">{{ layer.note }}</span>
                    </component>
                </li>
            </ol>
        </div>
    </UPageSection>
</template>
