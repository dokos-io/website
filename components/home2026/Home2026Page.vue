<script setup lang="ts">
// 2026 homepage, every block in order, from the content of
// content/fr/accueil-2026.yml. Rendered both by the homepage (/) and by its
// preview (/fr/accueil-2026), so the two can never drift apart again.

defineProps<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    page: any;
}>()
</script>

<template>
    <div class="h26 overflow-x-clip bg-paper text-dokos-500">
        <!-- The news band, on a deeper sand than the cream menu so it does not read as a second menu line. -->
        <NuxtLink
            v-if="page.announcement"
            :to="page.announcement.to"
            class="flex items-center justify-center gap-3 bg-sand-400 px-4 py-2.5 text-center font-typed text-sm text-dokos-500 hover:bg-sand-300"
        >
            <span class="h26-pulse size-2.5 flex-none rounded-full bg-accent" aria-hidden="true" />
            <span>{{ page.announcement.label }}</span>
            <span v-if="page.announcement.cta" class="font-bold underline underline-offset-4">{{ page.announcement.cta }}</span>
        </NuxtLink>

        <Home2026Hero :block="page.hero" />
        <Home2026Marquee v-if="page.marquee" :block="page.marquee" />
        <Home2026Plan v-if="page.everywhere" :block="page.everywhere" />
        <Home2026Software v-if="page.software" :block="page.software" />
        <Home2026Ai v-if="page.ai" :block="page.ai" />
        <Home2026Editor v-if="page.editor" :block="page.editor" />
        <Home2026Discretion v-if="page.discretion" :block="page.discretion" />
        <Home2026Start v-if="page.start" :block="page.start" />
        <Home2026Presentation v-if="page.presentation?.src" :block="page.presentation" />
    </div>
</template>
