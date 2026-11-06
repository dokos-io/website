<script setup lang="ts">
// A row of AI assistants that can connect to Dokos AI's MCP server.
// Logos: @lobehub/icons-static-svg (MIT), stored in public/ai/.
defineProps<{
    block: {
        title: string;
        description?: string;
        note?: string;
        items: { name: string; logo: string }[];
    };
}>()
</script>

<template>
    <div>
        <p class="font-semibold text-highlighted">{{ block.title }}</p>
        <p v-if="block.description" class="mt-1 text-sm text-muted">{{ block.description }}</p>
        <ul class="mt-4 flex flex-wrap gap-2.5">
            <li
                v-for="item in block.items"
                :key="item.name"
                class="flex items-center gap-2 rounded-lg border-2 border-sand-300 dark:border-stone-700 bg-white dark:bg-sand-100 px-3 py-1.5 text-sm font-medium text-[#0F2A3A]"
            >
                <img :src="item.logo" alt="" class="size-5" loading="lazy">
                {{ item.name }}
            </li>
        </ul>
        <p v-if="block.note" class="mt-3 text-xs text-muted">{{ block.note }}</p>
    </div>
</template>
