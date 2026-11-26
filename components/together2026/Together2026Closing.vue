<script setup lang="ts">
// « Comment nous travaillons ensemble »: the closing call, in the Dokos blue
// card that ends the homepage.

defineProps<{
    block: {
        title: string;
        text: string;
        links: { label: string; to: string }[];
    };
}>()
</script>

<template>
    <section class="bg-paper px-2 pb-2 sm:px-6 sm:pb-6 lg:px-14 lg:pb-14">
        <div class="rounded-2xl bg-dokos-500 text-white">
            <div class="mx-auto flex max-w-[1360px] flex-wrap items-end justify-between gap-x-16 gap-y-8 px-4 py-20 sm:px-8 sm:py-24">
                <div class="flex max-w-3xl flex-col gap-5">
                    <h2 class="h26-reveal-x text-[clamp(2.5rem,5vw,4.25rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em]">
                        {{ block.title }}<span class="text-accent">.</span>
                    </h2>
                    <p class="h26-reveal text-lg leading-relaxed text-dokos-100">{{ block.text }}</p>
                </div>
                <div class="h26-reveal flex flex-wrap gap-3">
                    <NuxtLink
                        v-for="(link, i) in block.links"
                        :key="link.to"
                        :to="link.to"
                        class="h26-lift rounded-lg px-6 py-3.5 font-bold"
                        :class="i === 0 ? 'bg-paper text-dokos-500' : 'border-[1.5px] border-white text-white'"
                    >
                        {{ link.label }}
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>
